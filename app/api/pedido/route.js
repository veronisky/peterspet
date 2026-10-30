import { appendFile } from "node:fs/promises";
import path from "node:path";
import { achar } from "../../../lib/produtos";
import { calcularTotais, cepValido, brl, FORMAS_PAGAMENTO } from "../../../lib/loja";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Mantém o texto em uma linha só, evitando que o cliente "invente" linhas no arquivo.
function limpar(v, max = 120) {
  return String(v ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

export async function POST(req) {
  let corpo;
  try {
    corpo = await req.json();
  } catch {
    return Response.json({ erro: "Pedido inválido." }, { status: 400 });
  }

  const cliente = {
    nome: limpar(corpo?.cliente?.nome, 80),
    email: limpar(corpo?.cliente?.email, 80),
    telefone: limpar(corpo?.cliente?.telefone, 20),
    cep: limpar(corpo?.cliente?.cep, 9),
    endereco: limpar(corpo?.cliente?.endereco, 120),
    numero: limpar(corpo?.cliente?.numero, 10),
    complemento: limpar(corpo?.cliente?.complemento, 40),
    cidade: limpar(corpo?.cliente?.cidade, 60),
  };

  if (!cliente.nome || !cliente.email.includes("@")) {
    return Response.json({ erro: "Informe nome e e-mail válidos." }, { status: 400 });
  }
  if (!cepValido(cliente.cep) || !cliente.endereco || !cliente.numero) {
    return Response.json({ erro: "Informe CEP, endereço e número." }, { status: 400 });
  }

  const pagamento = FORMAS_PAGAMENTO.some((f) => f.id === corpo?.pagamento) ? corpo.pagamento : "pix";

  // O preço vem SEMPRE do catálogo do servidor, nunca do navegador.
  const itens = [];
  for (const it of Array.isArray(corpo?.itens) ? corpo.itens : []) {
    const p = achar(it?.id);
    const qtd = Math.min(20, Math.max(1, parseInt(it?.qtd, 10) || 0));
    if (p && qtd) itens.push({ id: p.id, nome: p.nome, preco: p.preco, qtd });
  }
  if (itens.length === 0) {
    return Response.json({ erro: "O carrinho está vazio." }, { status: 400 });
  }

  const t = calcularTotais({ itens, cep: cliente.cep, cupom: corpo?.cupom, pagamento });
  const agora = new Date();
  const numero = "PP" + agora.getTime().toString(36).toUpperCase();
  const data = agora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const forma = FORMAS_PAGAMENTO.find((f) => f.id === pagamento)?.nome;

  const linhas = [];
  linhas.push("=".repeat(60));
  linhas.push(`PEDIDO ${numero}   |   ${data}`);
  linhas.push("=".repeat(60));
  linhas.push(`Cliente:   ${cliente.nome} <${cliente.email}>`);
  if (cliente.telefone) linhas.push(`Telefone:  ${cliente.telefone}`);
  linhas.push(
    `Entrega:   ${cliente.endereco}, ${cliente.numero}${cliente.complemento ? " - " + cliente.complemento : ""}` +
      `${cliente.cidade ? " - " + cliente.cidade : ""} - CEP ${cliente.cep}`
  );
  linhas.push(`Pagamento: ${forma}`);
  linhas.push("");
  linhas.push("ITENS");
  for (const i of itens) {
    linhas.push(`  ${String(i.qtd).padStart(2)}x ${i.nome}`);
    linhas.push(`        ${brl(i.preco)} cada  =  ${brl(i.preco * i.qtd)}`);
  }
  linhas.push("");
  linhas.push(`Subtotal:        ${brl(t.subtotal)}`);
  if (t.descontoCupom > 0) linhas.push(`Cupom ${t.cupomAplicado}:  -${brl(t.descontoCupom)}`);
  if (t.cupomAplicado && t.descontoCupom === 0) linhas.push(`Cupom ${t.cupomAplicado}:  frete grátis`);
  if (t.descontoPix > 0) linhas.push(`Desconto Pix:    -${brl(t.descontoPix)}`);
  linhas.push(`Frete:           ${t.freteValor === 0 ? "grátis" : brl(t.freteValor)}${t.frete ? " (" + t.frete.prazo + ")" : ""}`);
  linhas.push(`TOTAL:           ${brl(t.total)}`);
  linhas.push("");
  linhas.push("");

  const arquivo = path.join(process.cwd(), "pedidos.txt");
  try {
    await appendFile(arquivo, linhas.join("\n"), "utf8");
  } catch (e) {
    return Response.json({ erro: "Não foi possível gravar o pedido no bloco de notas." }, { status: 500 });
  }

  return Response.json({ ok: true, numero, total: t.total, arquivo: "pedidos.txt" });
}

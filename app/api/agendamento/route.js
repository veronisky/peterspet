import { appendFile } from "node:fs/promises";
import path from "node:path";
import { SERVICOS, PORTES } from "../../../lib/servicos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function limpar(v, max = 120) {
  return String(v ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

export async function POST(req) {
  let c;
  try {
    c = await req.json();
  } catch {
    return Response.json({ erro: "Agendamento inválido." }, { status: 400 });
  }

  const dono = limpar(c?.dono, 80);
  const pet = limpar(c?.pet, 40);
  const telefone = limpar(c?.telefone, 20);
  const porte = ["Pequeno", "Médio", "Grande"].includes(c?.porte) ? c.porte : "Pequeno";
  const especie = c?.especie === "Gato" ? "Gato" : "Cão";
  const servico = SERVICOS[c?.servico];
  const data = limpar(c?.data, 10);
  const hora = limpar(c?.hora, 5);
  const obs = limpar(c?.obs, 200);

  if (!dono || !pet || !servico) {
    return Response.json({ erro: "Preencha seu nome, o nome do pet e o serviço." }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || !/^\d{2}:\d{2}$/.test(hora)) {
    return Response.json({ erro: "Escolha uma data e um horário válidos." }, { status: 400 });
  }
  const quando = new Date(`${data}T${hora}:00`);
  if (Number.isNaN(quando.getTime()) || quando.getTime() < Date.now()) {
    return Response.json({ erro: "Escolha uma data e um horário futuros." }, { status: 400 });
  }

  const acrescimo = PORTES[porte];
  const preco = servico.preco + acrescimo;
  const numero = "AG" + Date.now().toString(36).toUpperCase();
  const [a, m, d] = data.split("-");

  const texto = [
    "-".repeat(60),
    `AGENDAMENTO ${numero}`,
    "-".repeat(60),
    `Tutor:    ${dono}${telefone ? "  |  " + telefone : ""}`,
    `Pet:      ${pet} (${especie}, porte ${porte})`,
    `Serviço:  ${servico.nome}`,
    `Quando:   ${d}/${m}/${a} às ${hora}`,
    `Valor:    R$ ${preco.toFixed(2).replace(".", ",")}`,
    obs ? `Obs.:     ${obs}` : null,
    "",
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await appendFile(path.join(process.cwd(), "agendamentos.txt"), texto, "utf8");
  } catch {
    return Response.json({ erro: "Não foi possível gravar o agendamento." }, { status: 500 });
  }

  return Response.json({ ok: true, numero, preco });
}

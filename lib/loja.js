// Regras de preço usadas no navegador E no servidor
// (o servidor recalcula tudo, nunca confia no total enviado pelo navegador).

export const FRETE_GRATIS_A_PARTIR_DE = 199;
export const DESCONTO_PIX = 0.05;

export const CUPONS = {
  PETERS10: { descricao: "10% de desconto nos produtos", tipo: "percentual", valor: 0.1 },
  BEMVINDO: { descricao: "R$ 15 de desconto em compras a partir de R$ 80", tipo: "fixo", valor: 15, minimo: 80 },
  FRETEGRATIS: { descricao: "Frete grátis", tipo: "frete" },
};

export const FORMAS_PAGAMENTO = [
  { id: "pix", nome: "Pix (5% de desconto)" },
  { id: "cartao", nome: "Cartão de crédito" },
  { id: "boleto", nome: "Boleto bancário" },
];

export function limparCep(cep) {
  return String(cep || "").replace(/\D/g, "").slice(0, 8);
}

export function cepValido(cep) {
  return limparCep(cep).length === 8;
}

// Simulação de frete por região (primeiro dígito do CEP).
export function calcularFrete(cep) {
  const c = limparCep(cep);
  if (c.length !== 8) return null;
  const d = c[0];
  if (d === "2") return { valor: 12.9, prazo: "1 a 2 dias úteis", regiao: "RJ / ES" };
  if (d === "0" || d === "1") return { valor: 19.9, prazo: "2 a 3 dias úteis", regiao: "São Paulo" };
  if (d === "3") return { valor: 21.9, prazo: "3 a 4 dias úteis", regiao: "Minas Gerais" };
  if (d === "4" || d === "5") return { valor: 29.9, prazo: "4 a 6 dias úteis", regiao: "Nordeste" };
  return { valor: 34.9, prazo: "5 a 8 dias úteis", regiao: "Sul, Centro-Oeste e Norte" };
}

// itens: [{ preco, qtd }]
export function calcularTotais({ itens, cep, cupom, pagamento }) {
  const subtotal = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  const frete = calcularFrete(cep);
  let freteValor = frete ? frete.valor : 0;
  if (frete && subtotal >= FRETE_GRATIS_A_PARTIR_DE) freteValor = 0;

  let descontoCupom = 0;
  let cupomAplicado = null;
  const def = cupom ? CUPONS[String(cupom).trim().toUpperCase()] : null;
  if (def) {
    if (def.tipo === "percentual") {
      descontoCupom = subtotal * def.valor;
      cupomAplicado = String(cupom).trim().toUpperCase();
    } else if (def.tipo === "fixo" && subtotal >= (def.minimo || 0)) {
      descontoCupom = def.valor;
      cupomAplicado = String(cupom).trim().toUpperCase();
    } else if (def.tipo === "frete") {
      freteValor = 0;
      cupomAplicado = String(cupom).trim().toUpperCase();
    }
  }

  const baseApos = Math.max(0, subtotal - descontoCupom);
  const descontoPix = pagamento === "pix" ? baseApos * DESCONTO_PIX : 0;
  const total = Math.max(0, baseApos - descontoPix + freteValor);

  return {
    subtotal: arred(subtotal),
    freteValor: arred(freteValor),
    descontoCupom: arred(descontoCupom),
    descontoPix: arred(descontoPix),
    total: arred(total),
    cupomAplicado,
    frete,
  };
}

function arred(n) {
  return Math.round(n * 100) / 100;
}

export function brl(n) {
  return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

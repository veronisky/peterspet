"use client";
import ProductArt from "./ProductArt";
import { brl } from "../lib/loja";

function Estrelas({ nota }) {
  const cheias = Math.round(nota);
  return (
    <span className="estrelas" role="img" aria-label={`Nota ${nota} de 5`}>
      {"★★★★★".slice(0, cheias)}
      <span className="vazias">{"★★★★★".slice(cheias)}</span>
    </span>
  );
}

export default function ProductCard({ produto, onAdd, noCarrinho }) {
  const desconto = produto.precoAntigo ? Math.round((1 - produto.preco / produto.precoAntigo) * 100) : 0;
  return (
    <article className="card-prod">
      <div className="card-img">
        {produto.selo && <span className={`selo ${produto.selo === "Promoção" ? "promo" : ""}`}>{produto.selo}</span>}
        {desconto > 0 && <span className="desc-pct">-{desconto}%</span>}
        <ProductArt produto={produto} />
      </div>
      <div className="card-corpo">
        <h3>{produto.nome}</h3>
        <p className="card-desc">{produto.desc}</p>
        <p className="card-nota"><Estrelas nota={produto.rating} /> <span>{produto.rating.toFixed(1)} ({produto.avaliacoes})</span></p>
        <div className="card-preco">
          {produto.precoAntigo && <s>{brl(produto.precoAntigo)}</s>}
          <strong>{brl(produto.preco)}</strong>
          <small>ou 3x de {brl(produto.preco / 3)} sem juros</small>
        </div>
        <button className="btn btn-coral cheio" onClick={() => onAdd(produto)}>
          {noCarrinho ? `Adicionar mais (${noCarrinho} no carrinho)` : "Adicionar ao carrinho"}
        </button>
      </div>
    </article>
  );
}

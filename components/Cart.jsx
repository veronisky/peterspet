"use client";
import { useMemo, useState } from "react";
import Mascot from "./Mascot";
import ProductArt from "./ProductArt";
import { achar } from "../lib/produtos";
import { brl, calcularTotais, cepValido, limparCep, CUPONS, FORMAS_PAGAMENTO, FRETE_GRATIS_A_PARTIR_DE } from "../lib/loja";

function mascaraCep(v) {
  const d = limparCep(v);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

export default function Cart({ aberto, onFechar, itens, onQtd, onRemover, onLimpar, usuario }) {
  const [etapa, setEtapa] = useState("carrinho"); // carrinho | dados | pronto
  const [cupomTexto, setCupomTexto] = useState("");
  const [cupom, setCupom] = useState("");
  const [cupomMsg, setCupomMsg] = useState(null);
  const [pagamento, setPagamento] = useState("pix");
  const [cliente, setCliente] = useState({ nome: "", email: "", telefone: "", cep: "", endereco: "", numero: "", complemento: "", cidade: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [pedido, setPedido] = useState(null);

  const linhas = useMemo(
    () => itens.map((i) => ({ ...achar(i.id), qtd: i.qtd })).filter((p) => p.id),
    [itens]
  );
  const totais = calcularTotais({ itens: linhas, cep: cliente.cep, cupom, pagamento });
  const faltaFreteGratis = Math.max(0, FRETE_GRATIS_A_PARTIR_DE - totais.subtotal);

  if (!aberto) return null;

  const nomeCliente = cliente.nome || usuario?.nome || "";
  const emailCliente = cliente.email || usuario?.email || "";
  const muda = (k) => (e) => setCliente((c) => ({ ...c, [k]: k === "cep" ? mascaraCep(e.target.value) : e.target.value }));

  function aplicarCupom(e) {
    e.preventDefault();
    const cod = cupomTexto.trim().toUpperCase();
    if (!cod) return;
    const def = CUPONS[cod];
    if (!def) return setCupomMsg({ ok: false, texto: "Cupom não encontrado. Experimente PETERS10." });
    if (def.minimo && totais.subtotal < def.minimo) {
      return setCupomMsg({ ok: false, texto: `Este cupom vale para compras a partir de ${brl(def.minimo)}.` });
    }
    setCupom(cod);
    setCupomMsg({ ok: true, texto: `${cod}: ${def.descricao}.` });
  }

  async function buscarCep() {
    const c = limparCep(cliente.cep);
    if (c.length !== 8) return;
    try {
      const r = await fetch(`https://viacep.com.br/ws/${c}/json/`);
      const j = await r.json();
      if (!j.erro) {
        setCliente((x) => ({
          ...x,
          endereco: x.endereco || [j.logradouro, j.bairro].filter(Boolean).join(", "),
          cidade: x.cidade || `${j.localidade}/${j.uf}`,
        }));
      }
    } catch {
      /* sem internet: o cliente digita o endereço */
    }
  }

  async function finalizar(e) {
    e.preventDefault();
    setErro("");
    if (!cepValido(cliente.cep)) return setErro("Digite um CEP com 8 números.");
    setEnviando(true);
    try {
      const r = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: { ...cliente, nome: nomeCliente, email: emailCliente },
          itens: itens.map((i) => ({ id: i.id, qtd: i.qtd })),
          cupom,
          pagamento,
        }),
      });
      const j = await r.json();
      if (!r.ok) return setErro(j.erro || "Não foi possível finalizar o pedido.");
      setPedido(j);
      setEtapa("pronto");
      onLimpar();
    } catch {
      setErro("Sem conexão com o servidor. Confira se o site está rodando (npm run dev).");
    } finally {
      setEnviando(false);
    }
  }

  function fechar() {
    onFechar();
    if (etapa === "pronto") {
      setEtapa("carrinho");
      setPedido(null);
      setCupom("");
      setCupomTexto("");
      setCupomMsg(null);
    }
  }

  return (
    <div className="overlay lado" onClick={fechar}>
      <aside className="gaveta" role="dialog" aria-modal="true" aria-label="Carrinho de compras" onClick={(e) => e.stopPropagation()}>
        <header className="gaveta-topo">
          <h2>{etapa === "pronto" ? "Pedido feito" : etapa === "dados" ? "Entrega e pagamento" : "Seu carrinho"}</h2>
          <button className="fechar" onClick={fechar} aria-label="Fechar carrinho">×</button>
        </header>

        {etapa === "pronto" && pedido && (
          <div className="pedido-ok">
            <Mascot pose="box" size={170} />
            <h3>Obaaa! O Peter já está separando seu pedido.</h3>
            <p>Número <strong>{pedido.numero}</strong> no valor de <strong>{brl(pedido.total)}</strong>.</p>
            <p className="mini">O pedido foi gravado no bloco de notas <code>{pedido.arquivo}</code>, na pasta do projeto.</p>
            <button className="btn btn-coral" onClick={fechar}>Voltar para a loja</button>
          </div>
        )}

        {etapa !== "pronto" && linhas.length === 0 && (
          <div className="vazio">
            <Mascot pose="sleep" size={150} />
            <h3>Seu carrinho está vazio</h3>
            <p>Escolha um produto na loja e o Peter acorda para guardar pra você.</p>
            <button className="btn btn-coral" onClick={fechar}>Ver produtos</button>
          </div>
        )}

        {etapa !== "pronto" && linhas.length > 0 && (
          <div className="gaveta-corpo">
            {faltaFreteGratis > 0 ? (
              <p className="aviso-frete">Faltam <strong>{brl(faltaFreteGratis)}</strong> para o frete grátis.</p>
            ) : (
              <p className="aviso-frete ok">Você ganhou frete grátis!</p>
            )}

            <ul className="itens">
              {linhas.map((p) => (
                <li key={p.id}>
                  <ProductArt produto={p} className="mini-art" />
                  <div className="item-info">
                    <p className="item-nome">{p.nome}</p>
                    <p className="item-preco">{brl(p.preco)}</p>
                    <div className="qtd">
                      <button onClick={() => onQtd(p.id, -1)} aria-label={`Diminuir ${p.nome}`}>−</button>
                      <span aria-live="polite">{p.qtd}</span>
                      <button onClick={() => onQtd(p.id, 1)} aria-label={`Aumentar ${p.nome}`}>+</button>
                      <button className="remover" onClick={() => onRemover(p.id)}>Remover</button>
                    </div>
                  </div>
                  <strong className="item-total">{brl(p.preco * p.qtd)}</strong>
                </li>
              ))}
            </ul>

            <form className="cupom" onSubmit={aplicarCupom}>
              <label>Cupom de desconto
                <span className="campo-bt">
                  <input value={cupomTexto} onChange={(e) => setCupomTexto(e.target.value)} placeholder="PETERS10" />
                  <button className="btn btn-ghost">Aplicar</button>
                </span>
              </label>
              {cupomMsg && <p className={cupomMsg.ok ? "ok-msg" : "erro"}>{cupomMsg.texto}</p>}
            </form>

            <label className="cep-campo">CEP de entrega
              <span className="campo-bt">
                <input value={cliente.cep} onChange={muda("cep")} onBlur={buscarCep} inputMode="numeric" placeholder="20000-000" />
              </span>
            </label>
            {totais.frete && (
              <p className="ok-msg">Entrega para {totais.frete.regiao}: {totais.frete.prazo}.</p>
            )}

            <dl className="resumo">
              <div><dt>Subtotal</dt><dd>{brl(totais.subtotal)}</dd></div>
              {totais.descontoCupom > 0 && <div className="desc"><dt>Cupom {totais.cupomAplicado}</dt><dd>−{brl(totais.descontoCupom)}</dd></div>}
              {totais.descontoPix > 0 && <div className="desc"><dt>Desconto no Pix</dt><dd>−{brl(totais.descontoPix)}</dd></div>}
              <div><dt>Frete</dt><dd>{totais.frete ? (totais.freteValor === 0 ? "Grátis" : brl(totais.freteValor)) : "Informe o CEP"}</dd></div>
              <div className="total"><dt>Total</dt><dd>{brl(totais.total)}</dd></div>
            </dl>

            {etapa === "carrinho" && (
              <button
                className="btn btn-coral cheio"
                onClick={() => (cepValido(cliente.cep) ? setEtapa("dados") : setErro("Digite o CEP para calcular o frete."))}
              >
                Continuar para entrega
              </button>
            )}
            {etapa === "carrinho" && erro && <p className="erro" role="alert">{erro}</p>}

            {etapa === "dados" && (
              <form className="dados" onSubmit={finalizar}>
                <label>Nome completo<input value={nomeCliente} onChange={muda("nome")} required autoComplete="name" /></label>
                <div className="linha">
                  <label>E-mail<input type="email" value={emailCliente} onChange={muda("email")} required autoComplete="email" /></label>
                  <label>Telefone<input value={cliente.telefone} onChange={muda("telefone")} inputMode="tel" autoComplete="tel" /></label>
                </div>
                <label>Endereço<input value={cliente.endereco} onChange={muda("endereco")} required autoComplete="street-address" /></label>
                <div className="linha">
                  <label>Número<input value={cliente.numero} onChange={muda("numero")} required /></label>
                  <label>Complemento<input value={cliente.complemento} onChange={muda("complemento")} /></label>
                </div>
                <label>Cidade<input value={cliente.cidade} onChange={muda("cidade")} /></label>

                <fieldset>
                  <legend>Forma de pagamento</legend>
                  {FORMAS_PAGAMENTO.map((f) => (
                    <label key={f.id} className="radio">
                      <input type="radio" name="pagamento" value={f.id} checked={pagamento === f.id} onChange={() => setPagamento(f.id)} />
                      {f.nome}
                    </label>
                  ))}
                </fieldset>

                {erro && <p className="erro" role="alert">{erro}</p>}
                <button className="btn btn-coral cheio" disabled={enviando}>
                  {enviando ? "Enviando pedido..." : `Finalizar pedido de ${brl(totais.total)}`}
                </button>
                <button type="button" className="link" onClick={() => setEtapa("carrinho")}>Voltar ao carrinho</button>
              </form>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

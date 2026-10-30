"use client";
import { useEffect, useMemo, useState } from "react";
import Mascot from "./Mascot";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import Auth from "./Auth";
import Agendar from "./Agendar";
import { PRODUTOS, ANIMAIS, CATEGORIAS } from "../lib/produtos";

const ORDENS = {
  relevancia: "Mais relevantes",
  menor: "Menor preço",
  maior: "Maior preço",
  nota: "Melhor avaliados",
};

function semAcento(t) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function Loja() {
  const [busca, setBusca] = useState("");
  const [animal, setAnimal] = useState("todos");
  const [categoria, setCategoria] = useState("Todas");
  const [ordem, setOrdem] = useState("relevancia");
  const [soPromo, setSoPromo] = useState(false);
  const [precoMax, setPrecoMax] = useState(300);

  const [itens, setItens] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [authAberto, setAuthAberto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [carregado, setCarregado] = useState(false);

  // carrinho e usuário ficam salvos no navegador
  useEffect(() => {
    try {
      setItens(JSON.parse(localStorage.getItem("pp_cart") || "[]"));
      setUsuario(JSON.parse(localStorage.getItem("pp_user") || "null"));
    } catch {}
    setCarregado(true);
  }, []);
  useEffect(() => {
    if (!carregado) return;
    try { localStorage.setItem("pp_cart", JSON.stringify(itens)); } catch {}
  }, [itens, carregado]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 2400);
    return () => clearTimeout(t);
  }, [aviso]);

  function adicionar(produto) {
    setItens((atual) => {
      const ja = atual.find((i) => i.id === produto.id);
      if (ja) return atual.map((i) => (i.id === produto.id ? { ...i, qtd: Math.min(20, i.qtd + 1) } : i));
      return [...atual, { id: produto.id, qtd: 1 }];
    });
    setAviso(produto.nome);
  }
  const alterarQtd = (id, d) =>
    setItens((a) => a.map((i) => (i.id === id ? { ...i, qtd: Math.min(20, Math.max(1, i.qtd + d)) } : i)));
  const remover = (id) => setItens((a) => a.filter((i) => i.id !== id));

  const totalItens = itens.reduce((s, i) => s + i.qtd, 0);

  function entrar(u) {
    setUsuario(u);
    try { localStorage.setItem("pp_user", JSON.stringify(u)); } catch {}
    setAuthAberto(false);
  }
  function sair() {
    setUsuario(null);
    try { localStorage.removeItem("pp_user"); } catch {}
  }

  const lista = useMemo(() => {
    const q = semAcento(busca.trim());
    let r = PRODUTOS.filter((p) => {
      if (animal !== "todos" && p.animal !== animal) return false;
      if (categoria !== "Todas" && p.categoria !== categoria) return false;
      if (soPromo && !p.precoAntigo) return false;
      if (p.preco > precoMax) return false;
      if (q && !semAcento(`${p.nome} ${p.desc} ${p.categoria}`).includes(q)) return false;
      return true;
    });
    if (ordem === "menor") r = [...r].sort((a, b) => a.preco - b.preco);
    if (ordem === "maior") r = [...r].sort((a, b) => b.preco - a.preco);
    if (ordem === "nota") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [busca, animal, categoria, ordem, soPromo, precoMax]);

  function limparFiltros() {
    setBusca(""); setAnimal("todos"); setCategoria("Todas"); setOrdem("relevancia"); setSoPromo(false); setPrecoMax(300);
  }

  return (
    <>
      <a className="pular" href="#vitrine">Ir para os produtos</a>

      <header className="topo">
        <a className="logo" href="#inicio" aria-label="Peter's Pet - início">
          <Mascot pose="happy" size={44} title="" />
          <span>Peter&apos;s Pet</span>
        </a>

        <form className="busca" role="search" onSubmit={(e) => { e.preventDefault(); document.getElementById("vitrine")?.scrollIntoView({ behavior: "smooth" }); }}>
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busque ração, brinquedo, coleira..."
            aria-label="Buscar produtos"
          />
          <button aria-label="Buscar" className="busca-bt">Buscar</button>
        </form>

        <nav className="acoes" aria-label="Atalhos">
          <a href="#servicos" className="link-nav">Banho e tosa</a>
          {usuario ? (
            <button className="link-nav" onClick={sair} title="Sair da conta">Olá, {usuario.nome.split(" ")[0]} (sair)</button>
          ) : (
            <button className="link-nav" onClick={() => setAuthAberto(true)}>Entrar</button>
          )}
          <button className="carrinho-bt" onClick={() => setCarrinhoAberto(true)} aria-label={`Abrir carrinho, ${totalItens} itens`}>
            Carrinho
            <span className="contador" key={totalItens}>{totalItens}</span>
          </button>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-texto">
            <h1>O pet shop onde o Peter aprova tudo antes de chegar na sua casa</h1>
            <p>Ração, petiscos, brinquedos, camas e banho e tosa. Frete grátis em compras acima de R$ 199 e 5% de desconto no Pix.</p>
            <div className="hero-bts">
              <a className="btn btn-coral" href="#vitrine">Ver produtos</a>
              <a className="btn btn-ghost" href="#servicos">Agendar banho e tosa</a>
            </div>
            <p className="hero-cupom">Primeira compra? Use o cupom <strong>PETERS10</strong> no carrinho.</p>
          </div>
          <div className="hero-mascote">
            <div className="hero-mancha" aria-hidden="true" />
            <Mascot pose="happy" size={360} className="grande" />
          </div>
        </section>

        <section className="bairros" aria-label="Escolha pelo tipo de pet">
          {ANIMAIS.filter((a) => a.id !== "todos").map((a) => (
            <button
              key={a.id}
              className={`chip-animal ${animal === a.id ? "on" : ""}`}
              onClick={() => { setAnimal(animal === a.id ? "todos" : a.id); document.getElementById("vitrine")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              {a.nome}
            </button>
          ))}
        </section>

        <section id="vitrine" className="vitrine">
          <div className="vitrine-topo">
            <h2>Produtos para o seu bichinho</h2>
            <p>{lista.length} {lista.length === 1 ? "produto" : "produtos"}</p>
          </div>

          <div className="filtros">
            <label>Pet
              <select value={animal} onChange={(e) => setAnimal(e.target.value)}>
                {ANIMAIS.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
              </select>
            </label>
            <label>Categoria
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Ordenar por
              <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                {Object.entries(ORDENS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label className="faixa">Até R$ {precoMax}
              <input type="range" min="20" max="300" step="10" value={precoMax} onChange={(e) => setPrecoMax(Number(e.target.value))} />
            </label>
            <label className="check">
              <input type="checkbox" checked={soPromo} onChange={(e) => setSoPromo(e.target.checked)} />
              Só promoções
            </label>
          </div>

          {lista.length === 0 ? (
            <div className="sem-resultado">
              <Mascot pose="sleep" size={150} />
              <h3>O Peter não achou nada com esses filtros</h3>
              <p>Tente buscar outra palavra ou ampliar o preço máximo.</p>
              <button className="btn btn-coral" onClick={limparFiltros}>Limpar filtros</button>
            </div>
          ) : (
            <div className="grade">
              {lista.map((p) => (
                <ProductCard key={p.id} produto={p} onAdd={adicionar} noCarrinho={itens.find((i) => i.id === p.id)?.qtd} />
              ))}
            </div>
          )}
        </section>

        <section id="servicos" className="servicos">
          <div className="servicos-texto">
            <Mascot pose="love" size={200} />
            <h2>Banho e tosa com hora marcada</h2>
            <p>Escolha o serviço, o porte do pet e o horário. Seu agendamento é anotado no bloco de notas da loja e o preço aparece antes de confirmar.</p>
            <ul className="vantagens">
              <li>Produtos hipoalergênicos</li>
              <li>Secagem sem estresse</li>
              <li>Laço de brinde para quem ama</li>
            </ul>
          </div>
          <div className="servicos-form">
            <Agendar usuario={usuario} />
          </div>
        </section>
      </main>

      <footer className="rodape">
        <Mascot pose="wink" size={90} />
        <div>
          <strong>Peter&apos;s Pet</strong>
          <p>Projeto acadêmico de e-commerce. Os pedidos são gravados em <code>pedidos.txt</code> e os agendamentos em <code>agendamentos.txt</code>.</p>
        </div>
      </footer>

      {aviso && (
        <div className="toast" role="status">
          <Mascot pose="jump" size={64} title="" />
          <p><strong>Adicionado!</strong> {aviso}</p>
          <button onClick={() => { setAviso(null); setCarrinhoAberto(true); }}>Ver carrinho</button>
        </div>
      )}

      <Cart
        aberto={carrinhoAberto}
        onFechar={() => setCarrinhoAberto(false)}
        itens={itens}
        onQtd={alterarQtd}
        onRemover={remover}
        onLimpar={() => setItens([])}
        usuario={usuario}
      />
      <Auth aberto={authAberto} onFechar={() => setAuthAberto(false)} onEntrar={entrar} />
    </>
  );
}

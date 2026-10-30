"use client";
import { useState } from "react";
import Mascot from "./Mascot";
import { SERVICOS, PORTES } from "../lib/servicos";
import { brl } from "../lib/loja";

const HORARIOS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function amanha() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function Agendar({ usuario }) {
  const inicial = { dono: "", telefone: "", pet: "", especie: "Cão", porte: "Pequeno", servico: "banhotosa", data: amanha(), hora: "10:00", obs: "" };
  const [f, setF] = useState(inicial);
  const [estado, setEstado] = useState({ tipo: "idle" });
  const muda = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const dono = f.dono || usuario?.nome || "";
  const preco = SERVICOS[f.servico].preco + PORTES[f.porte];

  async function enviar(e) {
    e.preventDefault();
    setEstado({ tipo: "enviando" });
    try {
      const r = await fetch("/api/agendamento", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, dono }) });
      const j = await r.json();
      if (!r.ok) return setEstado({ tipo: "erro", msg: j.erro || "Algo deu errado." });
      setEstado({ tipo: "ok", numero: j.numero });
    } catch {
      setEstado({ tipo: "erro", msg: "Sem conexão com o servidor. Confira se o site está rodando." });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div className="agenda-ok">
        <Mascot pose="jump" size={150} />
        <h3>{f.pet} está agendado!</h3>
        <p>Código <strong>{estado.numero}</strong>. O pedido foi anotado no arquivo <code>agendamentos.txt</code>.</p>
        <button className="btn btn-ghost" onClick={() => { setF(inicial); setEstado({ tipo: "idle" }); }}>Agendar outro pet</button>
      </div>
    );
  }

  return (
    <form className="agenda-form" onSubmit={enviar}>
      <div className="linha">
        <label>Seu nome<input value={dono} onChange={muda("dono")} required /></label>
        <label>Telefone<input value={f.telefone} onChange={muda("telefone")} inputMode="tel" placeholder="(21) 90000-0000" /></label>
      </div>
      <div className="linha">
        <label>Nome do pet<input value={f.pet} onChange={muda("pet")} required /></label>
        <label>Espécie
          <select value={f.especie} onChange={muda("especie")}><option>Cão</option><option>Gato</option></select>
        </label>
        <label>Porte
          <select value={f.porte} onChange={muda("porte")}>{Object.keys(PORTES).map((p) => <option key={p}>{p}</option>)}</select>
        </label>
      </div>
      <label>Serviço
        <select value={f.servico} onChange={muda("servico")}>
          {Object.entries(SERVICOS).map(([id, s]) => <option key={id} value={id}>{s.nome} - a partir de {brl(s.preco)}</option>)}
        </select>
      </label>
      <div className="linha">
        <label>Data<input type="date" min={amanha()} value={f.data} onChange={muda("data")} required /></label>
        <label>Horário
          <select value={f.hora} onChange={muda("hora")}>{HORARIOS.map((h) => <option key={h}>{h}</option>)}</select>
        </label>
      </div>
      <label>Observações<textarea rows="2" value={f.obs} onChange={muda("obs")} placeholder="Alergias, medo de secador, laço preferido..." /></label>
      {estado.tipo === "erro" && <p className="erro" role="alert">{estado.msg}</p>}
      <button className="btn btn-coral" disabled={estado.tipo === "enviando"}>
        {estado.tipo === "enviando" ? "Agendando..." : `Agendar por ${brl(preco)}`}
      </button>
    </form>
  );
}

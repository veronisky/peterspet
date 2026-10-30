"use client";
import { useState } from "react";
import Mascot from "./Mascot";

// Conta simulada: fica só no navegador (localStorage). A senha é guardada com hash SHA-256.
async function hash(texto) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function lerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("pp_users") || "[]");
  } catch {
    return [];
  }
}

export default function Auth({ aberto, onFechar, onEntrar }) {
  const [aba, setAba] = useState("entrar");
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (!aberto) return null;
  const muda = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function enviar(e) {
    e.preventDefault();
    setErro("");
    const email = form.email.trim().toLowerCase();
    if (!email.includes("@")) return setErro("Digite um e-mail válido.");
    if (form.senha.length < 6) return setErro("A senha precisa ter pelo menos 6 caracteres.");
    setCarregando(true);
    try {
      const usuarios = lerUsuarios();
      const h = await hash(form.senha);
      if (aba === "criar") {
        if (!form.nome.trim()) return setErro("Digite seu nome.");
        if (usuarios.some((u) => u.email === email)) return setErro("Este e-mail já tem conta. Use a aba Entrar.");
        const novo = { nome: form.nome.trim(), email, h };
        localStorage.setItem("pp_users", JSON.stringify([...usuarios, novo]));
        onEntrar({ nome: novo.nome, email });
      } else {
        const u = usuarios.find((x) => x.email === email && x.h === h);
        if (!u) return setErro("E-mail ou senha incorretos.");
        onEntrar({ nome: u.nome, email: u.email });
      }
      setForm({ nome: "", email: "", senha: "" });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="overlay" onClick={onFechar}>
      <div className="modal auth" role="dialog" aria-modal="true" aria-label="Entrar ou criar conta" onClick={(e) => e.stopPropagation()}>
        <button className="fechar" onClick={onFechar} aria-label="Fechar">×</button>
        <Mascot pose={aba === "entrar" ? "wink" : "love"} size={120} />
        <h2>{aba === "entrar" ? "Que bom te ver de novo!" : "Crie sua conta"}</h2>
        <div className="abas" role="tablist">
          <button role="tab" aria-selected={aba === "entrar"} className={aba === "entrar" ? "on" : ""} onClick={() => { setAba("entrar"); setErro(""); }}>Entrar</button>
          <button role="tab" aria-selected={aba === "criar"} className={aba === "criar" ? "on" : ""} onClick={() => { setAba("criar"); setErro(""); }}>Criar conta</button>
        </div>
        <form onSubmit={enviar} noValidate>
          {aba === "criar" && (
            <label>Seu nome
              <input value={form.nome} onChange={muda("nome")} autoComplete="name" />
            </label>
          )}
          <label>E-mail
            <input type="email" value={form.email} onChange={muda("email")} autoComplete="email" />
          </label>
          <label>Senha
            <input type="password" value={form.senha} onChange={muda("senha")} autoComplete={aba === "entrar" ? "current-password" : "new-password"} />
          </label>
          {erro && <p className="erro" role="alert">{erro}</p>}
          <button className="btn btn-coral" disabled={carregando}>{aba === "entrar" ? "Entrar" : "Criar conta"}</button>
        </form>
        <p className="mini">Conta de demonstração: os dados ficam apenas neste navegador.</p>
      </div>
    </div>
  );
}

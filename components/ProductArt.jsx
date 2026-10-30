"use client";
import { useState } from "react";

const INK = "#2A1814";

// Ilustrações dos produtos no mesmo estilo do mascote (contorno chocolate, cores chapadas).
function Arte({ tipo, cor }) {
  const s = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round", strokeLinecap: "round" };
  switch (tipo) {
    case "saco":
      return (
        <g {...s}>
          <path d="M52 40 L148 40 L156 176 Q156 186 146 186 L54 186 Q44 186 44 176 Z" fill={cor} />
          <path d="M52 40 Q100 62 148 40 L148 52 Q100 74 52 52 Z" fill="#fff" />
          <circle cx="100" cy="116" r="26" fill="#fff" />
          <path d="M92 108 l-4 -10 8 4 M108 108 l4 -10 -8 4" fill="#4A2C25" />
          <ellipse cx="100" cy="118" rx="14" ry="11" fill="#C9A183" />
          <ellipse cx="94" cy="116" rx="2.4" ry="3.2" fill={INK} stroke="none" />
          <ellipse cx="106" cy="116" rx="2.4" ry="3.2" fill={INK} stroke="none" />
        </g>
      );
    case "lata":
      return (
        <g {...s}>
          <path d="M54 66 L54 160 Q100 180 146 160 L146 66" fill={cor} />
          <ellipse cx="100" cy="66" rx="46" ry="16" fill="#fff" />
          <path d="M54 100 Q100 120 146 100 L146 130 Q100 150 54 130 Z" fill="#fff" />
          <path d="M92 114 q8 8 16 0" fill="none" />
        </g>
      );
    case "osso":
      return (
        <g {...s}>
          <path d="M54 78 a16 16 0 1 1 20 -14 L126 116 a16 16 0 1 1 18 22 a16 16 0 1 1 -28 10 L66 100 a16 16 0 1 1 -12 -22z" fill={cor} transform="translate(0 -4)" />
          <circle cx="86" cy="90" r="3" fill="#fff" stroke="none" />
        </g>
      );
    case "bola":
      return (
        <g {...s}>
          <circle cx="100" cy="106" r="58" fill={cor} />
          <path d="M48 84 Q100 110 152 84" fill="none" />
          <path d="M48 128 Q100 102 152 128" fill="none" />
          <circle cx="76" cy="76" r="8" fill="#fff" stroke="none" opacity=".7" />
        </g>
      );
    case "corda":
      return (
        <g {...s}>
          <path d="M40 136 Q70 80 100 110 T160 84" fill="none" strokeWidth="22" stroke={INK} />
          <path d="M40 136 Q70 80 100 110 T160 84" fill="none" strokeWidth="14" stroke={cor} />
          <circle cx="40" cy="136" r="14" fill="#fff" />
          <circle cx="160" cy="84" r="14" fill="#fff" />
        </g>
      );
    case "rato":
      return (
        <g {...s}>
          <path d="M150 140 Q190 150 176 108" fill="none" />
          <ellipse cx="96" cy="124" rx="56" ry="38" fill={cor} />
          <circle cx="62" cy="90" r="18" fill={cor} />
          <circle cx="106" cy="88" r="18" fill={cor} />
          <circle cx="58" cy="124" r="4" fill={INK} stroke="none" />
          <circle cx="44" cy="136" r="5" fill="#FF8FA3" />
        </g>
      );
    case "varinha":
      return (
        <g {...s}>
          <path d="M50 160 L140 70" fill="none" strokeWidth="9" />
          <path d="M140 70 Q160 40 176 56 Q150 56 146 82z" fill={cor} />
          <path d="M140 70 Q178 70 178 96 Q156 88 138 78z" fill="#FFD54A" />
          <path d="M140 70 Q150 108 172 112 Q160 90 140 70z" fill="#7FD6FF" />
        </g>
      );
    case "cama":
      return (
        <g {...s}>
          <ellipse cx="100" cy="146" rx="76" ry="30" fill={cor} />
          <ellipse cx="100" cy="132" rx="52" ry="16" fill="#fff" />
          <path d="M44 126 Q40 86 100 80 Q160 86 156 126" fill={cor} opacity=".0" stroke="none" />
          <path d="M74 126 q10 -14 26 -14 q16 0 26 14" fill="#C9A183" />
        </g>
      );
    case "casinha":
      return (
        <g {...s}>
          <path d="M34 98 L100 40 L166 98 Z" fill={cor} />
          <rect x="48" y="98" width="104" height="82" fill="#fff" />
          <path d="M80 180 L80 128 Q100 108 120 128 L120 180 Z" fill={INK} />
        </g>
      );
    case "coleira":
      return (
        <g {...s}>
          <ellipse cx="100" cy="110" rx="64" ry="54" fill="none" strokeWidth="22" />
          <ellipse cx="100" cy="110" rx="64" ry="54" fill="none" strokeWidth="14" stroke={cor} />
          <rect x="84" y="152" width="32" height="12" rx="4" fill="#FFD54A" />
          <circle cx="100" cy="182" r="14" fill="#FFD54A" />
          <path d="M96 182 l4 5 l4 -5 a3 3 0 0 0 -4 -4 a3 3 0 0 0 -4 4z" fill="#FF5C7A" stroke="none" />
        </g>
      );
    case "guia":
      return (
        <g {...s}>
          <rect x="52" y="64" width="96" height="76" rx="22" fill={cor} />
          <circle cx="100" cy="102" r="14" fill="#fff" />
          <path d="M120 140 Q130 176 170 170" fill="none" strokeWidth="6" />
          <path d="M60 140 Q50 176 60 186" fill="none" strokeWidth="6" />
        </g>
      );
    case "frasco":
      return (
        <g {...s}>
          <rect x="84" y="34" width="32" height="22" rx="5" fill="#fff" />
          <path d="M80 56 L120 56 L136 76 L136 178 Q136 188 126 188 L74 188 Q64 188 64 178 L64 76 Z" fill={cor} />
          <rect x="74" y="104" width="52" height="46" rx="10" fill="#fff" />
          <circle cx="100" cy="127" r="10" fill="#FF8FA3" stroke="none" />
        </g>
      );
    case "aquario":
      return (
        <g {...s}>
          <rect x="30" y="52" width="140" height="116" rx="14" fill="#BDEBFF" />
          <path d="M30 86 Q60 76 100 86 T170 86 L170 154 Q170 168 156 168 L44 168 Q30 168 30 154 Z" fill={cor} />
          <path d="M64 120 q18 -20 38 0 q-20 20 -38 0z M102 120 l16 -10 l0 20z" fill="#FFB02E" />
          <circle cx="76" cy="116" r="2.6" fill={INK} stroke="none" />
          <circle cx="132" cy="80" r="5" fill="#fff" />
          <circle cx="146" cy="100" r="3.4" fill="#fff" />
        </g>
      );
    case "gaiola":
      return (
        <g {...s}>
          <path d="M60 56 Q100 24 140 56" fill="none" />
          <rect x="52" y="56" width="96" height="104" rx="8" fill="#FFF3C4" />
          <path d="M72 56 L72 160 M92 56 L92 160 M108 56 L108 160 M128 56 L128 160" fill="none" strokeWidth="3" />
          <rect x="44" y="160" width="112" height="22" rx="8" fill={cor} />
          <path d="M70 128 L130 128" fill="none" strokeWidth="5" />
          <ellipse cx="100" cy="112" rx="14" ry="16" fill="#7FD6FF" />
          <circle cx="104" cy="106" r="2.4" fill={INK} stroke="none" />
          <path d="M112 112 l10 3 l-10 3z" fill="#FFB02E" />
        </g>
      );
    default:
      return <circle cx="100" cy="110" r="56" fill={cor} {...s} />;
  }
}

/**
 * Mostra a foto real do produto se existir em /produtos/<id>.jpg
 * (basta colocar o arquivo em public/produtos). Se não existir, usa a ilustração.
 */
export default function ProductArt({ produto, className = "" }) {
  const [semFoto, setSemFoto] = useState(false);

  return (
    <div className={`prod-art ${className}`} style={{ "--cor": produto.cor }}>
      {!semFoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/produtos/${produto.id}.jpg`}
          alt={produto.nome}
          loading="lazy"
          onError={() => setSemFoto(true)}
        />
      )}
      {semFoto && (
        <svg viewBox="0 0 200 200" role="img" aria-label={produto.nome}>
          <ellipse cx="100" cy="190" rx="60" ry="7" fill={INK} opacity=".12" />
          <Arte tipo={produto.art} cor={produto.cor} />
        </svg>
      )}
    </div>
  );
}

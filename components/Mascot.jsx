"use client";
import { useId } from "react";

/**
 * Peter - mascote chibi do Peter's Pet (inspirado no gato da foto de referência:
 * máscara marrom-escura, risca branca no nariz, focinho e peito brancos e a lingüinha de fora).
 *
 * poses: "happy" | "wink" | "sleep" | "jump" | "box" | "love"
 */
const INK = "#2A1814";
const COCOA = "#4A2C25";
const FUR = "#C9A183";
const PINK = "#FF8FA3";
const EYE = "#7FD6FF";

export default function Mascot({ pose = "happy", size = 200, className = "", title = "Peter, o mascote do Peter's Pet" }) {
  const uid = useId().replace(/:/g, "");
  const clip = `head-${uid}`;
  const sleeping = pose === "sleep";
  const winking = pose === "wink";
  const blep = pose !== "sleep";

  return (
    <svg
      viewBox="0 0 200 210"
      width={size}
      height={size * 1.05}
      className={`mascot mascot-${pose} ${className}`}
      role="img"
      aria-label={title}
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id={clip}>
          <ellipse cx="100" cy="92" rx="68" ry="56" />
        </clipPath>
      </defs>

      {/* sombra no chão */}
      <ellipse className="m-shadow" cx="100" cy="203" rx="52" ry="6" fill={INK} opacity=".14" />

      {/* rabo */}
      <g className="m-tail">
        <path d="M138 172 C178 170 188 128 165 118" fill="none" stroke={INK} strokeWidth="19" strokeLinecap="round" />
        <path d="M138 172 C178 170 188 128 165 118" fill="none" stroke={FUR} strokeWidth="12" strokeLinecap="round" />
        <path d="M168 122 C164 119 163 117 163 117" fill="none" stroke={COCOA} strokeWidth="12" strokeLinecap="round" />
      </g>

      {/* corpo */}
      <g strokeLinejoin="round" stroke={INK} strokeWidth="3.5">
        <ellipse cx="100" cy="168" rx="40" ry="28" fill="#fff" />
        {pose === "jump" ? (
          <>
            <path d="M66 150 C52 130 48 118 52 108" fill="none" strokeWidth="15" strokeLinecap="round" />
            <path d="M66 150 C52 130 48 118 52 108" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
            <path d="M134 150 C148 130 152 118 148 108" fill="none" strokeWidth="15" strokeLinecap="round" />
            <path d="M134 150 C148 130 152 118 148 108" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="192" rx="14" ry="9" fill="#fff" />
            <ellipse cx="120" cy="192" rx="14" ry="9" fill="#fff" />
          </>
        )}
      </g>

      {/* orelhas */}
      <g strokeLinejoin="round" stroke={INK} strokeWidth="3.5">
        <path d="M40 66 L34 14 L88 42 Z" fill={COCOA} />
        <path d="M47 55 L44 29 L69 43 Z" fill={PINK} stroke="none" />
        <path d="M160 66 L166 14 L112 42 Z" fill={COCOA} />
        <path d="M153 55 L156 29 L131 43 Z" fill={PINK} stroke="none" />
      </g>

      {/* cabeça */}
      <g className="m-head">
        <ellipse cx="100" cy="92" rx="68" ry="56" fill={FUR} />
        <g clipPath={`url(#${clip})`}>
          {/* máscara escura */}
          <ellipse cx="68" cy="88" rx="34" ry="30" fill={COCOA} />
          <ellipse cx="132" cy="88" rx="34" ry="30" fill={COCOA} />
          <ellipse cx="60" cy="48" rx="26" ry="14" fill={COCOA} />
          <ellipse cx="140" cy="48" rx="26" ry="14" fill={COCOA} />
          {/* risca branca */}
          <path d="M100 36 C109 47 111 62 108 76 C119 84 121 98 113 114 L87 114 C79 98 81 84 92 76 C89 62 91 47 100 36Z" fill="#fff" />
          {/* focinho e queixo */}
          <ellipse cx="100" cy="112" rx="28" ry="19" fill="#fff" />
          <ellipse cx="100" cy="134" rx="20" ry="12" fill="#fff" />
        </g>
        <ellipse cx="100" cy="92" rx="68" ry="56" fill="none" stroke={INK} strokeWidth="3.5" />

        {/* bochechas */}
        <ellipse cx="46" cy="116" rx="9" ry="5.5" fill={PINK} opacity=".7" />
        <ellipse cx="154" cy="116" rx="9" ry="5.5" fill={PINK} opacity=".7" />

        {/* olhos */}
        {sleeping ? (
          <g fill="none" stroke="#CFEFFF" strokeWidth="4.5" strokeLinecap="round">
            <path d="M55 92 Q68 104 81 92" />
            <path d="M119 92 Q132 104 145 92" />
          </g>
        ) : (
          <>
            <g className="m-eye">
              <ellipse cx="68" cy="90" rx="15" ry="17" fill={EYE} stroke={INK} strokeWidth="2.5" />
              <ellipse cx="69" cy="93" rx="9" ry="12" fill="#1B0F0C" />
              <circle cx="63" cy="84" r="5" fill="#fff" />
              <circle cx="74" cy="98" r="2.4" fill="#fff" />
            </g>
            {winking ? (
              <path d="M119 92 Q132 80 145 92" fill="none" stroke="#CFEFFF" strokeWidth="4.5" strokeLinecap="round" />
            ) : (
              <g className="m-eye">
                <ellipse cx="132" cy="90" rx="15" ry="17" fill={EYE} stroke={INK} strokeWidth="2.5" />
                <ellipse cx="131" cy="93" rx="9" ry="12" fill="#1B0F0C" />
                <circle cx="126" cy="84" r="5" fill="#fff" />
                <circle cx="137" cy="98" r="2.4" fill="#fff" />
              </g>
            )}
          </>
        )}

        {/* nariz e boca */}
        <path d="M92 102 Q100 98 108 102 Q106 110 100 111 Q94 110 92 102Z" fill={INK} />
        <path d="M100 111 L100 116" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M100 116 Q93 124 86 117 M100 116 Q107 124 114 117" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        {blep && (
          <g>
            <path d="M101 121 Q101 131 108 130 Q113 129 112 121 Z" fill={PINK} stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M107 123 L107 128" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
          </g>
        )}

        {/* bigodes */}
        <g stroke={INK} strokeWidth="2" strokeLinecap="round" opacity=".55">
          <path d="M60 112 L28 106" />
          <path d="M60 119 L28 122" />
          <path d="M140 112 L172 106" />
          <path d="M140 119 L172 122" />
        </g>
      </g>

      {/* extras de cada pose */}
      {sleeping && (
        <g className="m-zzz" fontFamily="Baloo 2, sans-serif" fontWeight="800" fill={COCOA}>
          <text x="152" y="52" fontSize="22">z</text>
          <text x="167" y="34" fontSize="28">Z</text>
          <text x="184" y="12" fontSize="34">Z</text>
        </g>
      )}

      {pose === "jump" && (
        <g className="m-sparks" fill="#FFD54A" stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
          <path d="M20 40 l5 11 11 5 -11 5 -5 11 -5 -11 -11 -5 11 -5z" />
          <path d="M176 24 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4z" />
          <path d="M12 96 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" />
        </g>
      )}

      {pose === "love" && (
        <g className="m-hearts" fill={PINK} stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
          <path d="M30 40 c-10 -10 -22 4 -10 14 l10 9 10 -9 c12 -10 0 -24 -10 -14z" />
          <path d="M172 26 c-7 -7 -16 3 -7 10 l7 6 7 -6 c9 -7 0 -17 -7 -10z" />
        </g>
      )}

      {pose === "box" && (
        <g strokeLinejoin="round" stroke={INK} strokeWidth="3.5">
          <rect x="52" y="152" width="96" height="46" rx="6" fill="#E3B27A" />
          <rect x="52" y="152" width="96" height="12" rx="4" fill="#CF9A5F" />
          <rect x="92" y="152" width="16" height="46" fill="#FFD54A" />
          <text x="100" y="187" textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="11" fill={INK} stroke="none">
            Peter&apos;s
          </text>
          <ellipse cx="68" cy="152" rx="13" ry="8" fill="#fff" />
          <ellipse cx="132" cy="152" rx="13" ry="8" fill="#fff" />
        </g>
      )}
    </svg>
  );
}

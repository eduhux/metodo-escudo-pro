"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botão "dot border" — no hover, 4 pontos voam para os cantos e as linhas
 * tracejadas desenham a borda (efeito do MengTo/threeui), portado para um
 * botão React nativo (sem iframe/CDN) para manter onClick/acessibilidade.
 * Cor de preenchimento: verde (semântica de "concluído"), não azul.
 */
export function DotBorderButton({
  children,
  onClick,
  active = false,
  type = "button",
  className,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  type?: "button" | "submit";
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div className={cn("deb-wrapper", className)} data-active={active}>
      <style jsx global>{`
        .deb-wrapper {
          --dot-size: 8px;
          --line-weight: 1px;
          --line-distance: 0.8rem 1rem;
          --animation-speed: 0.35s;
          --dot-color: #ffffffaa;
          --line-color: #ffffffaa;
          --grid-color: #ffffff33;
          --fill: #16a34a;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--line-distance);
          background: transparent;
          user-select: none;
        }
        .deb-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            45deg,
            var(--grid-color) 0 1px,
            transparent 2px 5px
          );
          opacity: 0;
          z-index: -1;
        }
        .deb-wrapper:has(.deb-btn:hover)::after {
          animation: deb-opacity calc(var(--animation-speed) * 4) ease-in-out
            forwards;
        }
        @keyframes deb-opacity {
          80% { opacity: 0; }
          100% { opacity: 1; }
        }

        .deb-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.8rem 1.5rem;
          background-color: transparent;
          border: 1px solid var(--grid-color);
          color: #ffffffdd;
          font-family: inherit;
          letter-spacing: -0.01em;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s ease-in-out, letter-spacing 0.2s ease-in-out,
            background-color 0.25s, color 0.25s, border-color 0.25s;
        }
        .deb-btn:hover {
          background-color: var(--fill);
          color: #fff;
          border-color: transparent;
          transform: scale(1.04);
          letter-spacing: 0.035em;
        }
        .deb-btn:active {
          background-color: var(--fill);
          transform: scale(0.98);
          letter-spacing: 0.02em;
        }
        .deb-wrapper[data-active="true"] .deb-btn {
          background-color: var(--fill);
          color: #fff;
          border-color: transparent;
        }
        .deb-btn svg {
          transition: all 0.2s ease-in-out;
        }

        .deb-dot {
          position: absolute;
          width: var(--dot-size);
          aspect-ratio: 1;
          border-radius: 2px;
          background-color: var(--dot-color);
          transition: all 0.3s ease-in-out;
          opacity: 0;
        }
        .deb-wrapper:has(.deb-btn:hover) .deb-dot.deb-top.deb-left {
          top: 50%; left: 20%;
          animation: deb-tl var(--animation-speed) ease-in-out forwards;
        }
        @keyframes deb-tl {
          90% { opacity: 0.6; }
          100% { top: calc(var(--dot-size) * -0.5); left: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .deb-wrapper:has(.deb-btn:hover) .deb-dot.deb-top.deb-right {
          top: 50%; right: 20%;
          animation: deb-tr var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 0.6);
        }
        @keyframes deb-tr {
          80% { opacity: 0.6; }
          100% { top: calc(var(--dot-size) * -0.5); right: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .deb-wrapper:has(.deb-btn:hover) .deb-dot.deb-bottom.deb-right {
          bottom: 50%; right: 20%;
          animation: deb-br var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 1.2);
        }
        @keyframes deb-br {
          80% { opacity: 0.6; }
          100% { bottom: calc(var(--dot-size) * -0.5); right: calc(var(--dot-size) * -0.5); opacity: 1; }
        }
        .deb-wrapper:has(.deb-btn:hover) .deb-dot.deb-bottom.deb-left {
          bottom: 50%; left: 20%;
          animation: deb-bl var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 1.8);
        }
        @keyframes deb-bl {
          80% { opacity: 0.6; }
          100% { bottom: calc(var(--dot-size) * -0.5); left: calc(var(--dot-size) * -0.5); opacity: 1; }
        }

        .deb-line { position: absolute; transition: all 0.3s ease-in-out; }
        .deb-line.deb-horizontal {
          height: var(--line-weight);
          width: 100%;
          background-image: repeating-linear-gradient(
            90deg,
            #0000 0 calc(var(--line-weight) * 2),
            var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
          );
        }
        .deb-line.deb-vertical {
          width: var(--line-weight);
          height: 100%;
          background-image: repeating-linear-gradient(
            0deg,
            #0000 0 calc(var(--line-weight) * 2),
            var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
          );
        }
        .deb-line.deb-top { top: calc(var(--line-weight) * -0.5); transform-origin: top left; transform: rotate(5deg) scaleX(0); }
        .deb-wrapper:has(.deb-btn:hover) .deb-line.deb-top { animation: deb-draw-top var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 0.8); }
        @keyframes deb-draw-top { 100% { transform: rotate(0deg) scaleX(1); } }
        .deb-line.deb-bottom { bottom: calc(var(--line-weight) * -0.5); transform-origin: bottom right; transform: rotate(5deg) scaleX(0); }
        .deb-wrapper:has(.deb-btn:hover) .deb-line.deb-bottom { animation: deb-draw-bottom var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 2); }
        @keyframes deb-draw-bottom { 100% { transform: rotate(0deg) scaleX(1); } }
        .deb-line.deb-left { left: calc(var(--line-weight) * -0.5); transform-origin: bottom left; transform: rotate(0deg) scaleY(0); }
        .deb-wrapper:has(.deb-btn:hover) .deb-line.deb-left { animation: deb-draw-left var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 2.4); }
        @keyframes deb-draw-left { 100% { transform: rotate(0deg) scaleY(1); } }
        .deb-line.deb-right { right: calc(var(--line-weight) * -0.5); transform-origin: top right; transform: rotate(5deg) scaleY(0); }
        .deb-wrapper:has(.deb-btn:hover) .deb-line.deb-right { animation: deb-draw-right var(--animation-speed) ease-in-out forwards; animation-delay: calc(var(--animation-speed) * 1.4); }
        @keyframes deb-draw-right { 100% { transform: rotate(0deg) scaleY(1); } }

        @media (prefers-reduced-motion: reduce) {
          .deb-wrapper *,
          .deb-wrapper::after { animation: none !important; }
          .deb-btn:hover { transform: none; letter-spacing: -0.01em; }
        }
      `}</style>

      <span className="deb-line deb-horizontal deb-top" />
      <span className="deb-line deb-vertical deb-right" />
      <span className="deb-line deb-horizontal deb-bottom" />
      <span className="deb-line deb-vertical deb-left" />

      <span className="deb-dot deb-top deb-left" />
      <span className="deb-dot deb-top deb-right" />
      <span className="deb-dot deb-bottom deb-right" />
      <span className="deb-dot deb-bottom deb-left" />

      <button type={type} className="deb-btn" onClick={onClick} aria-label={ariaLabel}>
        {children}
      </button>
    </div>
  );
}

export default DotBorderButton;

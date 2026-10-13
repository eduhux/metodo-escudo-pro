"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo animado em WebGL ("smokey") — ondas suaves que reagem ao mouse.
 * Reescrito a partir do snippet original para corrigir dois problemas:
 *  - o efeito reinicializava o WebGL e empilhava loops de render a cada
 *    movimento do mouse (usava estado nas dependências do useEffect);
 *  - não cancelava o requestAnimationFrame ao desmontar (vazamento).
 * Aqui o mouse vive em um ref, o efeito roda uma única vez, e respeitamos
 * "prefers-reduced-motion" (renderiza um quadro estático).
 */

const vertexSrc = `
  attribute vec4 a_position;
  void main() { gl_Position = a_position; }
`;

const fragmentSrc = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
  vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
  float time = iTime * 0.5;
  vec2 mouse = iMouse / iResolution;
  vec2 rippleCenter = 2.0 * mouse - 1.0;

  vec2 distortion = centeredUV;
  for (float i = 1.0; i < 8.0; i++) {
    distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 3.1415);
    distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 3.1415);
  }

  float wave = abs(sin(distortion.x + distortion.y + time));
  float glow = smoothstep(0.9, 0.2, wave);
  fragColor = vec4(u_color * glow, 1.0);
}

void main() { mainImage(gl_FragColor, gl_FragCoord.xy); }
`;

type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

interface SmokeyBackgroundProps {
  /** Cor do "fumaça" em hex (#rrggbb). Padrão: cobalto da marca. */
  color?: string;
  backdropBlurAmount?: BlurSize;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  return [r, g, b];
}

export function SmokeyBackground({
  color = "#527AFF",
  backdropBlurAmount = "sm",
  className = "",
}: SmokeyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, hovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL não suportado — fundo animado desativado.");
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vertexSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uMouse = gl.getUniformLocation(program, "iMouse");
    const uColor = gl.getUniformLocation(program, "u_color");

    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColor, r, g, b);

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const start = Date.now();
    let raf = 0;
    let lastW = -1;
    let lastH = -1;

    const render = () => {
      const w = canvas.clientWidth | 0;
      const h = canvas.clientHeight | 0;
      if (w !== lastW || h !== lastH) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        lastW = w;
        lastH = h;
      }

      const t = reduce ? 6 : (Date.now() - start) / 1000;
      const mx = mouse.current.hovering ? mouse.current.x : w / 2;
      const my = mouse.current.hovering ? h - mouse.current.y : h / 2;

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reduce) raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onEnter = () => (mouse.current.hovering = true);
    const onLeave = () => (mouse.current.hovering = false);

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);

    render();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [color]);

  const blur = blurClassMap[backdropBlurAmount] ?? blurClassMap.sm;

  return (
    <div
      aria-hidden
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className={`absolute inset-0 ${blur}`} />
    </div>
  );
}

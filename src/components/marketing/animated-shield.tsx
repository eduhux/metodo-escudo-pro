export function AnimatedShield() {
  return (
    <svg
      viewBox="0 0 320 340"
      className="as-shield w-[300px] md:w-[380px]"
      role="img"
      aria-label="Emblema de escudo se montando"
    >
      <defs>
        <linearGradient id="asGL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f77f0" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="asGR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcaafb" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="asShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="asClip">
          <path d="M160 58 L248 90 L248 164 C248 224 208 260 160 278 C112 260 72 224 72 164 L72 90 Z" />
        </clipPath>
      </defs>

      <g className="as-ring-fade">
        <g className="as-ring-spin">
          <circle cx="160" cy="166" r="150" fill="none" stroke="#7c5cf6" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 16" />
          <circle cx="160" cy="166" r="150" fill="none" stroke="#a78bfa" strokeOpacity="0.7" strokeWidth="3" strokeDasharray="70 400" strokeLinecap="round" />
          <circle cx="160" cy="166" r="137" fill="none" stroke="#a78bfa" strokeOpacity="0.16" strokeWidth="1" />
        </g>
      </g>

      <g className="as-p-fade">
        <g className="as-particles-spin">
          <circle cx="318" cy="166" r="3.5" fill="#c4b5fd" />
          <circle cx="272" cy="278" r="2.5" fill="#a78bfa" />
          <circle cx="160" cy="322" r="3.5" fill="#c4b5fd" />
          <circle cx="48" cy="278" r="2.5" fill="#a78bfa" />
          <circle cx="4" cy="166" r="3.5" fill="#c4b5fd" />
          <circle cx="48" cy="54" r="2.5" fill="#a78bfa" />
          <circle cx="160" cy="10" r="3.5" fill="#c4b5fd" />
          <circle cx="272" cy="54" r="2.5" fill="#a78bfa" />
        </g>
      </g>

      <g transform="translate(50 46)">
        <g className="as-p as-left">
          <path d="M110 12 L22 44 L22 118 C22 178 62 214 110 232 Z" fill="url(#asGL)" stroke="#c4b5fd" strokeWidth="2" strokeOpacity="0.5" />
        </g>
        <g className="as-p as-right">
          <path d="M110 12 L198 44 L198 118 C198 178 158 214 110 232 Z" fill="url(#asGR)" stroke="#d9ccff" strokeWidth="2" strokeOpacity="0.5" />
        </g>
        <g className="as-p as-spine">
          <path d="M110 12 L116 44 L110 232 L104 44 Z" fill="#ffffff" opacity="0.1" />
        </g>
        <g className="as-p as-hl">
          <path d="M110 14 L196 45 L196 70 C170 55 140 47 110 47 C80 47 50 55 24 70 L24 45 Z" fill="#ffffff" />
        </g>
        <path className="as-bevel" d="M110 34 L178 58 L178 116 C178 166 146 196 110 210 C74 196 42 166 42 116 L42 58 Z" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="640" />
        <circle className="as-rivet" cx="110" cy="22" r="4" fill="#e9e2ff" />
        <circle className="as-rivet" cx="180" cy="52" r="4" fill="#e9e2ff" />
        <circle className="as-rivet" cx="190" cy="116" r="4" fill="#e9e2ff" />
        <circle className="as-rivet" cx="150" cy="198" r="4" fill="#e9e2ff" />
        <circle className="as-rivet" cx="70" cy="198" r="4" fill="#e9e2ff" />
        <circle className="as-rivet" cx="30" cy="116" r="4" fill="#e9e2ff" />
        <circle className="as-rivet" cx="40" cy="52" r="4" fill="#e9e2ff" />
        <g clipPath="url(#asClip)" transform="translate(-50 -46)">
          <rect className="as-shine" x="-70" y="0" width="70" height="320" fill="url(#asShine)" />
        </g>
        <g className="as-p as-mark">
          <path d="M110 78 L133 128 L110 116 L87 128 Z" fill="#ffffff" />
          <circle cx="110" cy="150" r="9" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}

export function Skyline() {
  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full opacity-40"
      viewBox="0 0 1280 500"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <g fill="none" className="stroke-paper" strokeWidth="1.2">
        <ellipse cx="160" cy="60" rx="52" ry="17" />
        <ellipse cx="1040" cy="42" rx="42" ry="14" />
        <ellipse cx="620" cy="26" rx="32" ry="11" />
        <rect x="0" y="230" width="90" height="270" />
        <rect x="90" y="190" width="74" height="310" />
        <rect x="200" y="250" width="104" height="250" />
        <rect x="330" y="160" width="68" height="340" />
        <rect x="430" y="215" width="90" height="285" />
        <rect x="550" y="175" width="60" height="325" />
        <rect x="640" y="245" width="120" height="255" />
        <rect x="790" y="150" width="68" height="350" />
        <rect x="890" y="225" width="98" height="275" />
        <rect x="1020" y="185" width="74" height="315" />
        <rect x="1130" y="240" width="150" height="260" />
        <line x1="0" y1="230" x2="1280" y2="230" />
      </g>
    </svg>
  );
}

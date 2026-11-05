/**
 * Screenshot reconstruction of Vector 38; exact Figma path/gradient handles remain unavailable.
 * Mobile uses its own full-copy glow rather than shrinking the desktop vector.
 */
export function HeroGradient({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        data-hero-gradient="mobile"
        viewBox="0 0 541 640"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 h-full w-[541px] -translate-x-1/2 md:hidden"
      >
        <defs>
          <filter id="curiecode-mobile-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="65" />
          </filter>
        </defs>
        <g filter="url(#curiecode-mobile-glow)">
          <ellipse
            cx="120"
            cy="245"
            rx="155"
            ry="165"
            fill="var(--color-electric-blue)"
            opacity="0.25"
          />
          <ellipse
            cx="320"
            cy="330"
            rx="170"
            ry="195"
            fill="var(--color-aqua-mint)"
            opacity="0.2"
          />
        </g>
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-hero-gradient
      viewBox="0 0 1425 479"
      className="pointer-events-none absolute -top-[162px] left-1/2 hidden h-[479px] w-full max-w-[1425px] -translate-x-1/2 overflow-visible md:block"
    >
      <defs>
        <linearGradient
          id="curiecode-hero-fill"
          x1="0"
          y1="0"
          x2="0"
          y2="479"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-black)" />
          <stop offset="0.5" stopColor="var(--color-aqua-mint)" />
          <stop offset="1" stopColor="var(--color-electric-blue)" />
        </linearGradient>
        <filter
          id="curiecode-hero-blur"
          x="-50%"
          y="-100%"
          width="200%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="128.75" />
        </filter>
      </defs>
      <g transform="rotate(-180 712.5 239.5)" filter="url(#curiecode-hero-blur)">
        <path
          fill="url(#curiecode-hero-fill)"
          d="M0 5C305 159 1013 445 1320 476C1417 491 1463 442 1390 392C1284 320 665 209 660 106C653 36 1078 125 1242 110C1330 102 1381 64 1300 40C1090 -1 325 0 0 5Z"
        />
      </g>
    </svg>
  );
}

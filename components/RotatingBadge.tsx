import React from "react";

export default function RotatingBadge() {
  const text = "SENIOR FRONTEND DEVELOPER · ";
  const radius = 52;
  const chars = text.split("");
  const angleStep = 360 / chars.length;

  return (
    <div
      className="absolute top-1/2 right-[clamp(2rem,6vw,7rem)] -translate-y-1/2 pointer-events-none"
      style={{
        width: radius * 2 + 40,
        height: radius * 2 + 40,
      }}
    >
      <svg
        viewBox={`0 0 ${radius * 2 + 40} ${radius * 2 + 40}`}
        className="w-full h-full animate-spin-badge"
      >
        {chars.map((ch, i) => {
          const angle = (angleStep * i - 90) * (Math.PI / 180);
          const x = radius + 20 + radius * Math.cos(angle);
          const y = radius + 20 + radius * Math.sin(angle);
          const rot = angleStep * i;

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${rot}, ${x}, ${y})`}
              className="font-mono text-[9px] font-normal tracking-wider fill-white/85"
            >
              {ch}
            </text>
          );
        })}

        <circle
          cx={radius + 20}
          cy={radius + 20}
          r={18}
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const P5Hero = dynamic(() => import("@/components/P5Hero"), { ssr: false });

interface Props {
  children: React.ReactNode;
}

export default function ScrollZoomHero({ children }: Props) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Scroll distance over which the zoom + fade happens (1.5x viewport height)
      const zoomDistance = vh * 1.5;

      // 0 → 1 progress through the zoom phase
      const progress = Math.min(scrollY / zoomDistance, 1);

      // Scale from 1 → 8 (zooms in until just green bg remains)
      const newScale = 1 + progress * 7;

      // Hero fades out in the second half of the zoom
      const fadeStart = 0.4;
      const heroFade =
        progress < fadeStart
          ? 1
          : 1 - Math.min((progress - fadeStart) / (1 - fadeStart), 1);

      // Content fades in once zoom is nearly complete
      const contentFadeStart = 0.85;
      const contentFade =
        progress < contentFadeStart
          ? 0
          : Math.min((progress - contentFadeStart) / (1 - contentFadeStart), 1);

      setScale(newScale);
      setHeroOpacity(heroFade);
      setContentOpacity(contentFade);
      setContentVisible(progress > contentFadeStart);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Tall scroll container — gives scroll distance for the zoom */}
      <div style={{ height: "350vh", position: "relative" }}>
        {/* Sticky viewport — stays in view while scrolling through the container */}
        <div
          ref={stickyRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            background: "#285d3f",
          }}
        >
          {/* Zooming canvas layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              willChange: "transform",
              opacity: heroOpacity,
              transition: "opacity 0.05s linear",
            }}
          >
            <P5Hero />
          </div>

          {/* Name overlay — fades out with the hero */}
          <div
            className="absolute inset-0 flex flex-col justify-end pb-16 px-10 pointer-events-none"
            style={{ opacity: heroOpacity, transition: "opacity 0.05s linear" }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-3"
              style={{
                color: "var(--green-light)",
                fontFamily: "var(--font-body)",
              }}
            >
              Creative Developer
            </p>
            <h1
              className="text-6xl md:text-8xl leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cream)",
              }}
            >
              Betty <br />
              <em style={{ color: "var(--pink)" }}>Kronemeijer</em>
            </h1>
          </div>

          {/* Content fade-in — appears over the green background at end of zoom */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-10"
            style={{
              opacity: contentOpacity,
              transition: "opacity 0.1s linear",
              pointerEvents: contentVisible ? "auto" : "none",
              background: contentOpacity > 0.01 ? "#285d3f" : "transparent",
            }}
          >
            <div style={{ maxWidth: "36rem" }}>
              <p
                className="text-xs tracking-widest uppercase mb-6 mx-8"
                style={{
                  color: "var(--green-light)",
                  fontFamily: "var(--font-body)",
                }}
              >
                ✦ scroll to explore
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

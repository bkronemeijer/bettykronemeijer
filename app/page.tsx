"use client";

import BlobBackground from "@/components/BlobBackground";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import RotatingBadge from "@/components/RotatingBadge";
import { getNearestRedactionFamily } from "@/utils/getRedactionFamily";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const P5Sketch = dynamic(() => import("../components/P5Sketch"), {
  ssr: false,
});

export default function Home() {
  const [scale, setScale] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const contentVisible = useRef(false);
  const darknessRef = useRef(0);

  const [heroFontFamily, setHeroFontFamily] = useState("Redaction");

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.5), 1);

      setScale(1 + progress * 16);

      const hOpacity =
        progress < 0.35 ? 1 : 1 - Math.min((progress - 0.35) / 0.4, 1);

      setHeroOpacity(hOpacity);
      setHeroVisible(hOpacity > 0.1);

      const cp = Math.max(0, Math.min((progress - 0.82) / 0.18, 1));

      setContentOpacity(cp);
      contentVisible.current = cp > 0.01;

      darknessRef.current = Math.max(0, Math.min((progress - 0.45) / 0.4, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return; // throttle to one update per frame

      rafId = requestAnimationFrame(() => {
        const percent = (e.clientX / window.innerWidth) * 100;
        setHeroFontFamily(getNearestRedactionFamily(percent));
        rafId = null;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main>
      <div className="relative h-[350vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary-blue">
          {/* Zooming hero */}
          <div
            className="absolute  inset-0 will-change-transform transition-opacity duration-75 ease-linear"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "50% 56%",
              opacity: heroOpacity,
            }}
          >
            {/* p5 canvas */}
            <div className="absolute inset-0">
              <P5Sketch />
            </div>

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center mx-4 justify-center pointer-events-none z-10">
              <div
                className="font-bold text-[clamp(3rem,9.5vw,10vw)] leading-[1] mx-4 text-white text-center tracking-[0.01em] select-none transition-[font-family] duration-150"
                style={{ fontFamily: `"${heroFontFamily}", sans-serif` }}
              >
                <div>BETTY</div>
                <div className="text-orange">KRONEMEIJER</div>
              </div>
            </div>

            <RotatingBadge />
          </div>

          {/* Content after zoom */}
          <div
            className="absolute inset-0 transition-opacity duration-100 ease-linear"
            style={{
              opacity: contentOpacity,
              pointerEvents: contentVisible.current ? "auto" : "none",
            }}
          >
            <BlobBackground />
            <Intro />
            <Projects />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}

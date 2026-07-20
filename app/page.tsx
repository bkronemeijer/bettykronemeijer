"use client";

import BlobBackground from "@/components/BlobBackground";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import Projects from "@/components/projects/Projects";
import RotatingBadge from "@/components/RotatingBadge";
import { getIsChrome } from "@/utils/getIsChrome";
import { getNearestRedactionFamily } from "@/utils/getRedactionFamily";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const P5Sketch = dynamic(() => import("../components/P5Sketch"), {
  ssr: false,
});

const HERO_SCROLL = 250; // vh

export default function Home() {
  const [scale, setScale] = useState(1);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(0);
  const [heroFontFamily, setHeroFontFamily] = useState("Redaction");

  const isChrome = typeof window !== "undefined" && getIsChrome();

  useEffect(() => {
    const heroDistance = window.innerHeight * (HERO_SCROLL / 100);

    const onScroll = () => {
      const progress = Math.min(window.scrollY / heroDistance, 1);

      setScale(1 + progress * 16);

      const hero =
        progress < 0.35 ? 1 : 1 - Math.min((progress - 0.35) / 0.4, 1);

      setHeroOpacity(hero);

      const content = Math.max(0, Math.min((progress - 0.65) / 0.18, 1));

      setContentOpacity(content);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        setHeroFontFamily(
          getNearestRedactionFamily((e.clientX / window.innerWidth) * 100),
        );
        raf = null;
      });
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="relative bg-primary-blue">
      {/* Sketch + badge: mag geclipt worden aan viewport-randen tijdens het zoomen */}
      <div
        className="fixed inset-0 z-40 overflow-hidden pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(${scale})`, transformOrigin: "50% 56%" }}
        >
          <div className="absolute inset-0">
            <P5Sketch />
          </div>
          <RotatingBadge />
        </div>
      </div>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ opacity: heroOpacity }}
      >
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: "50% 56%" }}
        >
          <div
            className="font-bold text-[clamp(3rem,9.5vw,10vw)] text-center text-white"
            style={{
              fontFamily: `${isChrome ? "Mersad" : `"${heroFontFamily}"`}, sans-serif`,
              lineHeight: 1.15,
            }}
          >
            <div>BETTY</div>
            <div className="text-orange">KRONEMEIJER</div>
          </div>
        </div>
      </div>

      {/* Scrollruimte voor hero */}
      <div style={{ height: `${HERO_SCROLL}vh` }} />

      {/* Echte pagina */}
      <div className="relative z-10" style={{ opacity: contentOpacity }}>
        <BlobBackground />
        <Intro />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}

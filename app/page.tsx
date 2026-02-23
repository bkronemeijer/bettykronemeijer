"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main
      style={{
        background: "var(--cream)",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflow: "none",
      }}
    >
      <Hero />

      <Intro />

      <div
        className="w-full h-px"
        style={{ background: "var(--green-dark)", opacity: 0.15 }}
      />

      <Projects />

      <Footer />
    </main>
  );
}

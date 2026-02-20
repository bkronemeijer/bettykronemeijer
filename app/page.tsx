"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <main
      style={{
        background: "var(--cream)",
        minHeight: "100vh",
        scrollbarColor: "#285d3f",
      }}
    >
      <Hero />

      <Intro />

      {/* Divider */}
      <div
        className="w-full h-px"
        style={{ background: "var(--green-dark)", opacity: 0.15 }}
      />

      <Footer />
    </main>
  );
}

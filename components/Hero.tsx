import React from "react";
import P5Hero from "./P5Hero";

export default function Hero() {
  return (
    <section className="relative w-full" style={{ height: "90vh" }}>
      <P5Hero />
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-10 pointer-events-none">
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
          style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
        >
          Betty <br />
          <em style={{ color: "var(--pink)" }}>Kronemeijer</em>
        </h1>
      </div>
    </section>
  );
}

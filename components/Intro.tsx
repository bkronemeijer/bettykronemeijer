import React from "react";
import NavLinks from "./NavLinks";

export default function Intro() {
  return (
    <section className="px-10 py-16 max-w-2xl">
      <p
        className="text-sm leading-relaxed"
        style={{
          color: "var(--green-dark)",
          fontFamily: "var(--font-body)",
          fontWeight: 300,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris. I make things for the
        web that are considered and quietly obsessive.
      </p>
      <NavLinks />
    </section>
  );
}

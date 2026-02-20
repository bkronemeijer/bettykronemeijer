import React from "react";

export default function Footer() {
  return (
    <footer
      className="px-10 py-12 mt-16"
      style={{ borderTop: "1px solid", borderColor: "rgba(40,93,63,0.15)" }}
    >
      <p
        className="text-xs"
        style={{
          color: "var(--green-light)",
          fontFamily: "var(--font-body)",
        }}
      >
        © {new Date().getFullYear()} Betty Kronemeijer — Built with Next.js &
        Tailwind
      </p>
    </footer>
  );
}

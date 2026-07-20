import React from "react";

export default function Footer() {
  return (
    <footer className="px-10 py-12 mt-16">
      <p className="text-xs text-orange-light">
        © {new Date().getFullYear()} Betty Kronemeijer — Built with Next.js &
        Tailwind
      </p>
    </footer>
  );
}

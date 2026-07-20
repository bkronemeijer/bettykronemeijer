import React from "react";

export default function Footer() {
  return (
    <footer className="p-5 md:px-8 py-12 mt-16 flex justify-between text-xs text-orange-light">
      <p>© {new Date().getFullYear()} Betty Kronemeijer</p>
      <p className="flex gap-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/bkronemeijer"
        >
          GitHub
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/betty-kronemeijer-198758155/"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}

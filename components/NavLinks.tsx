"use client";

const links = ["Work", "About", "Contact"];

export default function NavLinks() {
  return (
    <div className="mt-8 flex gap-6">
      {links.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          className="text-xs tracking-widest uppercase transition-colors"
          style={{
            color: "var(--red)",
            fontFamily: "var(--font-body)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLAnchorElement).style.color = "var(--green-dark)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLAnchorElement).style.color = "var(--red)")
          }
        >
          {link}
        </a>
      ))}
    </div>
  );
}

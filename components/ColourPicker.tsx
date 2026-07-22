"use client";

import { useEffect, useRef, useState } from "react";
import { palettes, PaletteKey } from "@/lib/palettes";
import { useTheme } from "@/components/ThemeProvider";
import RainbowIcon from "@/components/icons/RainbowIcon";

export default function ColourPicker() {
  const { currentPalette, setPalette } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sluit het paneel bij een klik buiten de picker
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 z-50 flex h-10 items-center rounded-full bg-black/40 backdrop-blur"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close colour picker" : "Open colour picker"}
        aria-expanded={open}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-secondary-light transition-transform hover:scale-105"
      >
        <RainbowIcon size={20} />
      </button>

      <div
        className="grid transition-[grid-template-columns] duration-300 ease-out"
        style={{ gridTemplateColumns: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex items-center gap-2 p-3">
            {(Object.keys(palettes) as PaletteKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setPalette(key)}
                aria-label={`Gebruik het ${key}-palet`}
                className={`h-8 w-8 shrink-0 rounded-full border-2 transition-transform ${
                  currentPalette === key
                    ? "border-white scale-110"
                    : "border-transparent"
                }`}
                style={{ background: palettes[key]["primary"] }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

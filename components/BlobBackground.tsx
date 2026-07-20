import React from "react";

/**
 * BlobBackground
 * ----------------------------------------------------------------
 * A soft, blurred gradient "blob" that drifts around behind your
 * content. Because the content panel sits on top with a translucent
 * + blurred background, the blob appears to glow *through* it as it
 * passes — the effect you captured in your recording.
 *
 * Usage:
 * <div className="page">
 *   <BlobBackground />
 *   <div className="card">... your content ...</div>
 * </div>
 */
export default function BlobBackground({ className = "" }) {
  return (
    <div
      className={`
        absolute inset-0 overflow-hidden z-0 pointer-events-none
        ${className}
      `}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-full blur-[60px] opacity-75 mix-blend-screen will-change-transform motion-reduce:animate-none w-[45vmax] h-[45vmax] top-[5%] left-[-10%] animate-drift-a"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ffcc99, transparent 70%)",
        }}
      />
      <span
        className="absolute rounded-full blur-[60px] opacity-75 mix-blend-screen will-change-transform motion-reduce:animate-none w-[38vmax] h-[38vmax] bottom-[-15%] right-[-10%] animate-drift-b"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #ffb347, transparent 70%)",
        }}
      />
      <span
        className="absolute rounded-full blur-[60px] opacity-75 mix-blend-screen will-change-transform motion-reduce:animate-none w-[30vmax] h-[30vmax] top-[30%] left-[40%] animate-drift-c"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #90D5FF, transparent 70%)",
        }}
      />
    </div>
  );
}

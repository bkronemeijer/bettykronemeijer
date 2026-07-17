"use client";

import { Boid } from "@/p5/Boid";
import { Circle } from "@/p5/Circle";
import { Flock } from "@/p5/Flock";
import { useEffect, useRef } from "react";

export default function P5Sketch() {
  let balls: any[] = [];
  let num = 10;
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    let p5Instance: any = null;
    let flock: Flock = new Flock();

    import("p5").then((mod) => {
      const p5 = mod.default;

      p5Instance = new p5((s: any) => {
        // ── Gradient animation state ──────────────────────────────────────
        let grainCanvas: HTMLCanvasElement | null = null;
        let grainCtx: CanvasRenderingContext2D | null = null;

        // ── Build static grain texture once ──────────────────────────────
        const buildGrain = (W: number, H: number) => {
          grainCanvas = document.createElement("canvas");
          grainCanvas.width = W;
          grainCanvas.height = H;
          grainCtx = grainCanvas.getContext("2d")!;
          const imgData = grainCtx.createImageData(W, H);
          for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = v;
            imgData.data[i + 1] = v;
            imgData.data[i + 2] = v;
            imgData.data[i + 3] = Math.random() * 28 + 4;
          }
          grainCtx.putImageData(imgData, 0, 0);
        };

        // ── Setup ─────────────────────────────────────────────────────────
        s.setup = () => {
          if (!containerRef.current) return;
          const W = containerRef.current.offsetWidth;
          const H = containerRef.current.offsetHeight;
          const cvs = s.createCanvas(W, H);
          cvs.parent(containerRef.current);

          for (let i = 0; i < 100; i++) {
            flock.addBoid(new Boid(s, s.width / 2, s.height / 2));
          }

          for (let i = 0; i < num; i++) {
            let x = s.random(s.width);
            let y = s.random(s.height);
            let r = s.random(200, 600);
            balls[i] = new Circle(s, x, y, r, W, H);
          }

          buildGrain(W, H);
        };

        // ── Draw ──────────────────────────────────────────────────────────
        s.draw = () => {
          s.background(0, 0, 256);
          // for (let i = 0; i < num; i++) {
          //   balls[i].update();
          //   balls[i].display();
          // }
          flock.run();
        };

        s.mouseDragged = () => {
          flock.addBoid(new Boid(s, s.mouseX, s.mouseY));
        };
      });
    });

    return () => {
      p5Instance?.remove();
      if (containerRef.current) containerRef.current.innerHTML = "";
      mountedRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#00F",
      }}
    />
  );
}

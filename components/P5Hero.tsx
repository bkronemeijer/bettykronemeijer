"use client";

import { useEffect, useRef } from "react";

export default function P5Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!containerRef.current) return;
    initializedRef.current = true;

    let p5Instance: any = null;

    const initP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const sketch = (s: any) => {
        const PINK = "#ffa3ca";
        const RED = "#d31412";
        const GREEN_DARK = "#285d3f";

        const particles: any[] = [];
        const NUM_PARTICLES = 60;

        class Particle {
          x: number;
          y: number;
          vx: number;
          vy: number;
          size: number;
          col: string;
          noiseOffsetX: number;
          noiseOffsetY: number;
          alpha: number;

          constructor() {
            this.x = s.random(s.width);
            this.y = s.random(s.height);
            this.vx = s.random(-0.5, 0.5);
            this.vy = s.random(-0.5, 0.5);
            this.size = s.random(4, 28);
            this.col = s.random([PINK, RED, GREEN_DARK]);
            this.noiseOffsetX = s.random(1000);
            this.noiseOffsetY = s.random(1000);
            this.alpha = s.random(120, 220);
          }

          update() {
            const n = s.noise(this.noiseOffsetX, this.noiseOffsetY);
            const angle = n * s.TWO_PI * 3;
            this.vx += s.cos(angle) * 0.05;
            this.vy += s.sin(angle) * 0.05;
            this.vx *= 0.96;
            this.vy *= 0.96;
            this.x += this.vx;
            this.y += this.vy;
            this.noiseOffsetX += 0.004;
            this.noiseOffsetY += 0.004;

            if (this.x < -50) this.x = s.width + 50;
            if (this.x > s.width + 50) this.x = -50;
            if (this.y < -50) this.y = s.height + 50;
            if (this.y > s.height + 50) this.y = -50;
          }

          draw() {
            s.noStroke();
            const c = s.color(this.col);
            c.setAlpha(this.alpha);
            s.fill(c);
            s.ellipse(this.x, this.y, this.size);
          }
        }

        s.setup = () => {
          const canvas = s.createCanvas(
            containerRef.current!.offsetWidth,
            containerRef.current!.offsetHeight,
          );
          canvas.parent(containerRef.current!);
          s.noiseDetail(2, 0.5);

          for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle());
          }
        };

        s.draw = () => {
          const bg = s.color(GREEN_DARK);
          bg.setAlpha(18);
          s.background(bg);

          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const d = s.dist(
                particles[i].x,
                particles[i].y,
                particles[j].x,
                particles[j].y,
              );
              if (d < 100) {
                const alpha = s.map(d, 0, 100, 60, 0);
                const lineCol = s.color(PINK);
                lineCol.setAlpha(alpha);
                s.stroke(lineCol);
                s.strokeWeight(0.5);
                s.line(
                  particles[i].x,
                  particles[i].y,
                  particles[j].x,
                  particles[j].y,
                );
              }
            }
          }

          for (const p of particles) {
            p.update();
            p.draw();
          }
        };

        s.windowResized = () => {
          if (containerRef.current) {
            s.resizeCanvas(
              containerRef.current.offsetWidth,
              containerRef.current.offsetHeight,
            );
          }
        };
      };

      p5Instance = new p5(sketch);
    };

    initP5();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
      }
      // Clear the container in case the canvas element was left behind
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      initializedRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height: "100%", background: "#285d3f" }}
    />
  );
}

"use client";

import Image from "next/image";

interface ProjectCardProps {
  name: string;
  year: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  projectUrl: string;
}

export default function ProjectCard({
  name,
  year,
  tag,
  imageSrc,
  imageAlt,
  projectUrl,
}: ProjectCardProps) {
  return (
    <div
      className="card-scene flex-shrink-0 cursor-pointer"
      style={{ aspectRatio: "1/1", width: "clamp(220px, 28vw, 380px)" }}
    >
      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
      >
        <div className="card-inner w-full h-full">
          {/* Front */}
          <div
            className="card-face flex flex-col justify-between p-6 border"
            style={{
              background: "var(--cream)",
              borderColor: "var(--green-dark)",
            }}
          >
            <div>
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "var(--green-light)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {tag}
              </span>
            </div>
            <div>
              <h3
                className="text-2xl leading-tight mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--green-dark)",
                }}
              >
                {name}
              </h3>
              <span
                className="text-xs"
                style={{ color: "var(--pink)", fontFamily: "var(--font-body)" }}
              >
                {year}
              </span>
            </div>
            <div
              className="absolute top-4 right-4 w-8 h-8 rounded-full"
              style={{ background: "var(--pink)", opacity: 0.4 }}
            />
          </div>

          {/* Back */}
          <div className="card-back card-face overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 flex items-end p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(40,93,63,0.85) 0%, transparent 60%)",
                }}
              >
                <span
                  className="text-sm"
                  style={{
                    color: "var(--cream)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

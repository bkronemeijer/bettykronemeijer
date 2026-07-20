"use client";

import Image from "next/image";
import ProjectTags from "./ProjectTags";

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
      className="card-scene shrink-0 cursor-pointer rounded-xs"
      style={{ aspectRatio: "1/1", width: "clamp(220px, 28vw, 380px)" }}
    >
      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 rounded-xs"
      >
        <div className="card-inner w-full h-full rounded-xs">
          {/* Front */}
          <div
            className="card-face flex flex-col justify-between p-6 rounded-xs"
            style={{
              background: "rgba(255, 255, 255, 0.42)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10.2px)",
            }}
          >
            <div>
              <ProjectTags tag={tag} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl leading-tight mb-2 text-white font-medium">
                {name}
              </h3>
              <span className="text-xs text-orange font-mono">{year}</span>
            </div>
          </div>

          {/* Back */}
          <div className="card-back card-face overflow-hidden rounded-xs">
            <div className="relative w-full h-full rounded-xs">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 flex items-end p-4 rounded-xs"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 256, 1.0) 0%, transparent 60%)",
                }}
              >
                <span
                  className="text-sm text-white"
                  style={{
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

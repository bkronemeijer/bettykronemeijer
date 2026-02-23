import React from "react";
import ProjectCard from "./ProjectCard";
import Image from "next/image";

const projects = [
  {
    name: "Boeing Safety Experience",
    year: "Ongoing",
    tag: "Data Visualisation, Knowledge Graph",
    imageSrc: "/images/timeline.webp",
    imageAlt: "Boeing Safety Experience project",
    projectUrl: "https://www.boeing.com/safety/safetyexperience",
  },
  {
    name: "Pollen Passport",
    year: "2025",
    tag: "Data Visualisation, Campaign",
    imageSrc: "/images/pollenpassport.webp",
    imageAlt: "Pollen Passport project",
    projectUrl: "https://www.cleverfranke.com/project/allevia-pollen-passport",
  },
  {
    name: "Globe Guessr",
    year: "Ongoing",
    tag: "ThreeJS, Geography Game",
    imageSrc: "/images/globeguessr.webp",
    imageAlt: "Globe Guessr project",
    projectUrl: "https://github.com/bkronemeijer/globe-guessr",
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-16">
      <div className="px-10 mb-8 flex items-baseline gap-4">
        <h2
          className="text-xs tracking-widest uppercase"
          style={{
            color: "var(--green-light)",
            fontFamily: "var(--font-body)",
          }}
        >
          Selected Work
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--green-dark)", opacity: 0.12 }}
        />
      </div>

      <div
        className="flex gap-4 overflow-x-auto px-10 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}

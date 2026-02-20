import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    name: "Bloom Atlas",
    year: "2024",
    tag: "Web Design",
    imageSrc: "/images/project-bloom.jpg",
    imageAlt: "Bloom Atlas project",
  },
  {
    name: "Meridian Type",
    year: "2024",
    tag: "Typography",
    imageSrc: "/images/project-meridian.jpg",
    imageAlt: "Meridian Type project",
  },
  {
    name: "Solstice OS",
    year: "2023",
    tag: "UI / UX",
    imageSrc: "/images/project-solstice.jpg",
    imageAlt: "Solstice OS project",
  },
  {
    name: "Verdant Index",
    year: "2023",
    tag: "Data Viz",
    imageSrc: "/images/project-verdant.jpg",
    imageAlt: "Verdant Index project",
  },
  {
    name: "Carmine Studio",
    year: "2022",
    tag: "Branding",
    imageSrc: "/images/project-carmine.jpg",
    imageAlt: "Carmine Studio project",
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

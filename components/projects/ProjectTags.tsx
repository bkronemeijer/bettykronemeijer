"use client";

interface ProjectTagProps {
  tag: string;
}

export default function ProjectTags({ tag }: ProjectTagProps) {
  const tags = tag.split(",").map((t) => t.trim());

  return (
    <div className="flex flex-wrap gap-2 mb-2 md:mb-4">
      {tags.map((t) => (
        <span
          key={t}
          className="bg-orange px-2 rounded-xs bg-opacity-50 text-white text-xs md:text-sm"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

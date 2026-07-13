"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  icon = "📁",
  index = 0,
}: ProjectCardProps) {
  return (
    <div
      className="project-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`project-card-${index}`}
    >
      <div className="project-card-image">
        <span>{icon}</span>
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc">{description}</p>
        <div className="project-card-tags">
          {tags.map((tag, i) => (
            <span key={i} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

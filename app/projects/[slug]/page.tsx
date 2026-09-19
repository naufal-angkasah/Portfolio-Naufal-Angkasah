import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import ProjectDetailView from "@/components/ProjectDetailView";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Projek Tidak Ditemukan | Portfolio Naufal Angkasah",
    };
  }

  return {
    title: `${project.title} | Portfolio Naufal Angkasah`,
    description: project.desc,
    openGraph: {
      title: `${project.title} | Naufal Angkasah`,
      description: project.desc,
      images: project.screenshot ? [project.screenshot] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const prevProject = idx > 0 ? projects[idx - 1] : undefined;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : undefined;

  return (
    <ProjectDetailView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
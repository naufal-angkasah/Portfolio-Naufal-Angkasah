import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Projects | Naufal Angkasah",
  description:
    "Proyek-proyek Web Development oleh Naufal Angkasah — full-stack applications, responsive design, REST API, dan modern web frameworks.",
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

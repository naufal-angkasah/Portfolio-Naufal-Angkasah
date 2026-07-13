import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Security Projects | Naufal Angkasah",
  description:
    "Proyek-proyek Network Security oleh Naufal Angkasah — penetration testing, analisis kerentanan, firewall configuration, dan cybersecurity tools.",
};

export default function NetworkSecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

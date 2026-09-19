import { notFound } from "next/navigation";
import { certificates, getCertificateBySlug, getAllCertificateSlugs, getPreviewImage } from "@/data/certificates";
import CertificateDetailView from "@/components/CertificateDetailView";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCertificateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertificateBySlug(slug);
  if (!cert) {
    return {
      title: "Sertifikat Tidak Ditemukan | Portfolio Naufal Angkasah",
    };
  }

  return {
    title: `${cert.title} | Sertifikat Naufal Angkasah`,
    description: `${cert.title} dari ${cert.issuer} (${cert.date}). ${cert.desc}`,
    openGraph: {
      title: `${cert.title} - ${cert.issuer}`,
      description: cert.desc,
      images: [getPreviewImage(cert)],
    },
  };
}

export default async function CertificatePage({ params }: Props) {
  const { slug } = await params;
  const cert = getCertificateBySlug(slug);

  if (!cert) {
    notFound();
  }

  const idx = certificates.findIndex((c) => c.slug === slug);
  const prevCert = idx > 0 ? certificates[idx - 1] : undefined;
  const nextCert = idx < certificates.length - 1 ? certificates[idx + 1] : undefined;

  return (
    <CertificateDetailView
      cert={cert}
      prevCert={prevCert}
      nextCert={nextCert}
    />
  );
}
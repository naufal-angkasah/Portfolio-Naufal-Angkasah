import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-naufal-angkasah.vercel.app"),
  title: "Naufal Angkasah | Portfolio IT Laut Dalam",
  description:
    "Portfolio profesional Naufal Angkasah — Web Developer & Network Security enthusiast. Deep ocean claymorphism design.",
  keywords: [
    "Naufal Angkasah",
    "Portfolio",
    "Network Security",
    "Web Development",
    "Cybersecurity",
    "Developer",
    "Next.js",
  ],
  authors: [{ name: "Naufal Angkasah" }],
  openGraph: {
    title: "Naufal Angkasah | Portfolio IT Laut Dalam",
    description: "Web Developer & Network Security Portfolio",
    url: "https://portfolio-naufal-angkasah.vercel.app",
    siteName: "Naufal Angkasah",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naufal Angkasah - Portfolio Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naufal Angkasah | Portfolio IT Laut Dalam",
    description: "Web Developer & Network Security Portfolio",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Surya Narayanan | Full Stack Developer",
  description: "Passionate Full Stack Developer specializing in React, Next.js, Node.js, and Go. Building scalable web applications and exploring AI/ML solutions.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Go", "Software Engineer", "Portfolio"],
  authors: [{ name: "Surya Narayanan" }],
  creator: "Surya Narayanan",
  openGraph: {
    title: "Surya Narayanan | Full Stack Developer",
    description: "Passionate Full Stack Developer building scalable web applications",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Narayanan | Full Stack Developer",
    description: "Passionate Full Stack Developer building scalable web applications",
    creator: "@surya_nara0123",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/profile.jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

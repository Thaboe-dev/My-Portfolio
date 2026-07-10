import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thabolezwe Mabandla",
  description:
    "Thabolezwe Mabandla is an Engineering AI graduate student and Graduate Research Assistant working on applied AI, robotics, and language technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-slate-900 font-sans">{children}</body>
    </html>
  );
}


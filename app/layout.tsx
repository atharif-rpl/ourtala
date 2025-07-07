// File: app/layout.tsx

import type { Metadata } from "next";
// 1. Impor font Modak bersama dengan font lainnya
import { Geist, Geist_Mono, Modak } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Konfigurasi font Modak
const modak = Modak({
  variable: "--font-modak",
  subsets: ["latin"],
  weight: "400", // Font Modak hanya punya satu weight: 400
});

export const metadata: Metadata = {
  title: "Ourtala",
  description: "Ourtala official web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Tambahkan variabel font Modak ke body */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${modak.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
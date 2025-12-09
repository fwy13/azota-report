import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azota Report",
  description: "Một website để báo cáo những câu trong bài azota bị lỗi!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.jpg" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="text-center text-gray-400">
          Made by{" "}
          <Link
            href="https://github.com/fwy13"
            className="underline text-blue-400"
          >
            fwy13
          </Link>{" "}
          with 💌!
        </footer>
      </body>
    </html>
  );
}

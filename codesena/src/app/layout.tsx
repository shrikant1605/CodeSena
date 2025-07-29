import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeSena - Where Students Learn, Build & Grow Together",
  description: "Join thousands of students in our vibrant tech community. Learn from peers, share projects, and accelerate your coding journey.",
  keywords: ["coding", "programming", "students", "learning", "mentorship", "tech community"],
  authors: [{ name: "CodeSena Team" }],
  openGraph: {
    title: "CodeSena - Student Tech Community",
    description: "Where students learn, build, and grow together",
    url: "https://codesena.com",
    siteName: "CodeSena",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSena - Student Tech Community",
    description: "Where students learn, build, and grow together",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

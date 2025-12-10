import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CircuitBackground from "@/components/circuit-background";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://muaazl.vercel.app/'),
  title: {
    default: "Muaaz Lattif | Developer",
    template: "%s | Muaaz Lattif"
  },
  openGraph: {
    title: "Muaaz Lattif | Developer",
    url: 'https://muaaz-portfolio.vercel.app',
    siteName: 'Muaaz Lattif',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Muaaz Lattif",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} bg-background text-foreground antialiased selection:bg-accent-1/30 selection:text-white`}>
        <Navbar />
        {children}
        <SiteFooter />
        <CircuitBackground />
      </body>
    </html>
  );
}
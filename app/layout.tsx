import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060810",
};

export const metadata: Metadata = {
  title: "Nexzellenz Technologies LLP — 3D Printing Services India",
  description: "Professional 3D Printing, SLA Printing & 3D Modeling services across India. Fast turnaround, precision quality.",
  openGraph: {
    title: "Nexzellenz Technologies LLP",
    description: "Professional 3D Printing, SLA & FDM services across India.",
    type: "website",
  },
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-accent selection:text-bg">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#0b0f1a',
            color: '#e8eaf0',
            border: '1px solid rgba(0, 229, 255, 0.15)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
          },
          success: {
            iconTheme: {
              primary: '#00e5ff',
              secondary: '#0b0f1a',
            },
          },
        }} />
        <div className="grid-bg" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
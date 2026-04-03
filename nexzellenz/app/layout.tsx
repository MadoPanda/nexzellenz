// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

// 1. DYNAMIC VIEWPORT SETTINGS
// This ensures the browser scales your site correctly on iOS and Android
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060810", // Matches your --bg variable
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Head is handled automatically by Next.js metadata/viewport */}
      <body className="antialiased selection:bg-accent selection:text-bg">
        {/* Background Effects */}
        <div className="grid-bg" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        <ThemeProvider>
          <CustomCursor />
          
          {/* Navbar should handle its own internal container-x for alignment */}
          <Navbar />

          {/* Added flex-col and min-h-screen to ensure Footer 
            stays at the bottom even on empty pages 
          */}
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
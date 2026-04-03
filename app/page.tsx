// app/page.tsx
import { HeroSection }         from "@/components/sections/HeroSection";
import { MarqueeSection }      from "@/components/sections/MarqueeSection";
import { ServicesSection }     from "@/components/sections/ServicesSection";
import { ProcessSection }      from "@/components/sections/ProcessSection";
import { WhySection }          from "@/components/sections/WhySection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { GallerySection }      from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection }        from "@/components/sections/StatsSection";
import { AboutSection }        from "@/components/sections/AboutSection";
import { ContactSection }      from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <ProcessSection />
      <WhySection />
      <CapabilitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <StatsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

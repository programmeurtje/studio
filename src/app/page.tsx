"use client";

import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { ValuePropositionSection } from '@/components/landing/ValuePropositionSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { OpenHouseSection } from '@/components/landing/OpenHouseSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { FadeIn } from '@/components/FadeIn';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || process.env.NODE_ENV !== 'production') return;
    
    // Check if gtag is defined on window
    if (window.gtag) {
        window.gtag('config', GA_ID, {
          page_path: pathname,
        });
    }
  }, [pathname]);

  return null;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FadeIn>
          <ValuePropositionSection />
        </FadeIn>
        <FadeIn>
          <GallerySection />
        </FadeIn>
        <OpenHouseSection />
        <FadeIn>
          <ContactSection />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

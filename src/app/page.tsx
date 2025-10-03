import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { ValuePropositionSection } from '@/components/landing/ValuePropositionSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { OpenHouseSection } from '@/components/landing/OpenHouseSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { FadeIn } from '@/components/FadeIn';

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
        <FadeIn>
          <OpenHouseSection />
        </FadeIn>
        <FadeIn>
          <ContactSection />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

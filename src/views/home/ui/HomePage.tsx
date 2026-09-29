import { Preloader } from '@/widgets/preloader';
import { ScrollProgress } from '@/widgets/scroll-progress';
import { Header } from '@/widgets/header';
import { Hero } from '@/widgets/hero';
import { Manifesto } from '@/widgets/manifesto';
import { Story } from '@/widgets/story';
import { Marquee } from '@/widgets/marquee';
import { Specs } from '@/widgets/specs';
import { Reviews } from '@/widgets/reviews';
import { Finale } from '@/widgets/finale';
import { Footer } from '@/widgets/footer';

/**
 * AIDA as a film: Attention (hero) → Interest (manifesto, story) →
 * Desire (specs, reviews) → Action (finale).
 */
export function HomePage() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Story />
        <Marquee />
        <Specs />
        <Reviews />
        <Finale />
      </main>
      <Footer />
    </>
  );
}

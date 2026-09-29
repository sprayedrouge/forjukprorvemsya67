import { DesignTheme, Grain } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Preloader } from '@/widgets/cinematic/preloader';
import { ScrollProgress } from '@/widgets/cinematic/scroll-progress';
import { Header } from '@/widgets/cinematic/header';
import { Hero } from '@/widgets/cinematic/hero';
import { Manifesto } from '@/widgets/cinematic/manifesto';
import { Story } from '@/widgets/cinematic/story';
import { Marquee } from '@/widgets/cinematic/marquee';
import { Specs } from '@/widgets/cinematic/specs';
import { Reviews } from '@/widgets/cinematic/reviews';
import { Finale } from '@/widgets/cinematic/finale';
import { Footer } from '@/widgets/cinematic/footer';

/**
 * AIDA as a film: Attention (hero) → Interest (manifesto, story) →
 * Desire (specs, reviews) → Action (finale).
 */
export function CinematicPage() {
  return (
    <>
      <DesignTheme design="cinematic" />
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
      <DesignSwitch current="cinematic" tone="dark" />
      <Grain />
    </>
  );
}

import { Bennefits } from '@/components/Bennefit';
import { Tutor } from '@/components/ChromaGrid';
import { Discount } from '@/components/Discount';
import { HeroSection } from '@/components/heroSection';
import MagicBento from '@/components/MagicBento/MagicBento';
import Pricing from '@/components/Pricing';
import { Testimonial } from '@/components/Testimonials';

export const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <MagicBento />
      <Discount />
      <Bennefits />
      <Tutor />
      <Pricing />
      <Testimonial />
    </>
  );
};

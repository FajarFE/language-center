import { Bennefits } from '@/components/Bennefit';
import { Tutor } from '@/components/ChromaGrid';
import { Discount } from '@/components/Discount';
import { HeroSection } from '@/components/heroSection';
import MagicBento from '@/components/MagicBento/MagicBento';

export const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <MagicBento />
      <Discount />
      <Bennefits />
      <Tutor />
    </>
  );
};

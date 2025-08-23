// src/hooks/useScrollFadeIn.ts

import { Variants } from 'framer-motion';

interface UseScrollFadeInProps {
  yOffset?: number;
  duration?: number;
  bounce?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}
/**
 * Hook untuk menambahkan efek fade-in saat elemen masuk ke viewport.
 * @param props - Opsi kustomisasi untuk animasi.
 * @returns Object berisi props untuk disebar ke komponen motion.
 */
export const useScrollFadeIn = ({
  yOffset = 12,
  duration = 0.8,
  bounce = 0.4,
  delay = 0,
  once = true,
  amount = 0.3,
}: UseScrollFadeInProps = {}) => {
  const variants: Variants = {
    offscreen: {
      opacity: 0,
      y: yOffset,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce,
        duration,
        delay,
      },
    },
  };
  return {
    variants,
    initial: 'offscreen',
    whileInView: 'onscreen',
    viewport: { once, amount },
  };
};

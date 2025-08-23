'use client';

import { motion, Transition } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Transition['ease'];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  lineSpacing?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  lineSpacing,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const lines = useMemo(() => text.split(/<br\s*\/?>/i), [text]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  let cumulativeElementIndex = 0;

  return (
    <div ref={ref} className={`blur-text-container ${className}`}>
      {lines.map((line, lineIndex) => {
        const elements = (
          animateBy === 'words' ? line.trim().split(' ') : line.trim().split('')
        ).filter(Boolean);

        if (elements.length === 0) {
          return null;
        }

        return (
          <p
            key={lineIndex}
            className="flex flex-wrap justify-center items-center"
            style={{
              marginTop:
                lineIndex > 0 && lineSpacing ? `${lineSpacing}px` : '0px',
            }}
          >
            {elements.map((segment, segmentIndex) => {
              const animateKeyframes = buildKeyframes(
                fromSnapshot,
                toSnapshots,
              );

              const spanTransition: Transition = {
                duration: totalDuration,
                times,
                delay: (cumulativeElementIndex * delay) / 1000,
                ease: easing,
              };

              cumulativeElementIndex++;

              const segmentWithSpace =
                animateBy === 'words' && segmentIndex < elements.length - 1
                  ? segment + '\u00A0'
                  : segment;

              return (
                <motion.span
                  key={segmentIndex}
                  initial={fromSnapshot}
                  data-cursor-hover-area={true}
                  animate={inView ? animateKeyframes : fromSnapshot}
                  transition={spanTransition}
                  onAnimationComplete={
                    lineIndex === lines.length - 1 &&
                    segmentIndex === elements.length - 1
                      ? onAnimationComplete
                      : undefined
                  }
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, filter, opacity',
                  }}
                  className={`${
                    segment === '&'
                      ? 'font-bricolage font-medium'
                      : 'font-bricolage'
                  }`}
                >
                  {segmentWithSpace}
                </motion.span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

export default BlurText;

'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, ReactNode, useState, JSX } from 'react';

const defaultColorRange: [string, string] = [
  'rgb(156, 163, 175)',
  'rgb(24, 24, 27)',
];

const highlightColorRange: [string, string] = [
  'rgb(146 66 253)',
  'rgba(146, 66, 253, 1)',
];

const highlightColorRangeHover: [string, string] = [
  'rgb(211 231 18)',
  'rgba(211, 231, 18, 1)',
];

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted: boolean;
  id: string;
}

function Word({
  children,
  progress,
  range,
  isHighlighted,
  id,
}: WordProps): JSX.Element {
  const [isMouseDirectlyOver, setIsMouseDirectlyOver] = useState(false);

  const isEffectivelyHovered = isMouseDirectlyOver;

  const finalColorRange =
    isHighlighted && isEffectivelyHovered
      ? highlightColorRangeHover
      : isHighlighted
      ? highlightColorRange
      : defaultColorRange;
  const color = useTransform(progress, range, finalColorRange);
  const opacity = useTransform(progress, range, [0.3, 1]);
  const dataAttributes = {
    'data-word-id': id,
    ...(isHighlighted && { 'data-cursor-hover-area': 'true' }),
  };

  return (
    <motion.span
      {...dataAttributes}
      style={{ opacity, color }}
      className={`relative ${isHighlighted ? 'cursor-target' : ''} `}
      onMouseEnter={() => setIsMouseDirectlyOver(true)}
      onMouseLeave={() => setIsMouseDirectlyOver(false)}
    >
      {children}
    </motion.span>
  );
}

type OffsetValue = 'start' | 'center' | 'end';
interface ScrollTextProps {
  text: string;
  className?: string;
  animationStartOffset?: `${OffsetValue} ${OffsetValue}`;
  animationEndOffset?: `${OffsetValue} ${OffsetValue}`;
}

export function ScrollText({
  text,
  className = '',
  animationStartOffset = 'start end',
  animationEndOffset = 'end start',
}: ScrollTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [animationStartOffset, animationEndOffset],
  });

  const wordsForAnimation = text
    .replace(/<br\s*\/?>/gi, ' ')
    .split(' ')
    .filter(Boolean);
  const totalWords = wordsForAnimation.length;
  const lines = text.split(/<br\s*\/?>/i);
  let wordCounter = 0;

  return (
    <p ref={containerRef} className={className}>
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={`block ${lineIndex > 0 ? '-mt-[10px]' : ''}`}
        >
          {line.split(/(\s+)/).map((part, partIndex) => {
            if (/^\s+$/.test(part)) {
              return <span key={partIndex}>{part}</span>;
            }

            if (part) {
              const isHighlighted =
                wordCounter === 1 || wordCounter === 3 || wordCounter === 4;
              const start = wordCounter / totalWords;
              const end = (wordCounter + 1) / totalWords;
              wordCounter++;

              const wordId = `word-${lineIndex}-${partIndex}-${part.slice(
                0,
                5,
              )}`;

              return (
                <Word
                  key={wordId}
                  id={wordId}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isHighlighted={isHighlighted}
                >
                  {part}
                </Word>
              );
            }

            return null;
          })}
        </span>
      ))}
    </p>
  );
}

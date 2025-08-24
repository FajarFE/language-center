'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Marquee from 'react-fast-marquee';

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  avatar: string;
  type?: 'default' | 'full-image' | undefined;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function TestimonialCard({
  testimonial,

  onMouseEnter,
  onMouseLeave,
}: TestimonialCardProps) {
  if (testimonial.type === 'full-image') {
    return (
      <motion.div
        className="relative flex cursor-target w-full h-[320px] flex-col rounded-xl p-6 text-white overflow-hidden min-h-[200px] justify-end"
        style={{
          backgroundImage: `url(${testimonial.avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="italic w-full text-base whitespace-pre-wrap">
            &quot;{testimonial.quote} &quot;
          </div>
          <div>
            <p className="font-bold text-lg">{testimonial.name}</p>
            <p className="text-sm text-gray-200">{testimonial.title}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative flex cursor-target w-full flex-col bg-white rounded-xl p-3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full flex gap-5 justify-between items-center flex-col">
        <div className="text-gray-700 italic w-full text-base whitespace-pre-wrap">
          &quot;{testimonial.quote} &quot;
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-bold text-lg text-gray-800">
              {testimonial.name}
            </p>
            <p className="text-sm text-gray-500">{testimonial.title}</p>
          </div>
          <Image
            width={100}
            height={100}
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
          />
        </div>
      </div>
    </motion.div>
  );
}

interface ParallaxProps {
  testimonials: Testimonial[];
  baseVelocity: number;
  direction?: 'x' | 'y';
}

export function ParallaxTestimonials({
  testimonials,
  baseVelocity = 5,
  direction = 'x',
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [isHovered, setIsHovered] = useState(false);

  const wrapRange = -100 / 2;

  const x = useTransform(baseX, (v) => `${wrap(wrapRange, 0, v)}%`);
  const y = useTransform(baseY, (v) => `${wrap(wrapRange, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (!isHovered) {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      if (direction === 'y') {
        baseY.set(baseY.get() + moveBy);
      } else {
        baseX.set(baseX.get() + moveBy);
      }
    }
  });

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`overflow-hidden w-full whitespace-nowrap ${
        direction === 'y' ? 'h-full' : ''
      }`}
    >
      <motion.div
        className={`flex gap-5 w-full ${
          direction === 'y' ? 'flex-col' : 'flex-row'
        } flex-nowrap`}
        style={{ x: direction === 'x' ? x : 0, y: direction === 'y' ? y : 0 }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </motion.div>
    </div>
  );
}

const partnerLogos = [
  { name: 'Denso', logoUrl: '/1.jpeg' },
  { name: 'Akr', logoUrl: '/2.jpeg' },
  { name: 'Cargil', logoUrl: '/3.jpeg' },
  { name: 'OS Selnajaya', logoUrl: '/4.jpeg' },
  { name: 'IAIN', logoUrl: '/5.jpeg' },
  { name: '1', logoUrl: '/6.jpeg' },
  { name: 'IA22IN', logoUrl: '/7.jpeg' },
  { name: '4', logoUrl: '/8.jpeg' },
  { name: '15', logoUrl: '/9.jpeg' },
  { name: '1516', logoUrl: '/10.jpeg' },
];

export const Testimonial = () => {
  const t = useTranslations('testimonials');
  const sampleTestimonials: Testimonial[] = [
    {
      id: 1,
      name: t('aria.name'),
      title: t('aria.title'),
      quote: t('aria.quote'),
      avatar: 'https://i.pravatar.cc/150?img=1',
      type: 'full-image',
    },
    {
      id: 2,
      name: t('ben.name'),
      title: t('ben.title'),
      quote: t('ben.quote'),
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: t('carla.name'),
      title: t('carla.title'),
      quote: t('carla.quote'),
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: t('david.name'),
      title: t('david.title'),
      quote: t('david.quote'),
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      name: t('eva.name'),
      title: t('eva.title'),
      quote: t('eva.quote'),
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ];
  return (
    <section className="container mx-auto flex w-6xl max-w-[1220px] flex-col gap-12 py-16">
      <div className="grid grid-cols-12 w-full gap-8 items-end">
        <div className="col-span-7 flex flex-col gap-5">
          <div className="flex flex-row gap-5 justify-start items-center">
            <span className="text-subtle bg-primary px-4 py-2 h-fit w-fit rounded-full">
              Testimonials
            </span>{' '}
            <div className="flex items-center gap-4  ">
              <div className="flex -space-x-4">
                <Image
                  width={40}
                  height={40}
                  className="w-12 h-12 object-cover border-2 border-primary bg-primary rounded-full"
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User 2"
                />
                <Image
                  width={40}
                  height={40}
                  className="w-12 h-12 object-cover border-2 border-primary bg-primary rounded-full"
                  src="https://i.pravatar.cc/150?img=4"
                  alt="User 3"
                />
                <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-primary font-urbanist text-white rounded-full">
                  +200
                </span>
              </div>
            </div>
          </div>
          <div className="w-fit h-fit relative">
            <h1
              className="text-[62px] -mb-5 relative leading-tight font-bricolage"
              dangerouslySetInnerHTML={{ __html: t('title') }}
            ></h1>
          </div>
        </div>
        <div className="col-span-5 text-[22px] pl-10 leading-7">
          {t('subtitle')}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-8">
        <div className="md:col-span-4">
          <p className="text-center py-5 bg-accent flex justify-center items-center rounded-l-xl text-lg md:text-left text-primary font-medium leading-relaxed">
            {t('trusted')}
          </p>
        </div>

        <div className="col-span-1 md:col-span-8">
          <Marquee gradient={true} pauseOnHover gradientWidth={100}>
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="relative cursor-target w-32 h-16 mx-8"
              >
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  fill
                  className="grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 bg-primary px-5 rounded-2xl h-[600px] overflow-hidden gap-5 w-full">
        <ParallaxTestimonials
          testimonials={sampleTestimonials}
          direction="y"
          baseVelocity={-10}
        />
        <ParallaxTestimonials
          testimonials={sampleTestimonials}
          direction="y"
          baseVelocity={10}
        />
        <ParallaxTestimonials
          testimonials={sampleTestimonials}
          direction="y"
          baseVelocity={-10}
        />
      </div>
    </section>
  );
};

'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

// ... (Interface ChromaItem dan ChromaCarouselProps tetap sama) ...

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  experience: string;
  location: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaCarouselProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

const ChromaCarousel: React.FC<ChromaCarouselProps> = ({
  items,
  className = '',
  radius = 400,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Development',
      experience: '7 Tahun di Microsoft',
      location: 'Online',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps & Cloud Computing',
      experience: '5 Tahun di Amazon Web Services',
      location: 'Jakarta',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Design Principles',
      experience: '6 Tahun di IDEO',
      location: 'Bandung',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://dribbble.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Science & Machine Learning',
      experience: '4 Tahun di Google',
      location: 'Online',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://kaggle.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile App Development (iOS)',
      experience: '8 Tahun di Apple',
      location: 'Surabaya',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/',
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architecture',
      experience: '10 Tahun Pengalaman Industri',
      location: 'Global',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://aws.amazon.com/',
    },
  ];

  const data = items?.length ? items : demo;

  // ... (Semua hooks dan functions tetap sama) ...
  useEffect(() => {
    if (carouselRef.current) {
      cardRefs.current = Array.from(
        carouselRef.current.querySelectorAll('article'),
      );
    }
  }, [data]);

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - r.left;
    const mouseY = e.clientY - r.top;

    cardRefs.current.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left - r.left + cardRect.width / 2;
      const cardCenterY = cardRect.top - r.top + cardRect.height / 2;
      const dx = mouseX - cardCenterX;
      const dy = mouseY - cardCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const strength = Math.min(1, distance / radius);

      gsap.to(card, {
        '--strength': strength,
        duration: damping,
        ease,
        overwrite: true,
      });
    });
  };

  const handleLeave = () => {
    cardRefs.current.forEach((card) => {
      gsap.to(card, {
        '--strength': 1,
        duration: fadeOut,
        ease,
        overwrite: true,
      });
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (carouselRef.current) {
      const cardWidth = 300;
      const gap = 12;
      const scrollAmount = cardWidth + gap;
      const currentScroll = carouselRef.current.scrollLeft;

      let targetScroll;
      if (direction === 'next') {
        targetScroll = currentScroll + scrollAmount;
      } else {
        targetScroll = currentScroll - scrollAmount;
      }

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative  flex flex-col items-center ${className}`}
    >
      <div
        ref={carouselRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory py-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>
          {`
            .carousel-container::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="flex flex-nowrap gap-3 w-max mx-auto px-4">
          {data.map((c, i) => (
            <article
              key={i}
              onMouseMove={handleCardMove}
              onClick={() => handleCardClick(c.url)}
              className="group relative cursor-target flex flex-col w-[300px] flex-shrink-0 snap-center rounded-[20px] overflow-hidden border-2 border-transparent hover:border-[var(--card-border)] transition-colors duration-300 cursor-pointer"
              style={
                {
                  '--card-border': c.borderColor || 'transparent',
                  background: c.gradient,
                  '--spotlight-color': 'rgba(255,255,255,0.3)',
                  '--strength': 1,
                  filter:
                    'grayscale(var(--strength)) brightness(calc(1 - var(--strength) * 0.22))',
                } as React.CSSProperties
              }
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
                }}
              />
              <div className="relative z-10 p-[10px]">
                <Image
                  width={300}
                  height={280}
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-[280px] object-cover rounded-[10px]"
                />
              </div>
              <footer className="relative z-10 p-4 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                <h3 className="m-0 text-[1.1rem] font-bold col-span-2">
                  {c.title}
                </h3>
                <p className="m-0 text-[0.9rem] opacity-90 col-span-2">
                  {c.subtitle}
                </p>
                <div className="col-span-2 border-t border-white/20 my-2" />
                <p className="m-0 text-[0.85rem] opacity-85 font-medium">
                  {c.experience}
                </p>
                <span className="m-0 text-[0.85rem] opacity-85 text-right">
                  {c.location}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1220px] container mx-auto flex justify-start gap-4 mt-4 px-4">
        <button
          onClick={() => scrollCarousel('prev')}
          className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          Prev
        </button>
        <button
          onClick={() => scrollCarousel('next')}
          className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChromaCarousel;

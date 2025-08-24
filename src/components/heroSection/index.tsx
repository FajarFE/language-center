'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import BlurText from '../BlurText/BlurText';
import CountUp from '../CountUp/CountUp';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import CircularText from '../CircularText/CircularText';
import Link from 'next/link';
import { useScrollFadeIn } from '@/libs/animation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  const t = useTranslations('heroSection');
  const [isMobile, setIsMobile] = useState(false);
  const isMobileQuery = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const dataButton = [
    { title: t('skills.speaking') },
    { title: t('skills.creative') },
    { title: t('skills.writing') },
    { title: t('skills.vocabulary') },
  ];

  const animationProps = useScrollFadeIn({
    delay: 0.2,
    yOffset: -50,
    once: false,
  });
  return (
    <section className="container  h-fit relative  max-w-[1220px]  mx-auto   w-7xl">
      <div
        style={{ zIndex: '100' }}
        className=" flex items-start relative w-full h-[800px] rounded-4xl p-10 overflow-hidden bg-[#FCE5FF]"
      >
        <div className="absolute z-[100] w-[700px] h-[700px] translate-x-[-50%] translate-y-[-50%] -bottom-[400px] left-1/2">
          <Image
            src="/herosection.png"
            alt="Hero Section Image"
            layout="fill"
            priority
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex z-50 mt-20 flex-col gap-5 w-full  items-center">
          <BlurText
            direction="bottom"
            delay={50}
            lineSpacing={isMobile ? 0 : 60}
            threshold={0.1}
            className="text-[#212121] font-normal  leading-[32px] lg:leading-0 text-center text-[32px]  lg:text-[58px] md:text-6xl "
            stepDuration={0.7}
            rootMargin="-10px"
            text={isMobile ? t('titleMobile') : t.raw('title')}
          />
          <div className="w-full flex mt-10  justify-between items-center  relative">
            <div className=" bg-primary justify-between h-[200px] py-4 flex flex-col pl-6  pr-20 rounded-4xl relative ">
              <div className="flex text-accent font-bricolage text-[58px] flex-row">
                <span>+</span>
                <CountUp to={18} />
                <span>K</span>
              </div>
              <p
                className="text-white font-bricolage text-[18px] font-normal"
                dangerouslySetInnerHTML={{ __html: t.raw('trusted') }}
              ></p>
              {dataButton.map((item, index) => (
                <button
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? 'left-12     rotate-[25rad]'
                      : 'right-0 -rotate-[25rad]'
                  } px-4 py-2 rounded-full text-primary bg-accent font-semibold absolute cursor-pointer hover:scale-105 transition-transform duration-300`}
                  style={{
                    bottom: `${-80 - index * 50}px`,
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-7 justify-center items-center">
              <div className="w-[160px] bg-primary   rounded-full h-[160px] relative">
                <CircularText
                  className="w-full font-urbanist text-accent font-semibold h-full absolute"
                  text={t('circularText')}
                />
              </div>
              <p
                className="text-[#212121] text-xl font-semibold "
                dangerouslySetInnerHTML={{ __html: t.raw('unlock') }}
              ></p>
              <Link
                href="#"
                className="text-white w-full flex justify-center items-center bg-primary rounded-full py-3 px-5 font-semibold"
              >
                {t('getStarted')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        {...animationProps}
        className="bg-black  absolute px-9 -bottom-[300px] rounded-b-4xl h-[450px] w-full mx-auto container"
      >
        <div className="grid grid-cols-12 w-full h-full  flex-col pb-20 justify-end items-end">
          <div className="col-span-5  text-white flex flex-col gap-5 ">
            <h1 className="text-[55px] font-bricolage">{t('aboutUs')}</h1>
            <div className="flex flex-row w-full justify-start gap-5 text-3xl font-bold">
              <div className="flex flex-col gap-2 cursor-target">
                <span className="text-[48px] text-primary font-bricolage font-normal">
                  +<CountUp to={50} />
                </span>
                <p className="text-base font-normal">{t('onlineCourse')}</p>
              </div>
              <div className="flex flex-col gap-2 cursor-target">
                <span className="text-[48px] text-primary font-bricolage font-normal">
                  <CountUp to={120} />
                </span>
                <p className="text-base font-normal">{t('yearsExperience')}</p>
              </div>
              <div className="flex flex-col gap-2 cursor-target">
                <span className="text-[48px] text-primary font-bricolage font-normal">
                  <CountUp to={15} />+
                </span>
                <p className="text-base font-normal">{t('topMentor')}</p>
              </div>
            </div>
          </div>
          <div className="col-span-7 flex justify-center items-center text-[24px]  font-urbanist text-white ">
            <p>{t('aboutUsDescription')}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

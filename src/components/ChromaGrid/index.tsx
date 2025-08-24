'use client';
import { useTranslations } from 'next-intl';
import ChromaCarousel from './ChromaGrid';

export const Tutor = () => {
  const t = useTranslations('tutors');
  return (
    <section className="relative mt-10 w-full h-fit flex items-center justify-center">
      <div className="flex flex-col gap-10 w-screen overflow-hidden ">
        <div className="flex flex-col mx-auto w-6xl  container max-w-[1220px] items-start">
          <h1 className="text-black text-[58px] leading-14 font-bricolage ">
            {t('title')}
          </h1>
          <p className="text-black text-[18px] mt-5 font-light ">
            {t('subtitle')}
          </p>
        </div>
        <ChromaCarousel />
      </div>
    </section>
  );
};

'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Squares from '../Squares/Squares'; // Pastikan path ini benar

export const Discount = () => {
  const t = useTranslations('discount');
  return (
    <section className="w-6xl mx-auto overflow-hidden relative container max-w-[1220px] h-[400px] bg-[#9242FD] rounded-4xl mt-[80px]">
      <div className="absolute inset-0 z-10">
        <Squares
          speed={0.5}
          squareSize={80}
          direction="diagonal"
          borderColor="#F2FF7D"
          hoverFillColor="#D3E712"
        />
      </div>
      <Image
        src="/wow.png"
        alt="Discount Image"
        width={700}
        height={700}
        priority
        className="absolute -left-[200px] -bottom-20 z-20 pointer-events-none" // <-- TAMBAHKAN INI
      />
      <div
        className="h-full flex-col gap-5 pl-[300px] w-full flex absolute items-start justify-center z-30 pointer-events-none" // <-- DAN TAMBAHKAN INI
      >
        <h1 className="text-white text-[78px] font-bricolage  text-center px-5">
          {t('title')}
        </h1>
        <p>{t('subtitle')}</p>
        <button className="bg-blue-500 pointer-events-auto inset-1 text-white py-2 px-4 rounded">
          {t('claim')}
        </button>
      </div>
    </section>
  );
};

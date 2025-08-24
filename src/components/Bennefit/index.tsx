'use client';
import { useTranslations } from 'next-intl';
import { CardBennefit } from './cardBennefit';

export const Bennefits = () => {
  const t = useTranslations('benefits');

  const dataBennefit = [
    {
      title: t('cards.dormitory.title'),
      description: t('cards.dormitory.description'),
    },
    {
      title: t('cards.expertTutors.title'),
      description: t('cards.expertTutors.description'),
    },
    {
      title: t('cards.realPractice.title'),
      description: t('cards.realPractice.description'),
    },
    {
      title: t('cards.officialCertification.title'),
      description: t('cards.officialCertification.description'),
    },
  ];

  return (
    <section className="w-6xl mx-auto container max-w-[1220px] h-[700px] mt-[80px] relative flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 cursor-target left-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 text-center z-10  max-w-2xl">
          <h1 className="text-black text-[58px] leading-14 font-bricolage px-5">
            {t('title')}
          </h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {dataBennefit.map((item, index) => {
          const positions = [
            { top: '100px', left: '0px' },
            { top: '400px', left: '0px' },
            { top: '150px', right: '0px' },
            { top: '450px', right: '0px' },
          ];

          return (
            <CardBennefit
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              style={{
                top: positions[index].top,
                left: positions[index]?.left,
                right: positions[index]?.right,
              }}
              className={`w-[350px] absolute cursor-target`}
            />
          );
        })}
      </div>
    </section>
  );
};

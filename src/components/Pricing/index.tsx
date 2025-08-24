'use client';
import React, { useState } from 'react';
import CardPricing from './CardPricing';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const t = useTranslations('pricing');
  const [paymentType, setPaymentType] = useState('lunasan');

  const plans = [
    {
      title: t('plans.englishMaster.title'),
      price: t('plans.englishMaster.price'),
      discount: t('plans.englishMaster.discount'),
      originalPrice: t('plans.englishMaster.originalPrice'),
      duration: t('plans.englishMaster.duration'),
      description: t('plans.englishMaster.description'),
      features: t.raw('plans.englishMaster.features'),
      bonus: t('plans.englishMaster.bonus'),
      buttonText: t('plans.englishMaster.button'),
    },
    {
      title: t('plans.englishMasterPlus.title'),
      price: t('plans.englishMasterPlus.price'),
      discount: t('plans.englishMasterPlus.discount'),
      originalPrice: t('plans.englishMasterPlus.originalPrice'),
      duration: t('plans.englishMasterPlus.duration'),
      description: t('plans.englishMasterPlus.description'),
      features: t.raw('plans.englishMasterPlus.features'),
      bonus: t('plans.englishMasterPlus.bonus'),
      buttonText: t('plans.englishMasterPlus.button'),
      isPopular: true,
    },
  ];

  const parsePrice = (priceString: string) => {
    return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
  };

  const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'decimal',
    }).format(price);
    return `Rp${formatted},-`;
  };

  const getDurationInMonths = (durationString: string) => {
    const match = durationString.match(/(\d+)\s+Bulan/);
    return match ? parseInt(match[1], 10) : 1;
  };

  const calculatedPlans = plans.map((plan) => {
    const originalPriceNumber = parsePrice(plan.price);
    const originalDiscountedPriceNumber = plan.originalPrice
      ? parsePrice(plan.originalPrice)
      : undefined;

    if (paymentType === 'cicilan') {
      const months = getDurationInMonths(plan.duration);
      const installmentPrice = Math.round(originalPriceNumber / months);
      const installmentDiscountedPrice = originalDiscountedPriceNumber
        ? Math.round(originalDiscountedPriceNumber / months)
        : undefined;

      return {
        ...plan,
        price: `${formatPrice(installmentPrice)}/bulan`,
        originalPrice: installmentDiscountedPrice
          ? `${formatPrice(installmentDiscountedPrice)}/bulan`
          : undefined,
        duration: `Cicilan selama ${months} bulan`,
      };
    }
    return plan;
  });

  return (
    <section className="w-6xl container mx-auto max-w-[1220px] relative py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-bricolage mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 cursor-target lg:grid-cols-24 pricing-wrapper gap-8 w-full bg-primary p-5 rounded-xl has-[.pricing-card:hover]:bg-transparent has-[.pricing-card:hover]:[&>div]:text-primary transition-colors duration-300">
        <div className="flex flex-col col-span-10 justify-between items-start p-5 text-primary-foreground rounded-2xl">
          <div className="text-left">
            <h3 className="text-4xl font-semibold mb-3 font-bricolage">
              {t('journey.title')}
            </h3>
            <p className="text-sm opacity-80">{t('journey.subtitle')}</p>
          </div>
          <div className="w-full max-w-xs text-left">
            <label className="text-sm font-medium opacity-90">
              {t('journey.paymentMethod')}
            </label>
            <div className="relative bg-gray-200/80 dark:bg-slate-800 rounded-full p-1 flex mt-2">
              <motion.div
                className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[48%] bg-primary rounded-full"
                layoutId="switcher-bg"
                initial={false}
                animate={{ x: paymentType === 'lunasan' ? '0%' : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <Button
                onClick={() => setPaymentType('lunasan')}
                variant="ghost"
                className="relative z-10 flex-1 rounded-full text-primary-foreground"
              >
                {t('journey.fullPayment')}
              </Button>
              <Button
                onClick={() => setPaymentType('cicilan')}
                variant="ghost"
                className="relative z-10 flex-1 rounded-full text-primary-foreground"
              >
                {t('journey.installment')}
              </Button>
            </div>
            <p className="text-xs opacity-70 mt-2">{t('journey.switch')}</p>
          </div>
        </div>
        {calculatedPlans.map((plan, index) => (
          <CardPricing key={index} {...plan} className="pricing-card" />
        ))}
      </div>
    </section>
  );
};

export default Pricing;

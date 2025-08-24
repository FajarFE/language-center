'use client';
import React, { useState } from 'react';
import CardPricing from './CardPricing';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [paymentType, setPaymentType] = useState('lunasan');

  const plans = [
    {
      title: 'English Master',
      price: 'Rp6.900.000,-',
      discount: '16% off',
      originalPrice: 'Rp7.147.619,-',
      duration: 'Durasi: 4 Bulan',
      description:
        'Program dengan materi lengkap dari grammar, speaking, pronunciation, vocabulary, FREE praktik ke Bali.',
      features: [
        'Tutor Pendamping Asrama',
        'Assessment Test',

        '4x main class dan 2x camp class',
        'Modul Pembelajaran',
      ],
      bonus: 'GRATIS: Jaket + Batik + Kaos + E-Sertifikat ber-SK Diknas',
      buttonText: 'Daftar English Master',
    },
    {
      title: 'English Master Plus',
      price: 'Rp9.900.000,-',
      discount: '16% off',
      originalPrice: 'Rp10.147.619,-',
      duration: 'Durasi: 6 Bulan',
      description:
        'Program dengan materi lengkap dari grammar, speaking, pronunciation, vocabulary, FREE praktik ke Bali, dan REAL TEST TOEFL ITP.',
      features: [
        'Tutor Pendamping Asrama',
        'Assessment Test',
        '4x main class dan 2x camp class',
        'Modul Pembelajaran',
        'Real Test TOEFL ITP',
      ],
      bonus: 'GRATIS: Jaket + Batik + Kaos + E-Sertifikat ber-SK Diknas',
      buttonText: 'Daftar English Master Plus',
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
          Investasi Terbaik untuk Masa Depan Anda
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Pilih paket yang paling sesuai untuk mencapai tujuan bahasa Inggris
          Anda bersama kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-24 pricing-wrapper gap-8 w-full bg-primary p-5 rounded-xl has-[.pricing-card:hover]:bg-transparent transition-colors duration-300">
        <div className="flex flex-col col-span-10 justify-between items-center p-5 text-primary-foreground rounded-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-3">
              Satu Langkah Lagi Menuju Kefasihan
            </h3>
            <p className="text-sm opacity-80">
              Kami menawarkan fleksibilitas untuk memudahkan Anda memulai.
            </p>
          </div>
          <div className="w-full max-w-xs text-center">
            <label className="text-sm font-medium opacity-90">
              Pilih Metode Pembayaran Anda
            </label>
            <div className="relative bg-gray-200/80 dark:bg-slate-800 rounded-full p-1 flex mt-2">
              <motion.div
                className="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 bg-primary rounded-full"
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
                Lunasan
              </Button>
              <Button
                onClick={() => setPaymentType('cicilan')}
                variant="ghost"
                className="relative z-10 flex-1 rounded-full text-primary-foreground"
              >
                Cicilan
              </Button>
            </div>
            <p className="text-xs opacity-70 mt-2">
              Anda dapat beralih antara pembayaran penuh atau cicilan bulanan.
            </p>
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

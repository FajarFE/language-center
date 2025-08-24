'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

interface CardPricingProps {
  title: string;
  price: string;
  discount?: string;
  originalPrice?: string;
  duration: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  className?: string;
}

const CardPricing = ({
  title,
  price,
  discount,
  originalPrice,
  duration,
  description,
  features,
  buttonText,
  isPopular = false,
  className,
}: CardPricingProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mainPrice, priceSuffix] = price.split('/');
  const [mainOriginalPrice, originalPriceSuffix] =
    originalPrice?.split('/') || [];

  return (
    <div
      className={cn(
        'relative rounded-2xl col-span-7 shadow-lg transition-all duration-500 ease-in-out transform-gpu overflow-hidden group h-[450px]',
        isPopular
          ? 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 border-2 border-blue-500'
          : 'bg-white dark:bg-slate-900',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'transition-opacity duration-500 ease-in-out p-8 flex flex-col h-full',
          isHovered ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="flex-grow">
          {discount && (
            <span className="text-xs bg-red-500 text-white font-semibold px-2 py-1 rounded-md mb-2 inline-block">
              {discount}
            </span>
          )}
          <h3 className="text-2xl font-bold font-bricolage">{title}</h3>
          <p className="text-gray-500 mt-1">{duration}</p>
          <div className="my-6">
            <div>
              <p className="text-4xl font-extrabold">{mainPrice}</p>
              {priceSuffix && (
                <p className="text-lg text-gray-500">/{priceSuffix}</p>
              )}
            </div>
            {originalPrice && (
              <div className="flex items-baseline text-sm text-gray-500 line-through mt-1">
                <span>{mainOriginalPrice}</span>
                {originalPriceSuffix && <span>/{originalPriceSuffix}</span>}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <Button className="w-full mt-6 font-bold group-hover:bg-blue-600 transition-colors">
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500 ease-in-out p-8 flex flex-col h-full bg-blue-600 text-white',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className="flex-grow">
          <h3 className="text-2xl font-bold font-bricolage mb-4">{title}</h3>
          <div className="flex items-center mb-6">
            <div className="flex -space-x-4">
              <Image
                width={100}
                height={100}
                className="w-10 h-10 object-cover border-2 border-white rounded-full"
                src="/1.jpeg"
                alt="User 1"
              />
              <Image
                width={100}
                height={100}
                className="w-10 h-10 object-cover border-2 border-white rounded-full"
                src="/2.jpeg"
                alt="User 2"
              />
              <Image
                width={100}
                height={100}
                className="w-10 h-10 object-cover border-2 border-white rounded-full"
                src="/3.jpeg"
                alt="User 3"
              />
              <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full">
                +99
              </span>
            </div>
            <p className="ml-4 text-sm font-medium">
              Bergabunglah dengan 100+ siswa
            </p>
          </div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="mr-3 h-5 w-5 flex-shrink-0 mt-1" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant="secondary"
          className="w-full mt-6 font-bold bg-white text-blue-600 hover:bg-gray-200"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default CardPricing;

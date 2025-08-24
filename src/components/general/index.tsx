'use client';
import React from 'react';
import { NavbarLayout } from './navbar';
import { FooterLayout } from './footer';
import { Facebook, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('navbar');

  const DataNavbar = {
    title: t('brand'),
    image: '/favicon.ico',
    links: [
      { href: '/about', label: t('about') },
      { href: '/courses', label: t('courses') },
      { href: '/contact', label: t('contact') },
    ],
  };

  const DataFooter = {
    image: '/favicon.ico',
    socialMedia: [
      { icon: Facebook, href: 'https://facebook.com' },
      { icon: Phone, href: 'tel:+1234567890' },
    ],
    numberHp: 1234567890,
    section: [
      {
        title: 'Quick Links',
        link: [
          { href: '/privacy', label: 'Privacy Policy' },
          { href: '/terms', label: 'Terms of Service' },
        ],
      },
    ],
  };
  return (
    <>
      <NavbarLayout
        title={DataNavbar.title}
        image={DataNavbar.image}
        links={DataNavbar.links}
      />
      {children}
      <FooterLayout
        image={DataFooter.image}
        socialMedia={DataFooter.socialMedia}
        numberHp={DataFooter.numberHp}
        section={DataFooter.section}
      />
    </>
  );
};

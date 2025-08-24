'use client';
import React from 'react';
import { NavbarLayout } from './navbar';
import { FooterLayout } from './footer';
import { Facebook, Instagram, Linkedin, XIcon, Youtube } from 'lucide-react';
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
      { icon: Linkedin, href: 'tel:+1234567890' },
      { icon: Instagram, href: 'https://facebook.com' },
      { icon: Youtube, href: 'tel:+1234567890' },
      { icon: XIcon, href: 'https://x.com' },
    ],
    numberHp: 1234567890,
    section: [
      {
        title: 'About',
        link: [
          { href: '/privacy', label: 'Company Profile' },
          { href: '/terms', label: 'Carrers' },
          { href: '/terms', label: 'Contact Us' },
          { href: '/terms', label: 'Privacy Policy' },
        ],
      },
      {
        title: 'Learning With Us',
        link: [
          { href: '/privacy', label: 'Learning Methods' },
          { href: '/terms', label: 'Expert Tutors' },
          { href: '/terms', label: 'Certified Programs' },
          { href: '/terms', label: 'Corporate Training' },
        ],
      },
      {
        title: 'Discover',
        link: [
          { href: '/privacy', label: 'Blogs Articles' },
          { href: '/terms', label: 'English Test' },
          { href: '/terms', label: 'Support Center' },
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

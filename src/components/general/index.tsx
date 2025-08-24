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
      { href: '#', label: t('about') },
      { href: '#', label: t('courses') },
      { href: '#', label: t('contact') },
    ],
  };

  const DataFooter = {
    image: '/favicon.ico',
    socialMedia: [
      { icon: Facebook, href: 'https://facebook.com' },
      { icon: Linkedin, href: 'https://facebook.com' },
      { icon: Instagram, href: 'https://facebook.com' },
      { icon: Youtube, href: 'https://facebook.com' },
      { icon: XIcon, href: 'https://x.com' },
    ],
    numberHp: 1234567890,
    section: [
      {
        title: 'About',
        link: [
          { href: '#', label: 'Company Profile' },
          { href: '#', label: 'Carrers' },
          { href: '#', label: 'Contact Us' },
          { href: '#', label: 'Privacy Policy' },
        ],
      },
      {
        title: 'Learning With Us',
        link: [
          { href: '#', label: 'Learning Methods' },
          { href: '#', label: 'Expert Tutors' },
          { href: '#', label: 'Certified Programs' },
          { href: '#', label: 'Corporate Training' },
        ],
      },
      {
        title: 'Discover',
        link: [
          { href: '#', label: 'Blogs Articles' },
          { href: '#', label: 'English Test' },
          { href: '#', label: 'Support Center' },
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

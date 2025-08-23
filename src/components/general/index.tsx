import React from 'react';
import { NavbarLayout } from './navbar';
import { FooterLayout } from './footer';
import { Facebook, Phone } from 'lucide-react';

export const DataNavbar = {
  title: 'Learning English',
  image: '/favicon.ico',
  links: [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};

export const DataFooter = {
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

export const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarLayout
        title="Learning Center"
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

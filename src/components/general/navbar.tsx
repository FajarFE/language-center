import { Navbar } from '@/types/general';
import Image from 'next/image';
import Link from 'next/link';
import LocaleSwitcher from '../ui/locale-switcher';

export const NavbarLayout = ({ title, image, links }: Navbar) => {
  return (
    <nav className="container mx-auto bg-subtle/30 backdrop-blur-lg my-10 rounded-full px-5 w-7xl max-w-[1220px]">
      <div className="flex items-center justify-between py-4 b">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image
              src={image}
              width={100}
              height={100}
              alt="Logo"
              className="h-8 w-8 inline-block"
            />
          </Link>
          <span className="ml-2 font-accent text-primary align-middle">
            {title}
          </span>
        </div>
        <ul className="text-xl font-urbanist flex">
          {links.map((link) => (
            <li key={link.href} className="inline-block mr-4">
              <Link href={link.href} className="text-lg ">
                {link.label}
              </Link>
            </li>
          ))}
          <LocaleSwitcher />
        </ul>
      </div>
    </nav>
  );
};

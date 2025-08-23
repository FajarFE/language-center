import { Footer } from '@/types/general';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const FooterLayout = ({
  image,
  socialMedia,
  numberHp,
  section,
}: Footer) => {
  return (
    <footer className="container mx-auto w-6xl max-w-[1280px] py-8 flex-col">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5">
          <Image
            src={image}
            width={100}
            height={100}
            alt="Footer Image"
            className="h-10 w-10"
          />
          <div className="flex gap-2">
            {socialMedia.map((media, index_) => (
              <Link
                key={index_}
                href={media.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <media.icon />
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Phone />
            <span>{numberHp}</span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {section.map((sec, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{sec.title}</h3>
              {sec.link.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Your Company
        </p>
      </div>
    </footer>
  );
};

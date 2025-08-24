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
    <section className="bg-black pt-7">
      <footer className="container mx-auto w-6xl max-w-[1280px] py-8 flex-col">
        <div className="flex justify-between items-center mb-30">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row justify-center items-center gap-3">
              <Image
                src={image}
                width={100}
                height={100}
                alt="Footer Image"
                className="h-16 w-16"
              />
              <span className="text-primary text-[40px] font-urbanist font-bold">
                Learning Center
              </span>
            </div>
            <div className="flex gap-2">
              {socialMedia.map((media, index_) => (
                <Link
                  key={index_}
                  href={media.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black  rounded-full px-1 py-1 bg-white hover:underline"
                >
                  <media.icon />
                </Link>
              ))}
            </div>
            <div className="flex gap-2 text-white">
              <Phone />
              <span>+{numberHp}</span>
            </div>
          </div>
          <div className="flex justify-center items-start gap-14">
            {section.map((sec, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="text-2xl font-bricolage mb-5 text-white font-semibold">
                  {sec.title}
                </h3>
                {sec.link.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="text-sm text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex pt-10 border-t-2 justify-between items-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Learning Center All right reserved
          </p>
          <div className="text-white text-sm gap-8 flex">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Term & Conditions</Link>
            <Link href="#">FAQ</Link>
          </div>
        </div>
      </footer>
    </section>
  );
};

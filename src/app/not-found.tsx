'use client';

import Lottie from 'lottie-react';
import NotFoundAnimation from '@/../public/Error 404 creature.json';
import Link from 'next/link';
export default function NotFound() {
  return (
    <>
      <div className="mx-auto z-50 -mt-16 max-w-[768px] min-w-[375px] lg:max-w-[1440px] container lg:min-w-4xl lg:w-xl px-5">
        <Lottie animationData={NotFoundAnimation} loop={true} />
        <div className="text-center gap-4 flex justify-center items-center flex-col mt-0 lg:-mt-12">
          <p
            data-cursor-hover-area={true}
            className="text-[18px] font-satoshi
           text-[#8a8a8a]"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            data-cursor-hover-area-custom={true}
            className=" text-[16px] lg:text-[18px] text-[#8a8a8a] hover:text-white px-4 lg:px-8 w-fit py-2 lg:py-4 rounded-full outline-[2px] outline-[#cccccc] hover:outline-none bg-transparent hover:bg-[#ff6400] font-medium lg:font-semibold"
            href="/"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
}

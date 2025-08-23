import ChromaCarousel from './ChromaGrid';

export const Tutor = () => {
  return (
    <section className="relative mt-10 w-full h-fit flex items-center justify-center">
      <div className="flex flex-col gap-10 w-screen overflow-hidden ">
        <div className="flex flex-col mx-auto w-6xl  container max-w-[1220px] items-start">
          <h1 className="text-black text-[58px] leading-14 font-bricolage ">
            Meet Our Tutors
          </h1>
          <p className="text-black text-[18px] mt-5 font-light ">
            Our tutors are experienced educators who are passionate about
            teaching and helping students achieve their language learning goals.
          </p>
        </div>
        <ChromaCarousel />
      </div>
    </section>
  );
};

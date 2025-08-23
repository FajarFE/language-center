// Bennefits.jsx (Kode yang sudah diperbaiki)

import { CardBennefit } from './cardBennefit';

export const dataBennefit = [
  {
    title: 'Asrama Area',
    description:
      'Percepat kefasihan dan bangun kepercayaan diri dengan tinggal di lingkungan imersif 24/7.',
  },
  {
    title: 'Pengajar Ahli',
    description:
      'Kuasai materi lengkap dari grammar hingga speaking bersama instruktur berpengalaman.',
  },
  {
    title: 'Praktik Nyata',
    description:
      'Terapkan langsung kemampuanmu dalam situasi dunia nyata saat trip gratis ke Bali.',
  },
  {
    title: 'Sertifikasi Resmi',
    description:
      'Tingkatkan nilai CV dengan sertifikat Diknas dan skor TOEFL ITP resmi untuk karir global.',
  },
];

export const Bennefits = () => {
  return (
    <section className="w-6xl mx-auto container max-w-[1220px] h-[700px] mt-[80px] relative flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 cursor-target left-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 text-center z-10  max-w-2xl">
          <h1 className="text-black text-[58px] leading-14 font-bricolage px-5">
            Course Benefits
          </h1>
          <p className="text-gray-600">
            Discover why thousands of students choose us for the English Master
            Program.
          </p>
        </div>

        {dataBennefit.map((item, index) => {
          const positions = [
            { top: '100px', left: '0px' },
            { top: '400px', left: '0px' },
            { top: '150px', right: '0px' },
            { top: '450px', right: '0px' },
          ];

          return (
            <CardBennefit
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              style={{
                top: positions[index].top,
                left: positions[index]?.left,
                right: positions[index]?.right,
              }}
              className={`w-[350px] absolute cursor-target`}
            />
          );
        })}
      </div>
    </section>
  );
};

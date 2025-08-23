export const CardProgram = ({
  icons,
  title,
  desc,
}: {
  title: string;
  icons: React.ReactNode;
  desc: string;
}) => {
  return (
    <div className="border border-gray-300 rounded-3xl p-8 flex flex-col gap-5 hover:scale-105 transition-transform duration-300 cursor-pointer">
      {icons}
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
};

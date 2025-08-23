import React from 'react';

export interface CardBennefitProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  title: string;
  description: string;
  className?: string;
}

export const CardBennefit = ({
  index,
  className,
  title,
  description,
  ...props
}: CardBennefitProps) => {
  return (
    <div className={className} {...props}>
      <div className="bg-subtle rounded-3xl p-6 flex flex-col gap-5 cursor-pointer">
        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center font-bricolage text-2xl justify-center w-12 h-12 bg-primary text-accent rounded-full">
            0{index + 1}.
          </div>
          <h2 className="text-2xl font-bricolage">{title}</h2>
        </div>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

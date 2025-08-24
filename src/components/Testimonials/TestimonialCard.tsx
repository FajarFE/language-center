import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  title,
  avatar,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center min-w-[300px] max-w-[400px] mx-4">
      {avatar && (
        <Image
          src={avatar}
          alt={author}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
      )}
      <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
        {`"${quote}"`}
      </p>
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
        {author}
      </h4>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
    </div>
  );
};

export default TestimonialCard;

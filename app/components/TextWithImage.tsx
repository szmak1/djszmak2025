import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface TextWithImageProps {
  title: string;
  description: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  imagePositionY?: 'top' | 'center' | 'bottom';
  buttonText?: string;
  buttonLink?: string;
}

export default function TextWithImage({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  imagePositionY = 'center',
  buttonText,
  buttonLink,
}: TextWithImageProps) {
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : '';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : '';

  const getObjectPosition = () => {
    switch (imagePositionY) {
      case 'top':
        return 'object-top';
      case 'bottom':
        return 'object-bottom';
      default:
        return 'object-center';
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`flex flex-col ${contentOrder}`}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <div className="font-sans text-lg text-gray-300 mb-8">{description}</div>
            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="!font-heading inline-block !bg-gradient-to-r !from-[#00ff97] !via-[#00daa8] !to-[#007ed4] !text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-all duration-200 animate-fade-in-delay-2 shadow-lg hover:shadow-[#00ff97]/20"
              >
                {buttonText}
              </Link>
            )}
          </div>

          {/* Image */}
          <div className={`${imageOrder}`}>
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className={`object-cover hover:scale-105 transition-transform duration-500 ${getObjectPosition()}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

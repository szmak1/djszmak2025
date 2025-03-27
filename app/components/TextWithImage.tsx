import Image from 'next/image';
import Link from 'next/link';

interface TextWithImageProps {
  title: string;
  description: string;
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
    <div className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`flex flex-col ${contentOrder}`}>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              {title}
            </h2>
            <p className="font-sans text-lg text-white/90 mb-8">{description}</p>
            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="font-heading inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 text-sm rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg max-w-[200px] text-center"
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

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { heroContent } from '../config/heroContent';

export default function HeroVideo() {
  const pathname = usePathname();
  const content = heroContent[pathname] || heroContent['/'];

  return (
    <div className="relative h-[80vh] w-screen -ml-[50vw] left-1/2 right-1/2 overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-h-full w-full object-cover z-0"
      >
        <source src={content.videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 max-w-[1920px] mx-auto">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 animate-fade-in tracking-tight drop-shadow-lg">
              {content.title}
            </h1>
            <p className="font-sans text-lg md:text-xl mb-8 animate-fade-in-delay drop-shadow-lg">
              {content.subtitle}
            </p>
            <Link
              href={content.buttonLink}
              className="font-heading inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-200 animate-fade-in-delay-2 shadow-lg"
            >
              {content.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

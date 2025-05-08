'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useRef } from 'react';

interface HeroVideoProps {
  title: ReactNode;
  subtitle: ReactNode;
  buttonText: string;
  buttonLink: string;
  videoSrc: string;
}

export default function HeroVideo({
  title,
  subtitle,
  buttonText,
  buttonLink,
  videoSrc,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;

    // Set video quality based on device
    if (isMobile) {
      video.setAttribute('preload', 'metadata');
    } else {
      video.setAttribute('preload', 'auto');
    }

    // Play video when it's ready
    const playVideo = () => {
      video.play().catch(error => {
        console.log('Video play failed:', error);
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadedmetadata', playVideo);
      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
      };
    }
  }, []);

  const scrollToPriceCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('pricecalculator');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="relative h-[80vh] w-screen -ml-[50vw] left-1/2 right-1/2 overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-h-full w-full object-cover z-0"
        poster={`${videoSrc.replace('.mp4', '.webp')}`}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32 max-w-[1920px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in tracking-tight">
              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="font-sans text-lg md:text-xl mb-8 animate-fade-in-delay text-gray-300">
              {subtitle}
            </p>
            <Link
              href={buttonLink}
              onClick={scrollToPriceCalculator}
              className="font-heading inline-block bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-all duration-200 animate-fade-in-delay-2 shadow-lg hover:shadow-[#00ff97]/20"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

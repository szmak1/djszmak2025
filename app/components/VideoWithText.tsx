'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface VideoWithTextProps {
  title: string;
  description: string;
  videoSrc: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function VideoWithText({
  title,
  description,
  videoSrc,
  buttonText,
  buttonLink,
}: VideoWithTextProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(error => {
              console.log('Video play failed:', error);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <div className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Video */}
          <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              src={videoSrc}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              {title}
            </h2>
            <p className="font-sans text-lg text-white/90 mb-8 whitespace-pre-line">
              {description}
            </p>
            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="font-heading inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 text-sm rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg max-w-[200px] text-center"
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoSectionProps {
  videoHeading: string;
  videoTitle: string;
  videoTitleColor?: string;
  videoDescription?: string;
}

export default function VideoSection({
  videoHeading,
  videoTitle,
  videoDescription,
}: VideoSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
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
    <section className="py-8 md:pb-10 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm md:text-base font-semibold tracking-wide uppercase bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] text-transparent bg-clip-text mb-2">
            {videoHeading}
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 md:mb-12">
            {videoTitle}
          </h2>
        </div>

        <div className="relative">
          <div className="relative py-4 md:py-8 px-0 md:px-6">
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <div
                className="w-full relative group rounded-lg overflow-hidden shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <video
                  ref={videoRef}
                  className="w-full max-w-4xl rounded-lg"
                  controls={isHovered}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  src="/videos/LEDGolv.mp4"
                  poster="/images/ledgolv.webp"
                >
                  <source src="/videos/LEDGolv.mp4" type="video/mp4" />
                  <track kind="captions" srcLang="sv" label="Swedish" default />
                  Your browser does not support the video tag.
                </video>
              </div>
              {videoDescription && (
                <div
                  className="mt-4 md:mt-8 text-base md:text-xl text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 md:p-8 flex flex-col justify-center items-center text-left shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#00ff97]/20"
                  dangerouslySetInnerHTML={{ __html: videoDescription }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

interface VideoSectionProps {
  videoHeading: string;
  videoTitle: string;
  videoTitleColor?: string;
  videoDescription?: string;
}

export default function VideoSection({
  videoHeading,
  videoTitle,
  videoTitleColor = 'text-pink-500',
  videoDescription,
}: VideoSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="pb-10 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base font-semibold tracking-wide uppercase bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            {videoHeading}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {videoTitle}
          </h2>
        </div>

        <div className="relative">
          <div className="relative bg-opacity-75 py-20 px-6 sm:py-20 sm:px-12 lg:px-16">
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <div
                className="w-full relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <video
                  className="w-full max-w-4xl rounded-lg"
                  controls={isHovered}
                  autoPlay
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
                  className="mt-8 text-xl text-white bg-gray-800 rounded-lg p-8 flex flex-col justify-center items-center text-left shadow-lg hover:shadow-xl transition-shadow duration-300"
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

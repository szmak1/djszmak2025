import React, { ReactNode } from 'react';
import DividerWave from './DividerWave';
import DividerWaveTop from './DividerWaveTop';
import './TextSection.css';

interface TextSectionProps {
  title: string;
  description: ReactNode;
}

export default function TextSection({ title, description }: TextSectionProps) {
  return (
    <div className="relative w-full">
      <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw]">
        <div className="absolute top-0 left-0 w-full DividerWaveAdjustTop">
          <DividerWave />
        </div>
      </div>
      <section className="w-screen relative left-[50%] right-[50%] mx-[-50vw] bg-[#00ff97] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="text-black">{title}</span>
            </h2>
            <div className="w-24 h-1 bg-black mx-auto rounded-full mb-8" />
          </div>

          <div className="space-y-6 max-w-5xl mx-auto text-black">{description}</div>
        </div>
      </section>
      <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw]">
        <div className="absolute bottom-0 left-0 w-full DividerWaveAdjustBottom">
          <DividerWaveTop />
        </div>
      </div>
    </div>
  );
}

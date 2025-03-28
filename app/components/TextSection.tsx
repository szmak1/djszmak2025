import React from 'react';

interface TextSectionProps {
  title: string;
  description: string;
}

export default function TextSection({ title, description }: TextSectionProps) {
  const paragraphs = description.split('\n\n').filter(p => p.trim());

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="border border-[#00ff97]/20 rounded-lg bg-black/50 p-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] mx-auto rounded-full mb-8" />
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="font-sans text-lg text-gray-300 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

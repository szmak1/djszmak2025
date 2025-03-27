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
        <div className="bg-gray-900 rounded-lg p-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-8" />
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="font-sans text-lg text-white/90 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

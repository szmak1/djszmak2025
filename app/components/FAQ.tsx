'use client';

import { useState, ReactNode } from 'react';

interface FAQItem {
  question: string;
  answer: string | string[] | ReactNode | ReactNode[];
}

interface FAQProps {
  faqItems?: FAQItem[];
  defaultOpen?: number;
}

export default function FAQ({ faqItems = [], defaultOpen }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-center mb-4">
          <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
            Vanliga Frågor
          </span>
        </h2>
        <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
          Här hittar du svar på de vanligaste frågorna om våra DJ-tjänster
        </p>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group border border-[#00ff97]/20 rounded-lg overflow-hidden bg-black/50 hover:border-[#00ff97]/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#00ff97]/5 transition-colors"
              >
                <span className="text-xl font-heading text-white group-hover:text-[#00ff97] transition-colors">
                  {item.question}
                </span>
                <span
                  className={`transform transition-transform duration-300 text-[#00ff97] ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 bg-gradient-to-r from-[#00ff97]/5 to-transparent">
                  {Array.isArray(item.answer) ? (
                    <div className="space-y-3 text-gray-300">
                      {item.answer.map((line, i) => (
                        <p key={i} className="text-lg leading-relaxed">
                          {typeof line === 'string' ? (
                            <span dangerouslySetInnerHTML={{ __html: line }} />
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {typeof item.answer === 'string' ? (
                        <span dangerouslySetInnerHTML={{ __html: item.answer as string }} />
                      ) : (
                        item.answer
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

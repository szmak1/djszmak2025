'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqItems: FAQItem[] = [
  {
    question: 'Går det att boka DJ Szmak som DJ i Skåne?',
    answer: 'DJ Szmak har hela Skåne som arbetsområde.',
  },
  {
    question: 'Hur bokar jag djszmak?',
    answer: [
      'DJ Szmak kan bokas på 3 olika sätt som DJ Skåne:',
      'Via formuläret djszmak.se/kontakt',
      'Via mejl till info@djszmak.se',
      'Via telefon till 070-88 290 77',
      'Efter att ni skickat in förfrågan så får ni en offert/förslag av informationen ni har angett i kontakt formuläret via mejl. Det är viktigt att ni verkligen läser igenom denna offert/förslag som ni får. Känns allt ok kan ni därefter lägga en deposition på 1000kr för att din fest ska bli 100% bokad. Resterande belopp faktureras via Frilans Finans efter spelningen. Ni behöver även signera en uppdragsoffert från Frilans Finans som jag skickar till er.',
    ],
  },
  {
    question: 'Transport - och resekostnad för DJ i skåne?',
    answer:
      'Transport och resekostnad tillkommer vid körning utanför Malmö stad. 25kr per mil till den önskade destinationen inom Skåne.',
  },
  {
    question: 'När ska man boka?',
    answer:
      'Viktigt att boka så snart ni vet datumet för festen annars är risken stor att jag redan är bokad. Jag rekommenderar minst 3-6 månader innan fest datumet.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white text-center mb-12">
          FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-white/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-black hover:bg-white/5 transition-colors"
              >
                <span className="text-xl font-heading text-white">{item.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
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
                <div className="px-6 py-4 bg-black/50">
                  {Array.isArray(item.answer) ? (
                    <div className="space-y-2 text-white">
                      {item.answer.map((line, i) => (
                        <p key={i} className="text-lg">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg text-white">{item.answer}</p>
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

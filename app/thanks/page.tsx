'use client';

// Helper function to push to dataLayer
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pushToDataLayer = (eventData: object) => {
  // Ensure dataLayer exists and is an array
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

export default function ThanksPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4">
      <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-8 md:p-12 text-center animate-fade-in max-w-2xl w-full">
        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-[#00ff97]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="font-heading text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent mb-4">
          Tack för ditt meddelande!
        </h2>
        <p className="text-gray-300 text-base md:text-lg mb-4">
          Vi kommer att kontakta dig via e-post inom 24 timmar med en offert.
        </p>
        <p className="text-gray-300 text-base md:text-lg mb-8">
          Om du har brådskande frågor, ring mig gärna på{' '}
          <a
            href="tel:+46708829077"
            className="text-[#00ff97] hover:text-[#00daa8] transition-colors"
          >
            070-88 290 77
          </a>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#00ff97] to-[#00daa8] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] font-bold"
          >
            Tillbaka till startsidan
          </a>
          <a
            href="/kontakt"
            className="px-6 py-3 bg-black/50 border border-[#00ff97]/20 text-[#00ff97] rounded-lg hover:scale-105 transition-all duration-300 hover:bg-[#00ff97]/10 font-bold"
          >
            Skicka nytt meddelande
          </a>
        </div>
      </div>
    </div>
  );
}

import ContactForm from '../components/ContactForm';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import Divider from '../components/Divider';

export default function KontaktPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-4 w-full max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                Kontakta Oss
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed animate-fade-in-up max-w-2xl mx-auto">
              Vi är här för att hjälpa dig skapa den perfekta festen. Kontakta oss för en
              skräddarsydd offert eller om du har några frågor.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in-up relative z-30">
              <a
                href="tel:+46701234567"
                className="flex items-center gap-2 px-8 py-4 bg-[#00ff97] text-black rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] font-bold text-lg"
              >
                <FaPhone className="w-5 h-5" />
                Ring Oss
              </a>
              <a
                href="mailto:info@djszmak.se"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-bold text-lg backdrop-blur-sm"
              >
                <FaEnvelope className="w-5 h-5" />
                Skicka E-post
              </a>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      {/* Contact Form Section */}
      <div className="w-full py-20 pt-0 md:py-32 md:pt-0">
        <div className="w-full px-4 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                Skicka Ett Meddelande
              </span>
            </h2>
            <p className="text-white/80 text-xl">
              Fyll i formuläret nedan så återkommer vi till dig inom 24 timmar.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

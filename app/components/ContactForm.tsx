'use client';

import { useState, FormEvent } from 'react';
import { FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        // Redirect to success page
        window.location.href = '/success';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent">
                Kontakta Oss
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Vi svarar på ditt meddelande inom 24 timmar. Du kan också ringa oss direkt för
              snabbare svar.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg shrink-0">
                <FaPhone className="w-6 h-6 text-[#00ff97]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Telefon</h3>
                <a
                  href="tel:+46701234567"
                  className="text-gray-400 hover:text-[#00ff97] transition-colors duration-300"
                >
                  +46 70 123 45 67
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg shrink-0">
                <FaEnvelope className="w-6 h-6 text-[#00ff97]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">E-post</h3>
                <a
                  href="mailto:info@djszmak.se"
                  className="text-gray-400 hover:text-[#00ff97] transition-colors duration-300"
                >
                  info@djszmak.se
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-lg shrink-0">
                <FaClock className="w-6 h-6 text-[#00ff97]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Öppettider</h3>
                <p className="text-gray-400">
                  Måndag - Fredag: 09:00 - 18:00
                  <br />
                  Lördag - Söndag: Stängt
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black/50 border border-[#00ff97]/20 rounded-lg p-6 md:p-8">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don&apos;t fill this out if you&apos;re human:
                <input name="bot-field" />
              </label>
            </p>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Namn</label>
              <input
                type="text"
                name="name"
                className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ff97]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">E-post</label>
              <input
                type="email"
                name="email"
                className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ff97]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Telefon</label>
              <input
                type="tel"
                name="phone"
                className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ff97]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Meddelande</label>
              <textarea
                name="message"
                rows={4}
                className="w-full bg-black/50 border border-[#00ff97]/20 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#00ff97]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] font-bold ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Skickar...' : 'Skicka Meddelande'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

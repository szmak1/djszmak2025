'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <div
      className={`bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Kontaktinformation</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-xl shrink-0">
                  <FaPhone className="w-6 h-6 text-[#00ff97]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Telefon</h4>
                  <a
                    href="tel:+46701234567"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    +46 70 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-xl shrink-0">
                  <FaEnvelope className="w-6 h-6 text-[#00ff97]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">E-post</h4>
                  <a
                    href="mailto:info@djszmak.se"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    info@djszmak.se
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-xl shrink-0">
                  <FaMapMarkerAlt className="w-6 h-6 text-[#00ff97]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Adress</h4>
                  <p className="text-white/80">
                    Djurgårdsgatan 123
                    <br />
                    123 45 Stockholm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#00ff97]/10 rounded-xl shrink-0">
                  <FaClock className="w-6 h-6 text-[#00ff97]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Öppettider</h4>
                  <p className="text-white/80">
                    Måndag - Fredag: 09:00 - 18:00
                    <br />
                    Lördag - Söndag: Stängt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {submitSuccess ? (
            <div className="bg-[#00ff97]/10 border border-[#00ff97]/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Tack för ditt meddelande!
              </h3>
              <p className="text-white/80">
                Vi har mottagit din förfrågan och återkommer till dig inom 24 timmar.
              </p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={() => setSubmitSuccess(true)}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value="Contact Form Submission" />
              <input type="hidden" name="next" value="/kontakt" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Namn
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:border-transparent"
                  placeholder="Ditt namn"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  E-post
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:border-transparent"
                  placeholder="din@email.se"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:border-transparent"
                  placeholder="+46 70 123 45 67"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Meddelande
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00ff97] focus:border-transparent"
                  placeholder="Skriv ditt meddelande här..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00ff97] text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)]"
              >
                Skicka Meddelande
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

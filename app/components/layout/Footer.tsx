import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const navigation = {
  main: [
    { name: 'Hem', href: '/' },
    { name: 'Bröllopsfest', href: '/brollopsfest' },
    { name: 'Födelsedagsfest', href: '/fodelsedagsfest' },
    { name: 'Studentfest', href: '/studentfest' },
    { name: 'Företagsfest', href: '/foretagsfest' },
    { name: 'Nattklubbsgig', href: '/nattklubbsgig' },
    { name: 'LEDGOLV', href: '/ledgolv' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/djszmak',
      icon: FaFacebook,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/djszmak',
      icon: FaInstagram,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#00ff97] text-black">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {/* Logo and Social Links */}
          <div className="space-y-4 flex flex-col items-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/logo-black.svg"
                alt="DJ Szmak Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <div className="flex justify-center gap-4">
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 hover:text-[#007ed4] transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Tjänster</h3>
            <ul className="space-y-2">
              {navigation.main.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-800 hover:text-[#007ed4] transition-colors duration-200 text-sm block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+46701234567"
                  className="flex items-center justify-center gap-2 text-gray-800 hover:text-[#007ed4] transition-colors duration-200 text-sm"
                >
                  <FaPhone className="h-4 w-4 flex-shrink-0" />
                  <span>+46 70 123 45 67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@djszmak.se"
                  className="flex items-center justify-center gap-2 text-gray-800 hover:text-[#007ed4] transition-colors duration-200 text-sm"
                >
                  <FaEnvelope className="h-4 w-4 flex-shrink-0" />
                  <span>info@djszmak.se</span>
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 text-gray-800 text-sm">
                <FaClock className="h-4 w-4 flex-shrink-0" />
                <span>24/7 Bokning</span>
              </li>
            </ul>
          </div>

          {/* Area Served */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Område</h3>
            <p className="text-sm text-gray-800 mx-auto max-w-xs">
              Vi erbjuder professionella DJ-tjänster i hela Skåne med fokus på Malmö, Lund,
              Helsingborg, och omkringliggande områden.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-800">
              &copy; {new Date().getFullYear()} DJ Szmak. Alla rättigheter förbehållna.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-800 hover:text-[#007ed4] transition-colors duration-200"
              >
                Integritetspolicy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-800 hover:text-[#007ed4] transition-colors duration-200"
              >
                Villkor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

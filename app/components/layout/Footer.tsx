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
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Image
            src="/logos/logo.svg"
            alt="DJ Szmak Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
          <div className="flex justify-center space-x-6">
            {navigation.social.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} DJ Szmak. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map(item => (
            <div key={item.name} className="pb-6">
              <Link
                href={item.href}
                className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          <div className="flex items-center space-x-2 text-gray-400">
            <FaPhone className="h-5 w-5" />
            <a
              href="tel:+46701234567"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              +46 70 123 45 67
            </a>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <FaEnvelope className="h-5 w-5" />
            <a
              href="mailto:info@djszmak.se"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              info@djszmak.se
            </a>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <FaClock className="h-5 w-5" />
            <span className="text-sm">24/7 Bokning</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

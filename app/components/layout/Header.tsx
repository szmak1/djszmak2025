'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { href: '/', label: 'Hem' },
    { href: '/brollopsfest', label: 'Bröllopsfest' },
    { href: '/fodelsedagsfest', label: 'Födelsedagsfest' },
    { href: '/foretagsfest', label: 'Företagsfest' },
    { href: '/studentfest', label: 'Studentfest' },
    { href: '/nattklubbsgig', label: 'Nattklubbsgig' },
    { href: '/ledgolv', label: 'LEDGOLV' },
    { href: '/kontakt', label: 'Kontakt' }
  ]

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="relative">
        <nav className="container mx-auto px-4 py-6 relative z-50">
          <div className="flex items-center justify-between">
            <Link href="/" className="w-[150px] h-[40px] relative">
              <Image
                src="/logos/logo.svg"
                alt="Company Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative z-50 w-10 h-10 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6">
                <span
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white text-2xl font-heading hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
} 
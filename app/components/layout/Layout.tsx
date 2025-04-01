import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DividerCurve from '../DividerCurve';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
          {children}
        </div>
      </main>
      <div className="relative">
        <DividerCurve className="top-0" />
      </div>
      <Footer />
    </div>
  );
}

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
      <main className="flex-grow">{children}</main>
      <div className="relative">
        <DividerCurve className="top-0" />
      </div>
      <Footer />
    </div>
  );
}

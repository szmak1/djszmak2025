import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-32">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
} 
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/50 border border-[#00ff97]/20 rounded-lg p-8 text-center">
        <div className="bg-gradient-to-r from-[#00ff97] via-[#00daa8] to-[#007ed4] bg-clip-text text-transparent text-2xl font-bold mb-4">
          Tack för ditt meddelande!
        </div>
        <p className="text-gray-400 mb-8">
          Vi har skickat en bekräftelse till din e-postadress. Vi återkommer till dig inom 24
          timmar.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#00ff97] text-[#0a0a0a] rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,151,0.5)] font-bold"
        >
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}

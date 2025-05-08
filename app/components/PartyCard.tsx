import Image from 'next/image';
import Link from 'next/link';

interface PartyCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

export default function PartyCard({ title, description, imageSrc, link }: PartyCardProps) {
  return (
    <Link href={link} className="group relative block overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="font-sans text-sm md:text-base text-white/90 mb-4 line-clamp-2">
          {description}
        </p>
        <span className="inline-flex items-center text-sm font-medium bg-gradient-to-r from-[#00ff97] to-[#007ed4] bg-clip-text text-transparent group-hover:from-[#00ff97] group-hover:to-[#00daa8] transition-all duration-300">
          Läs mer
          <svg
            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

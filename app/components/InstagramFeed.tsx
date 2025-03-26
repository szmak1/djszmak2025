'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaInstagram, FaPlay } from 'react-icons/fa';

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramPost[];
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        const data: InstagramResponse = await response.json();
        setPosts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load Instagram posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Laddar Instagram-inlägg...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <FaInstagram className="text-3xl text-pink-500" />
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white text-center tracking-tight drop-shadow-lg">
            Instagram
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              {post.media_type === 'VIDEO' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={post.thumbnail_url || post.media_url}
                    alt={post.caption || 'Instagram post'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </div>
              ) : (
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {post.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                  <p className="text-white text-sm line-clamp-3">{post.caption}</p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

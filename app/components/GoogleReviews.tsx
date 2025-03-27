'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaStarHalf, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface Review {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
  time: number;
}

interface ReviewsResponse {
  reviews: Review[];
  rating: number;
  total_ratings: number;
  name: string;
  googleReviewsUrl: string;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [googleReviewsUrl, setGoogleReviewsUrl] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  // Number of reviews to show per slide based on screen size
  const reviewsPerSlide = {
    mobile: 1,
    desktop: 3,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/google-reviews');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch reviews');
        }
        const data: ReviewsResponse = await response.json();
        setReviews(data.reviews);
        setOverallRating(data.rating);
        setTotalRatings(data.total_ratings);
        setGoogleReviewsUrl(data.googleReviewsUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Get number of reviews per slide based on screen size
  const getReviewsPerSlide = () => {
    return isMobile ? reviewsPerSlide.mobile : reviewsPerSlide.desktop;
  };

  const getMaxSlides = () => {
    return Math.ceil(reviews.length / getReviewsPerSlide());
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(current => (current + 1) % getMaxSlides());
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(current => (current - 1 + getMaxSlides()) % getMaxSlides());
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-400" />);
    }

    return stars;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Laddar recensioner...</div>
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white text-center mb-8 tracking-tight drop-shadow-lg">
          Google Recensioner
        </h2>
        {overallRating > 0 && (
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(overallRating)}
              <span className="text-white ml-2 text-xl md:text-2xl font-heading">
                {overallRating.toFixed(1)}
              </span>
              <Image src="/logos/google.svg" alt="Google" width={48} height={48} className="ml-2" />
            </div>
            <p className="font-sans text-lg md:text-xl text-white/90">
              Baserat på {totalRatings} omdömen{' '}
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline ml-1"
              >
                Läs alla recensioner
              </a>
            </p>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Reviews Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: getMaxSlides() }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
                >
                  {reviews
                    .slice(
                      slideIndex * getReviewsPerSlide(),
                      (slideIndex + 1) * getReviewsPerSlide()
                    )
                    .map((review, index) => (
                      <div
                        key={index}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50"
                      >
                        <div className="flex items-start space-x-4">
                          <Image
                            src={review.profile_photo_url || '/default-avatar.png'}
                            alt={review.author_name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full ring-2 ring-blue-500/20"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {review.author_name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 mb-3">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-gray-400 text-sm">
                                {formatDate(review.time)}
                              </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed line-clamp-4">
                              {review.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous reviews"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next reviews"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {Array.from({ length: getMaxSlides() }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to review group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

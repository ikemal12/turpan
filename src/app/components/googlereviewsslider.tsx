import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function GoogleReviewsSlider() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch("/api/google-reviews");
      const data = await res.json();
      setReviews(data.filteredReviews ?? []);
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % reviews.length;
    goToSlide(newIndex);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Main slideshow */}
      <div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-xl border border-gray-100"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review, idx) => (
            <div key={idx} className="w-full flex-shrink-0 p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-orange-400 mx-auto opacity-60" />
                </div>

                {/* Review text */}
                <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                  '{review.text}'
                </blockquote>

                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {renderStars(review.rating || 5)}
                </div>

                {/* Author info */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {review.author_name?.charAt(0) || "?"}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{review.author_name}</p>
                    <p className="text-sm text-gray-500">Google Review</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {reviews.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
                idx === currentIndex
                  ? "bg-orange-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {reviews.length > 1 && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            {isAutoPlaying ? "Auto-playing" : "Paused"} • {currentIndex + 1} of {reviews.length}
          </p>
        </div>
      )}
    </div>
  );
}
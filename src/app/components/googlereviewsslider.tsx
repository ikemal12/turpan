import { useEffect, useState } from "react";

export default function GoogleReviewsSlider() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch("/api/google-reviews");
      const data = await res.json();
      setReviews(data.reviews);
    }
    fetchReviews();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Render the reviews in a slider/carousel here */}
      {reviews.map((review, idx) => (
        <div key={idx} className="p-4 border rounded mb-4 bg-white">
          <p className="font-semibold">{review.author_name}</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}

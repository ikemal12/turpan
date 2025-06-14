import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Missing API key or Place ID' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=reviews,rating,user_ratings_total`
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error_message) {
      throw new Error(data.error_message);
    }

    const filteredReviews = data.result?.reviews?.filter(
      (review: any) => review.text && review.text.length > 10
    ) || [];

    return NextResponse.json({
      reviews: data.result?.reviews || [],
      filteredReviews: filteredReviews,
      rating: data.result?.rating,
      total_ratings: data.result?.user_ratings_total
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
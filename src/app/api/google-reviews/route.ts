import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const placeId = process.env.GOOGLE_PLACE_ID!;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.status }, { status: 500 });
    }

    const reviews = data.result.reviews || [];

    return NextResponse.json({ reviews });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

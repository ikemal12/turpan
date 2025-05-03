export async function fetchGoogleReviews(apiKey: string, placeId: string) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.result && data.result.reviews) {
      return data.result.reviews;
    }
    return [];
  }
  
export async function fetchGoogleReviews(apiKey: string, placeId: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
  );
  const data = await response.json();
  return data.result?.reviews || [];
}

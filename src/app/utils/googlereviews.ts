export async function fetchGoogleReviews() {
  try {
    const response = await fetch('/api/google-reviews');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.filteredReviews || data.reviews || [];
    
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    throw error;
  }
}
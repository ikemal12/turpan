let reviewsCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 60 * 1000;  

export async function fetchGoogleReviews() {
  try {
    if (reviewsCache && Date.now() - reviewsCache.timestamp < CACHE_DURATION) {
      return reviewsCache.data;
    }

    const response = await fetch('/api/google-reviews', {
      headers: {
        'Cache-Control': 'public, max-age=1800', 
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    const reviews = data.filteredReviews || data.reviews || [];

    reviewsCache = {
      data: reviews,
      timestamp: Date.now(),
    };
    
    return reviews;
    
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    
    if (reviewsCache) {
      console.warn('Using cached reviews due to fetch error');
      return reviewsCache.data;
    }
    
    throw error;
  }
}
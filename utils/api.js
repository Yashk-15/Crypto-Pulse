export async function getData(endpoint) {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
  const baseUrl = 'https://api.coingecko.com/api/v3';
  const url = `${baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}x_cg_demo_api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Utility function to handle API calls with automatic retries
export async function getDataWithRetry(endpoint, options = {}, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await getData(endpoint, options);
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain error types
      if (error.message.includes('Rate limit') ||
          error.message.includes('400') ||
          error.message.includes('404')) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}



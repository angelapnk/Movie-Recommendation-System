
/**
 * TMDB API handler
 * Provides functions to interact with The Movie Database API
 */

const API_BASE_URL = '/api'; // Proxied through our backend

/**
 * Fetch trending movies
 * @param {string} timeWindow - 'day' or 'week'
 * @returns {Promise<Array>} List of trending movies
 */
export async function fetchTrendingMovies(timeWindow = 'week') {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/trending?time_window=${timeWindow}`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

/**
 * Fetch movie details by ID
 * @param {number} movieId - The movie ID to fetch
 * @returns {Promise<Object>} Movie details
 */
export async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details for ID: ${movieId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}

/**
 * Search for movies
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise<Object>} Search results
 */
export async function searchMovies(query, page = 1) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [], total_pages: 0, total_results: 0 };
  }
}

/**
 * Fetch movies by genre
 * @param {number} genreId - Genre ID
 * @param {number} page - Page number for pagination
 * @returns {Promise<Object>} Movies in the specified genre
 */
export async function fetchMoviesByGenre(genreId, page = 1) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies/discover?with_genres=${genreId}&page=${page}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movies for genre ID: ${genreId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies for genre ID ${genreId}:`, error);
    return { results: [], total_pages: 0, total_results: 0 };
  }
}

/**
 * Get movie recommendations based on a movie ID
 * @param {number} movieId - The movie ID to get recommendations for
 * @returns {Promise<Array>} Recommended movies
 */
export async function fetchRecommendations(movieId) {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}/recommendations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations for movie ID: ${movieId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching recommendations for movie ID ${movieId}:`, error);
    return [];
  }
}

/**
 * Fetch all available genres
 * @returns {Promise<Array>} List of genres
 */
export async function fetchGenres() {
  try {
    const response = await fetch(`${API_BASE_URL}/genres`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}
/**
 * API client for The Movie Database (TMDB)
 */

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Fetch data from the TMDB API
 * @param {string} endpoint - API endpoint
 * @param {object} params - Additional query parameters
 * @returns {Promise} - Promise with the response data
 */
async function fetchFromApi(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Add API key and additional parameters
  url.searchParams.append('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
}

/**
 * Get trending movies
 * @param {string} timeWindow - Time window ('day' or 'week')
 * @returns {Promise} - Promise with trending movies
 */
export function getTrendingMovies(timeWindow = 'week') {
  return fetchFromApi(`/trending/movie/${timeWindow}`);
}

/**
 * Get popular movies
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with popular movies
 */
export function getPopularMovies(page = 1) {
  return fetchFromApi('/movie/popular', { page });
}

/**
 * Get movie details
 * @param {number} movieId - Movie ID
 * @returns {Promise} - Promise with movie details
 */
export function getMovieDetails(movieId) {
  return fetchFromApi(`/movie/${movieId}`, { 
    append_to_response: 'credits,videos,recommendations,similar'
  });
}

/**
 * Search for movies
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with search results
 */
export function searchMovies(query, page = 1) {
  return fetchFromApi('/search/movie', { query, page });
}

/**
 * Get movies by genre
 * @param {number} genreId - Genre ID
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with movies in the specified genre
 */
export function getMoviesByGenre(genreId, page = 1) {
  return fetchFromApi('/discover/movie', { 
    with_genres: genreId,
    page
  });
}

/**
 * Get movie genres
 * @returns {Promise} - Promise with movie genres
 */
export function getMovieGenres() {
  return fetchFromApi('/genre/movie/list');
}

/**
 * Get movie recommendations
 * @param {number} movieId - Movie ID
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise with movie recommendations
 */
export function getMovieRecommendations(movieId, page = 1) {
  return fetchFromApi(`/movie/${movieId}/recommendations`, { page });
}

export default {
  getTrendingMovies,
  getPopularMovies,
  getMovieDetails,
  searchMovies,
  getMoviesByGenre,
  getMovieGenres,
  getMovieRecommendations
};

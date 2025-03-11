
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

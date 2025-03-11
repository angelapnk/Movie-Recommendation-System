
/**
 * Unit tests for movie recommendation functionality
 */

// Mock fetch API
global.fetch = jest.fn();

// Import the recommendation functions to test
import { fetchRecommendations } from '../../client/src/api/tmdb-api';

describe('Movie Recommendation Functions', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('fetchRecommendations should return recommendations when API call is successful', async () => {
    // Mock data
    const mockRecommendations = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' }
    ];
    
    // Mock successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecommendations
    });
    
    // Call the function
    const result = await fetchRecommendations(123);
    
    // Assert fetch was called with the right parameters
    expect(fetch).toHaveBeenCalledWith('/api/movies/123/recommendations');
    
    // Assert the result is as expected
    expect(result).toEqual(mockRecommendations);
  });

  test('fetchRecommendations should return empty array when API call fails', async () => {
    // Mock failed response
    global.fetch.mockResolvedValueOnce({
      ok: false
    });
    
    // Call the function
    const result = await fetchRecommendations(123);
    
    // Assert fetch was called with the right parameters
    expect(fetch).toHaveBeenCalledWith('/api/movies/123/recommendations');
    
    // Assert the result is an empty array
    expect(result).toEqual([]);
  });
});

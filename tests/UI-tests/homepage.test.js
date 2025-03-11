
/**
 * UI tests for the homepage
 */

// Import test utilities
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import the component to test
import Home from '../../client/src/pages/Home';

// Mock API functions
jest.mock('../../client/src/api/tmdb-api', () => ({
  fetchTrendingMovies: jest.fn().mockResolvedValue([
    { 
      id: 1, 
      title: 'Test Movie 1', 
      poster_path: '/test1.jpg',
      vote_average: 8.5
    },
    { 
      id: 2, 
      title: 'Test Movie 2', 
      poster_path: '/test2.jpg',
      vote_average: 7.2
    }
  ]),
  fetchGenres: jest.fn().mockResolvedValue([
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' }
  ])
}));

describe('Homepage UI Tests', () => {
  test('renders trending movies section', async () => {
    render(<Home />);
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(screen.getByText('Trending Movies')).toBeInTheDocument();
    });
    
    // Check if movie cards are rendered
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });
  
  test('allows filtering by genre', async () => {
    render(<Home />);
    
    // Wait for genres to load
    await waitFor(() => {
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
    
    // Click on a genre filter
    userEvent.click(screen.getByText('Action'));
    
    // Verify the filter was applied (this would typically change the API call)
    expect(screen.getByText('Action').closest('button')).toHaveClass('selected');
  });
  
  test('navigates to movie details when clicking a movie', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }));
    
    render(<Home />);
    
    // Wait for movies to load
    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    });
    
    // Click on a movie
    userEvent.click(screen.getByText('Test Movie 1'));
    
    // Verify navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });
});

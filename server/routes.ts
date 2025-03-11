import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { ZodError } from "zod";
import fetch from "node-fetch";

// Environment variable for TMDB API key
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Helper function to validate request parameters
function validateRequest(schema: z.ZodType<any, any>, data: any): { success: boolean; error?: string; data?: any } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(", ") };
    }
    return { success: false, error: "Invalid request data" };
  }
}

// Helper function for API calls to TMDB
async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...params
  });
  
  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from TMDB: ${error}`);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  const httpServer = createServer(app);

  // 1. Trending Movies API
  app.get("/api/movies/trending", async (req: Request, res: Response) => {
    try {
      const data = await fetchFromTMDB("/trending/movie/day");
      
      // Transform data to match our schema
      const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        genres: movie.genre_ids?.map((id: number) => ({ id })) || []
      }));
      
      res.json(movies);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      res.status(500).json({ message: "Failed to fetch trending movies" });
    }
  });

  // 2. Movie Details API
  app.get("/api/movies/:id", async (req: Request, res: Response) => {
    try {
      const movieId = req.params.id;
      
      // Fetch movie details with credits included
      const movieData = await fetchFromTMDB(`/movie/${movieId}`, {
        append_to_response: "credits"
      });
      
      // Find director from crew
      const director = movieData.credits?.crew?.find((person: any) => 
        person.job.toLowerCase() === "director"
      );
      
      // Transform data to match our schema
      const movie = {
        id: movieData.id,
        title: movieData.title,
        posterPath: movieData.poster_path,
        backdropPath: movieData.backdrop_path,
        overview: movieData.overview,
        releaseDate: movieData.release_date || "",
        voteAverage: movieData.vote_average,
        voteCount: movieData.vote_count,
        adult: movieData.adult,
        originalLanguage: movieData.original_language,
        popularity: movieData.popularity,
        runtime: movieData.runtime,
        genres: movieData.genres || [],
        status: movieData.status,
        tagline: movieData.tagline,
        budget: movieData.budget,
        revenue: movieData.revenue,
        
        // Credits
        credits: {
          cast: movieData.credits?.cast?.slice(0, 10).map((person: any) => ({
            id: person.id,
            name: person.name,
            character: person.character,
            profilePath: person.profile_path,
            order: person.order
          })) || []
        },
        
        // Director
        director: director ? {
          id: director.id,
          name: director.name,
          profilePath: director.profile_path
        } : undefined
      };
      
      res.json(movie);
    } catch (error) {
      console.error(`Error fetching movie details (ID: ${req.params.id}):`, error);
      res.status(500).json({ message: "Failed to fetch movie details" });
    }
  });

  // 3. Similar Movies API
  app.get("/api/movies/:id/similar", async (req: Request, res: Response) => {
    try {
      const movieId = req.params.id;
      const data = await fetchFromTMDB(`/movie/${movieId}/similar`);
      
      // Transform data to match our schema
      const movies = data.results.slice(0, 8).map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        genres: movie.genre_ids?.map((id: number) => ({ id })) || []
      }));
      
      res.json(movies);
    } catch (error) {
      console.error(`Error fetching similar movies (ID: ${req.params.id}):`, error);
      res.status(500).json({ message: "Failed to fetch similar movies" });
    }
  });

  // 4. Genres API
  app.get("/api/genres", async (req: Request, res: Response) => {
    try {
      // Check if we have genres cached
      const cachedGenres = await storage.getAllGenres();
      
      if (cachedGenres.length > 0) {
        return res.json(cachedGenres);
      }
      
      // If not cached, fetch from TMDB
      const data = await fetchFromTMDB("/genre/movie/list");
      
      // Save genres to our storage
      for (const genre of data.genres) {
        await storage.createGenre({ id: genre.id, name: genre.name });
      }
      
      res.json(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      res.status(500).json({ message: "Failed to fetch genres" });
    }
  });

  // 5. Movies by Genre API
  app.get("/api/genres/:id/movies", async (req: Request, res: Response) => {
    try {
      const genreId = req.params.id;
      const page = req.query.page || "1";
      const sortBy = req.query.sortBy || "popularity.desc";
      const year = req.query.year;
      
      let params: Record<string, string> = {
        with_genres: genreId,
        sort_by: sortBy as string,
        page: page as string
      };
      
      if (year) {
        params.primary_release_year = year as string;
      }
      
      const data = await fetchFromTMDB("/discover/movie", params);
      
      // Transform data to match our schema
      const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        genres: movie.genre_ids?.map((id: number) => ({ id })) || []
      }));
      
      res.json(movies);
    } catch (error) {
      console.error(`Error fetching movies by genre (ID: ${req.params.id}):`, error);
      res.status(500).json({ message: "Failed to fetch movies by genre" });
    }
  });

  // 6. Discover Movies API
  app.get("/api/movies/discover", async (req: Request, res: Response) => {
    try {
      const page = req.query.page || "1";
      const sortBy = req.query.sortBy || "popularity.desc";
      const year = req.query.year;
      
      let params: Record<string, string> = {
        sort_by: sortBy as string,
        page: page as string
      };
      
      if (year) {
        params.primary_release_year = year as string;
      }
      
      const data = await fetchFromTMDB("/discover/movie", params);
      
      // Transform data to match our schema
      const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        genres: movie.genre_ids?.map((id: number) => ({ id })) || []
      }));
      
      res.json(movies);
    } catch (error) {
      console.error("Error fetching discover movies:", error);
      res.status(500).json({ message: "Failed to fetch discover movies" });
    }
  });

  // 7. Search Movies API
  app.get("/api/search/movie", async (req: Request, res: Response) => {
    try {
      const query = req.query.query;
      const page = req.query.page || "1";
      const year = req.query.year;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      let params: Record<string, string> = {
        query: query as string,
        page: page as string
      };
      
      if (year && year !== 'all') {
        params.year = year as string;
      }
      
      const data = await fetchFromTMDB("/search/movie", params);
      
      // Transform data to match our schema
      const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        genres: movie.genre_ids?.map((id: number) => ({ id })) || []
      }));
      
      res.json(movies);
    } catch (error) {
      console.error(`Error searching movies (query: ${req.query.query}):`, error);
      res.status(500).json({ message: "Failed to search movies" });
    }
  });

  // 8. Multiple Movie Details API (for watchlist)
  app.get("/api/movies/details", async (req: Request, res: Response) => {
    try {
      const idsParam = req.query.ids as string;
      
      if (!idsParam) {
        return res.status(400).json({ message: "Movie IDs are required" });
      }
      
      const ids = idsParam.split(',').map(id => id.trim());
      const movies = [];
      
      // Fetch details for each movie
      for (const id of ids) {
        try {
          const movieData = await fetchFromTMDB(`/movie/${id}`);
          
          movies.push({
            id: movieData.id,
            title: movieData.title,
            posterPath: movieData.poster_path,
            backdropPath: movieData.backdrop_path,
            overview: movieData.overview,
            releaseDate: movieData.release_date || "",
            voteAverage: movieData.vote_average,
            voteCount: movieData.vote_count,
            adult: movieData.adult,
            originalLanguage: movieData.original_language,
            popularity: movieData.popularity,
            genres: movieData.genres || []
          });
        } catch (error) {
          console.error(`Error fetching details for movie ID ${id}:`, error);
          // Continue with other movies even if one fails
        }
      }
      
      res.json(movies);
    } catch (error) {
      console.error("Error fetching multiple movie details:", error);
      res.status(500).json({ message: "Failed to fetch movie details" });
    }
  });

  // 9. Recommendations API
  app.post("/api/recommendations", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        genre: z.string().optional(),
        mood: z.string().optional(),
        releaseYearRange: z.string().optional(),
        includeAdult: z.boolean().default(false)
      });
      
      const validation = validateRequest(schema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ message: validation.error });
      }
      
      const { genre, mood, releaseYearRange, includeAdult } = validation.data;
      
      // Build discover params based on preferences
      let params: Record<string, string> = {
        sort_by: "popularity.desc",
        include_adult: includeAdult.toString()
      };
      
      // Add genre filter
      if (genre) {
        params.with_genres = genre;
      }
      
      // Add release year filter
      if (releaseYearRange) {
        switch(releaseYearRange) {
          case 'new':
            const currentYear = new Date().getFullYear();
            params.primary_release_date_gte = `${currentYear - 5}-01-01`;
            break;
          case '2010s':
            params.primary_release_date_gte = '2010-01-01';
            params.primary_release_date_lte = '2019-12-31';
            break;
          case '2000s':
            params.primary_release_date_gte = '2000-01-01';
            params.primary_release_date_lte = '2009-12-31';
            break;
          case '1990s':
            params.primary_release_date_gte = '1990-01-01';
            params.primary_release_date_lte = '1999-12-31';
            break;
          case 'classic':
            params.primary_release_date_lte = '1989-12-31';
            break;
        }
      }
      
      // Add mood-based keyword filters
      if (mood) {
        // Different vote_average minimum based on mood
        switch(mood) {
          case 'happy':
            params.with_keywords = '9715|1701|950'; // comedy, funny, feel-good
            break;
          case 'sad':
            params.with_keywords = '1721|9748|9713'; // drama, emotional, tearjerker
            break;
          case 'excited':
            params.with_keywords = '9882|9675|9748'; // action, suspense, thriller
            break;
          case 'thoughtful':
            params.with_keywords = '818|3801|10112'; // philosophy, thought-provoking, meaningful
            break;
          case 'relaxed':
            params.with_keywords = '9889|818|4495'; // gentle, calm, documentary
            break;
        }
      }
      
      // Get recommendations
      const data = await fetchFromTMDB("/discover/movie", params);
      
      // Transform and return results
      const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        genres: movie.genre_ids?.map((id: number) => ({ id })) || []
      }));
      
      res.json(movies);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  return httpServer;
}

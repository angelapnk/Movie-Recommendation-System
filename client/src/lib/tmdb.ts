import { Movie, Genre, MovieCredits, Person } from "@shared/schema";

// TMDB base URL and endpoints
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// API Key is handled server-side for security
// In a real implementation, these methods would be called via the backend

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  runtime?: number;
  genres?: TMDBGenre[];
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  credits?: TMDBCredits;
}

interface TMDBCredits {
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface TMDBGenre {
  id: number;
  name: string;
}

// Convert TMDB movie format to our schema
export const convertTMDBMovie = (tmdbMovie: TMDBMovie): Movie => {
  // Find the director in the crew if credits are available
  let director: Person | undefined = undefined;
  if (tmdbMovie.credits?.crew) {
    const directorData = tmdbMovie.credits.crew.find(
      (member) => member.job.toLowerCase() === "director"
    );
    if (directorData) {
      director = {
        id: directorData.id,
        name: directorData.name,
        profilePath: directorData.profile_path,
      };
    }
  }

  // Convert credits if available
  let credits: MovieCredits | undefined = undefined;
  if (tmdbMovie.credits) {
    credits = {
      cast: tmdbMovie.credits.cast.map((member) => ({
        id: member.id,
        name: member.name,
        character: member.character,
        profilePath: member.profile_path,
        order: member.order,
      })),
    };
  }

  // Convert genres - either from genre_ids (list response) or genres object (detail response)
  let genres: Genre[] | undefined = undefined;
  if (tmdbMovie.genres) {
    genres = tmdbMovie.genres.map((g) => ({
      id: g.id,
      name: g.name,
    }));
  }

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    posterPath: tmdbMovie.poster_path,
    backdropPath: tmdbMovie.backdrop_path,
    overview: tmdbMovie.overview,
    releaseDate: tmdbMovie.release_date,
    voteAverage: tmdbMovie.vote_average,
    voteCount: tmdbMovie.vote_count,
    adult: tmdbMovie.adult,
    originalLanguage: tmdbMovie.original_language,
    popularity: tmdbMovie.popularity,
    runtime: tmdbMovie.runtime,
    genres,
    director,
    credits,
    status: tmdbMovie.status,
    tagline: tmdbMovie.tagline,
    budget: tmdbMovie.budget,
    revenue: tmdbMovie.revenue,
  };
};

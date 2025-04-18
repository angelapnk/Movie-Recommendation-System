import { 
  genres, Genre, InsertGenre,
  movies, Movie, InsertMovie,
  users, User, InsertUser 
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserWatchlist(userId: number, movieIds: number[]): Promise<User | undefined>;

  // Genre operations
  getGenre(id: number): Promise<Genre | undefined>;
  getAllGenres(): Promise<Genre[]>;
  createGenre(genre: InsertGenre): Promise<Genre>;

  // Movie operations
  getMovie(id: number): Promise<Movie | undefined>;
  getMoviesByGenre(genreId: number): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  searchMovies(query: string): Promise<Movie[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private genres: Map<number, Genre>;
  private movies: Map<number, Movie>;
  private currentUserId: number;
  private currentMovieId: number;
  private currentGenreId: number;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.genres = new Map();
    this.movies = new Map();
    this.currentUserId = 1;
    this.currentMovieId = 1;
    this.currentGenreId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      watchlist: [],
      preferences: {}
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserWatchlist(userId: number, movieIds: number[]): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      watchlist: movieIds
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Genre operations
  async getGenre(id: number): Promise<Genre | undefined> {
    return this.genres.get(id);
  }

  async getAllGenres(): Promise<Genre[]> {
    return Array.from(this.genres.values());
  }

  async createGenre(insertGenre: InsertGenre): Promise<Genre> {
    const id = typeof insertGenre.id === 'number' ? insertGenre.id : this.currentGenreId++;
    const genre: Genre = { ...insertGenre, id };
    this.genres.set(id, genre);
    return genre;
  }

  // Movie operations
  async getMovie(id: number): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async getMoviesByGenre(genreId: number): Promise<Movie[]> {
    return Array.from(this.movies.values()).filter(movie => 
      movie.genres?.some(genre => genre.id === genreId)
    );
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = typeof insertMovie.tmdbId === 'number' ? insertMovie.tmdbId : this.currentMovieId++;
    const movie: Movie = {
      id,
      title: insertMovie.title,
      tmdbId: insertMovie.tmdbId,
      releaseDate: insertMovie.releaseDate,
      backdropPath: insertMovie.backdropPath || null,
      posterPath: insertMovie.posterPath || null,
      overview: insertMovie.overview || null,
      voteAverage: insertMovie.voteAverage || null,
      voteCount: insertMovie.voteCount || null,
      adult: insertMovie.adult || false,
      originalLanguage: insertMovie.originalLanguage || null,
      popularity: insertMovie.popularity || null,
      runtime: insertMovie.runtime || null,
      genres: insertMovie.genres || null,
      director: insertMovie.director || null,
      credits: insertMovie.credits || null,
      status: insertMovie.status || null,
      tagline: insertMovie.tagline || null,
      budget: insertMovie.budget || null,
      revenue: insertMovie.revenue || null,
      createdAt: new Date()
    };
    this.movies.set(id, movie);
    return movie;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.movies.values()).filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.overview?.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();

import { pgTable, text, serial, integer, boolean, json, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Genre schema
export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const insertGenreSchema = createInsertSchema(genres);
export type InsertGenre = z.infer<typeof insertGenreSchema>;
export type Genre = typeof genres.$inferSelect;

// Person schema (actors, directors, etc.)
export const persons = pgTable("persons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  profilePath: text("profile_path"),
  bio: text("bio"),
});

export const insertPersonSchema = createInsertSchema(persons);
export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type Person = typeof persons.$inferSelect;

// MovieCredits schema
export interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
    order: number;
  }[];
}

// Movie schema
export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  posterPath: text("poster_path"),
  backdropPath: text("backdrop_path"),
  overview: text("overview"),
  releaseDate: text("release_date").notNull(),
  voteAverage: real("vote_average"),
  voteCount: integer("vote_count"),
  adult: boolean("adult").default(false),
  originalLanguage: text("original_language"),
  popularity: real("popularity"),
  runtime: integer("runtime"),
  genres: json("genres").$type<Genre[]>(),
  director: json("director").$type<Person>(),
  credits: json("credits").$type<MovieCredits>(),
  status: text("status"),
  tagline: text("tagline"),
  budget: integer("budget"),
  revenue: integer("revenue"),
  tmdbId: integer("tmdb_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
  createdAt: true,
});

export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type Movie = typeof movies.$inferSelect;

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  watchlist: json("watchlist").$type<number[]>().default([]),
  preferences: json("preferences").$type<{
    favoriteGenres?: number[];
    favoriteMovies?: number[];
  }>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

import { Movie } from "@shared/schema";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  width?: "default" | "small";
  showTrailerButton?: boolean;
  onTrailerClick?: (movieId: number) => void;
}

export function MovieCard({ 
  movie, 
  width = "default", 
  showTrailerButton = true,
  onTrailerClick
}: MovieCardProps) {
  const imageSize = width === "default" ? "w-44 md:w-56" : "w-full";
  const posterPath = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image+Available';

  return (
    <Card className={`movie-card flex-shrink-0 ${imageSize} bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group`}>
      <div className="relative">
        <img 
          src={posterPath}
          alt={`${movie.title} poster`}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-secondary text-dark font-mono text-sm font-bold px-2 py-1 rounded">
          {movie.voteAverage?.toFixed(1) || 'N/A'}
        </div>
        {showTrailerButton && (
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity flex items-end justify-center">
            <button 
              className="mb-4 bg-primary text-white rounded-full py-2 px-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onTrailerClick) onTrailerClick(movie.id);
              }}
            >
              <PlayCircle className="mr-2 h-4 w-4" /> Watch Trailer
            </button>
          </div>
        )}
      </div>
      <Link href={`/movie/${movie.id}`}>
        <CardContent className="p-3 cursor-pointer">
          <h3 className="font-heading font-bold text-gray-900 dark:text-white truncate">{movie.title}</h3>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span className="mx-1">•</span>
            <span>{movie.genres?.[0]?.name || 'Unknown'}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

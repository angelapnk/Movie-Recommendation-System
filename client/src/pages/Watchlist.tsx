import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MovieCard } from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Bookmark, X } from "lucide-react";
import { Link } from "wouter";
import { Movie } from "@shared/schema";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useLocalStorage<number[]>('watchlist', []);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch movie details for each watchlist item
  const { data: allWatchlistMovies, isLoading: isFetching } = useQuery({
    queryKey: ['/api/movies/details', { ids: watchlist.join(',') }],
    enabled: watchlist.length > 0,
  });

  useEffect(() => {
    if (allWatchlistMovies) {
      setWatchlistMovies(allWatchlistMovies);
      setIsLoading(false);
    } else if (watchlist.length === 0) {
      setWatchlistMovies([]);
      setIsLoading(false);
    }
  }, [allWatchlistMovies, watchlist]);

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(watchlist.filter(id => id !== movieId));
    setWatchlistMovies(watchlistMovies.filter(movie => movie.id !== movieId));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    setWatchlistMovies([]);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Your Watchlist</h1>
        
        {watchlist.length > 0 && (
          <Button 
            variant="outline" 
            className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={clearWatchlist}
          >
            <X className="mr-2 h-4 w-4" /> Clear Watchlist
          </Button>
        )}
      </div>
      
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: Math.min(watchlist.length || 4, 10) }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-64 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : watchlistMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlistMovies.map(movie => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} showTrailerButton={false} />
              <button
                className="absolute top-2 left-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFromWatchlist(movie.id)}
                title="Remove from watchlist"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Bookmark className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Your watchlist is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Start adding movies to your watchlist to keep track of what you want to watch later.
          </p>
          <Link href="/categories">
            <Button className="bg-primary hover:bg-red-700 text-white">
              Browse Movies
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

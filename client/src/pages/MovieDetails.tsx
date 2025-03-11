import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, Bookmark, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MovieSlider from "@/components/layout/MovieSlider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Movie } from "@shared/schema";

export default function MovieDetails() {
  const [, params] = useRoute('/movie/:id');
  const movieId = params?.id;
  const { toast } = useToast();
  
  const [watchlist, setWatchlist] = useLocalStorage<number[]>('watchlist', []);
  
  const isInWatchlist = watchlist.includes(Number(movieId));
  
  // Fetch movie details
  const { data: movie, isLoading } = useQuery({
    queryKey: [`/api/movies/${movieId}`],
  });
  
  // Fetch similar movies
  const { data: similarMovies, isLoading: isLoadingSimilar } = useQuery({
    queryKey: [`/api/movies/${movieId}/similar`],
  });

  const handleWatchTrailer = () => {
    toast({
      title: "Loading trailer",
      description: "Trailer functionality is not fully implemented yet.",
    });
  };

  const toggleWatchlist = () => {
    const id = Number(movieId);
    
    if (isInWatchlist) {
      setWatchlist(watchlist.filter(item => item !== id));
      toast({
        title: "Removed from watchlist",
        description: `${movie?.title} has been removed from your watchlist.`,
      });
    } else {
      setWatchlist([...watchlist, id]);
      toast({
        title: "Added to watchlist",
        description: `${movie?.title} has been added to your watchlist.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 lg:w-1/4">
              <Skeleton className="w-full h-96" />
            </div>
            <div className="md:w-2/3 lg:w-3/4 p-6 lg:p-8">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-4 w-1/4 mb-6" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-6 w-1/3 mb-2" />
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <p>Sorry, we couldn't find the movie you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Movie Poster */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="relative h-full">
              <img 
                src={movie.posterPath 
                  ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` 
                  : 'https://via.placeholder.com/500x750?text=No+Image+Available'
                } 
                alt={`${movie.title} poster`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-secondary text-dark font-mono text-lg font-bold px-3 py-1 rounded-lg flex items-center">
                <Star className="mr-1 h-4 w-4" /> {movie.voteAverage?.toFixed(1) || 'N/A'}
              </div>
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="md:w-2/3 lg:w-3/4 p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="font-heading text-2xl lg:text-3xl font-bold">{movie.title}</h3>
              <div className="flex mt-2 md:mt-0">
                <Button 
                  className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors mr-2 flex items-center"
                  onClick={handleWatchTrailer}
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> Watch Trailer
                </Button>
                <Button 
                  variant="outline"
                  className={`${isInWatchlist ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center`}
                  onClick={toggleWatchlist}
                >
                  <Bookmark className="mr-2 h-4 w-4" fill={isInWatchlist ? "currentColor" : "none"} /> {isInWatchlist ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="mr-4">{new Date(movie.releaseDate).getFullYear()}</span>
              {movie.adult && <span className="mr-4">Adult</span>}
              <span className="mr-4">{movie.runtime ? `${movie.runtime} min` : 'Unknown runtime'}</span>
              <span>{movie.originalLanguage?.toUpperCase() || 'Unknown language'}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {movie.overview || 'No overview available.'}
            </p>
            
            {movie.credits && (
              <div className="mb-6">
                <h4 className="font-heading font-bold text-lg mb-2">Cast & Crew</h4>
                <div className="flex flex-wrap gap-4">
                  {movie.credits.cast?.slice(0, 5).map(person => (
                    <div key={person.id} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-300 mr-2 overflow-hidden">
                        {person.profilePath ? (
                          <img 
                            src={`https://image.tmdb.org/t/p/w200${person.profilePath}`} 
                            alt={person.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-700">
                            {person.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{person.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {movie.director && (
              <div>
                <h4 className="font-heading font-bold text-lg mb-2">Director</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-2 overflow-hidden">
                    {movie.director.profilePath ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w200${movie.director.profilePath}`} 
                        alt={movie.director.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        {movie.director.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="font-medium text-sm">{movie.director.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Similar Movies */}
      <MovieSlider 
        title="Similar Movies You Might Like" 
        movies={similarMovies || []} 
        isLoading={isLoadingSimilar}
      />
    </div>
  );
}

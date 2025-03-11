import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { MovieCard } from "@/components/MovieCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Shuffle, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Categories() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Extract query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const genreIdParam = searchParams.get('genre');
  
  // State for filters
  const [selectedGenre, setSelectedGenre] = useState<string | null>(genreIdParam);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [releaseYear, setReleaseYear] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Fetch genres
  const { data: genres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ['/api/genres'],
  });
  
  // Fetch movies by genre or discover if no genre is selected
  const { data: movies, isLoading: isLoadingMovies } = useQuery({
    queryKey: [
      selectedGenre ? `/api/genres/${selectedGenre}/movies` : '/api/movies/discover',
      { sortBy, year: releaseYear !== 'all' ? releaseYear : undefined }
    ],
  });

  // Update URL when genre changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedGenre) {
      params.set('genre', selectedGenre);
    }
    if (sortBy !== 'popularity.desc') {
      params.set('sort', sortBy);
    }
    if (releaseYear !== 'all') {
      params.set('year', releaseYear);
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    window.history.replaceState(null, '', `/categories${newUrl}`);
  }, [selectedGenre, sortBy, releaseYear]);

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const handleRandomMovie = () => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];
      navigate(`/movie/${randomMovie.id}`);
    } else {
      toast({
        title: "No movies available",
        description: "Unable to find a random movie at this time.",
        variant: "destructive"
      });
    }
  };

  const clearFilters = () => {
    setSelectedGenre(null);
    setSortBy("popularity.desc");
    setReleaseYear("all");
    navigate("/categories");
  };

  // Get current year for year filter options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Get the selected genre name
  const selectedGenreName = genres?.find(g => g.id.toString() === selectedGenre)?.name;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">
          {selectedGenreName ? `${selectedGenreName} Movies` : "Browse Movies"}
        </h1>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleRandomMovie}
          >
            <Shuffle className="mr-2 h-4 w-4" /> Random
          </Button>
          
          <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Movies</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity.desc">Popularity (High to Low)</SelectItem>
                      <SelectItem value="popularity.asc">Popularity (Low to High)</SelectItem>
                      <SelectItem value="vote_average.desc">Rating (High to Low)</SelectItem>
                      <SelectItem value="vote_average.asc">Rating (Low to High)</SelectItem>
                      <SelectItem value="release_date.desc">Release Date (Newest)</SelectItem>
                      <SelectItem value="release_date.asc">Release Date (Oldest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Release Year</label>
                  <Select
                    value={releaseYear}
                    onValueChange={setReleaseYear}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {yearOptions.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                  >
                    <X className="mr-2 h-4 w-4" /> Clear Filters
                  </Button>
                  <Button
                    onClick={() => setFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Display genres if no genre is selected */}
      {!selectedGenre && (
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold mb-6">Movie Genres</h2>
          {isLoadingGenres ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="aspect-video rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {genres?.map(genre => (
                <div key={genre.id} onClick={() => handleGenreSelect(genre.id.toString())}>
                  <CategoryCard genre={genre} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Display movies */}
      <div>
        <h2 className="font-heading text-2xl font-bold mb-6">
          {selectedGenre ? `${selectedGenreName} Movies` : "Popular Movies"}
        </h2>
        
        {isLoadingMovies ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-full h-64 mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : movies?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                showTrailerButton={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">No movies found matching your criteria.</p>
            <Button 
              className="mt-4"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { MovieCard } from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function SearchResults() {
  const [location] = useLocation();
  
  // Extract search query
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q') || '';
  
  // State for filters
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [releaseYear, setReleaseYear] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Fetch search results
  const { data: searchResults, isLoading } = useQuery({
    queryKey: [
      '/api/search/movie', 
      { query, sortBy, year: releaseYear !== 'all' ? releaseYear : undefined }
    ],
    enabled: query.length > 0,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('q', query);
    
    if (sortBy !== 'popularity.desc') {
      params.set('sort', sortBy);
    }
    
    if (releaseYear !== 'all') {
      params.set('year', releaseYear);
    }
    
    window.history.replaceState(null, '', `/search?${params.toString()}`);
  }, [query, sortBy, releaseYear]);

  const clearFilters = () => {
    setSortBy("popularity.desc");
    setReleaseYear("all");
  };

  // Get current year for year filter options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Search Results</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {searchResults?.length || 0} results for "{query}"
          </p>
        </div>
        
        <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center self-end">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter Results
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Search Results</DialogTitle>
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
                <Button onClick={() => setFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-64 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : searchResults?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {searchResults.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              showTrailerButton={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            We couldn't find any movies matching "{query}". Try adjusting your search or exploring our categories.
          </p>
          <Button 
            className="bg-primary hover:bg-red-700 text-white"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}

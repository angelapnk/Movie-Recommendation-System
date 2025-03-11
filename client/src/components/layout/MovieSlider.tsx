import { useRef } from "react";
import { Movie } from "@shared/schema";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface MovieSliderProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  viewAllLink?: string;
}

export default function MovieSlider({ 
  title, 
  movies, 
  isLoading = false, 
  viewAllLink 
}: MovieSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollMovies = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = direction === 'right' ? 300 : -300;
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleTrailerClick = (movieId: number) => {
    toast({
      title: "Fetching trailer",
      description: `Loading trailer for movie ID: ${movieId}`,
    });
    // In a real implementation, we would fetch and display the trailer
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-primary dark:text-secondary font-medium flex items-center hover:underline">
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
        
        <div className="relative">
          {/* Left Arrow */}
          <Button 
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:flex"
            onClick={() => scrollMovies('left')}
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
          
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {isLoading ? (
              // Render skeleton loaders while fetching
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-44 md:w-56">
                  <Skeleton className="h-64 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : (
              // Render actual movie cards
              movies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onTrailerClick={handleTrailerClick} 
                />
              ))
            )}
          </div>
          
          {/* Right Arrow */}
          <Button 
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:flex"
            onClick={() => scrollMovies('right')}
          >
            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Movie } from "@shared/schema";
import { MovieCard } from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MovieGridProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  viewAllLink?: string;
  columns?: 'two' | 'three' | 'four';
}

export default function MovieGrid({ 
  title, 
  movies, 
  isLoading = false, 
  viewAllLink,
  columns = 'four'
}: MovieGridProps) {
  const { toast } = useToast();

  const handleTrailerClick = (movieId: number) => {
    toast({
      title: "Fetching trailer",
      description: `Loading trailer for movie ID: ${movieId}`,
    });
    // In a real implementation, we would fetch and display the trailer
  };

  // Determine grid columns class based on the columns prop
  const getGridClass = () => {
    switch(columns) {
      case 'two': return 'grid-cols-1 sm:grid-cols-2';
      case 'three': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 'four': 
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
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
        
        <div className={`grid ${getGridClass()} gap-6`}>
          {isLoading ? (
            // Render skeleton loaders while fetching
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <Skeleton className="aspect-[2/3] w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))
          ) : (
            // Render actual movie cards
            movies.slice(0, 8).map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onTrailerClick={handleTrailerClick}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
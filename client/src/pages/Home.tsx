import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Film, Wand2, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MovieSlider from "@/components/layout/MovieSlider";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryCard } from "@/components/CategoryCard";

export default function Home() {
  const { toast } = useToast();
  
  // Fetch trending movies
  const { data: trendingMovies, isLoading: isLoadingTrending } = useQuery({
    queryKey: ['/api/movies/trending'],
  });

  // Fetch genre categories
  const { data: genres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ['/api/genres'],
  });

  const handleRandomMovie = () => {
    if (trendingMovies && trendingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      const randomMovie = trendingMovies[randomIndex];
      window.location.href = `/movie/${randomMovie.id}`;
    } else {
      toast({
        title: "No movies available",
        description: "Unable to find a random movie at this time.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Featured movie backdrop" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary text-white px-2 py-1 text-sm rounded mb-3">Featured</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              Find Your Next Favorite Movie!
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Discover personalized recommendations based on your taste and mood
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/recommendations">
                <Button size="lg" className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors">
                  <Wand2 className="mr-2 h-4 w-4" /> Get Recommendations
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-full font-bold transition-colors backdrop-blur-sm border-0"
                onClick={handleRandomMovie}
              >
                <Shuffle className="mr-2 h-4 w-4" /> Random Movie
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies Section */}
      <MovieSlider 
        title="Trending Movies" 
        movies={trendingMovies || []} 
        isLoading={isLoadingTrending}
        viewAllLink="/categories"
      />

      {/* Categories Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Browse by Categories</h2>
          
          {isLoadingGenres ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="aspect-video w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {genres?.map(genre => (
                <CategoryCard key={genre.id} genre={genre} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-full font-bold transition-colors mx-auto"
              onClick={handleRandomMovie}
            >
              <Shuffle className="mr-2 h-4 w-4" /> Random Movie Suggestion
            </Button>
          </div>
        </div>
      </section>

      {/* Movie Recommender Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Personalized Recommendations</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Answer a few questions about your preferences and mood, and we'll suggest movies tailored just for you.
                </p>
                <Link href="/recommendations">
                  <Button size="lg" className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors self-start">
                    <Wand2 className="mr-2 h-4 w-4" /> Start Now
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 relative min-h-[200px] md:min-h-0">
                <img 
                  src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Movie recommendations" 
                  className="w-full h-full object-cover md:absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

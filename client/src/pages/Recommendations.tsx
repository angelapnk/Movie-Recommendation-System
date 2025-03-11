import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "@/components/MovieCard";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Define form schema
const recommendationFormSchema = z.object({
  genre: z.string().optional(),
  mood: z.string().optional(),
  releaseYearRange: z.string().optional(),
  includeAdult: z.boolean().default(false),
});

type RecommendationForm = z.infer<typeof recommendationFormSchema>;

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  // Fetch genres
  const { data: genres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ['/api/genres'],
  });

  // Form definition
  const form = useForm<RecommendationForm>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      genre: undefined,
      mood: undefined,
      releaseYearRange: undefined,
      includeAdult: false,
    },
  });

  const onSubmit = async (data: RecommendationForm) => {
    setIsGenerating(true);
    
    try {
      // Fetch recommendations based on form data
      const response = await apiRequest('POST', '/api/recommendations', data);
      const result = await response.json();
      
      setRecommendations(result);
      
      if (result.length === 0) {
        toast({
          title: "No recommendations found",
          description: "Try changing your preferences to get different recommendations.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Failed to get recommendations",
        description: "There was an error processing your request.",
        variant: "destructive"
      });
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Movie Recommendations</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us about your preferences, and we'll suggest movies just for you.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Genre Preference */}
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favorite Genre</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingGenres ? (
                            <SelectItem value="loading" disabled>Loading genres...</SelectItem>
                          ) : (
                            genres?.map(genre => (
                              <SelectItem key={genre.id} value={genre.id.toString()}>
                                {genre.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {/* Mood */}
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mood</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How do you feel?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="happy">Happy / Uplifting</SelectItem>
                          <SelectItem value="sad">Sad / Emotional</SelectItem>
                          <SelectItem value="excited">Excited / Thrilling</SelectItem>
                          <SelectItem value="thoughtful">Thoughtful / Reflective</SelectItem>
                          <SelectItem value="relaxed">Relaxed / Calm</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {/* Time Period */}
                <FormField
                  control={form.control}
                  name="releaseYearRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Period</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Movie era" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="new">Recent (Last 5 years)</SelectItem>
                          <SelectItem value="2010s">2010s</SelectItem>
                          <SelectItem value="2000s">2000s</SelectItem>
                          <SelectItem value="1990s">1990s</SelectItem>
                          <SelectItem value="classic">Classics (Before 1990)</SelectItem>
                          <SelectItem value="all">Any time period</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {/* Include Adult Content */}
                <FormField
                  control={form.control}
                  name="includeAdult"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Include adult content in recommendations
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-center mt-8">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
                  disabled={isGenerating}
                  size="lg"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  {isGenerating ? "Generating Recommendations..." : "Get Recommendations"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {isGenerating ? (
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6">Finding perfect movies for you...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full h-64 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : recommendations.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendations.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  showTrailerButton={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

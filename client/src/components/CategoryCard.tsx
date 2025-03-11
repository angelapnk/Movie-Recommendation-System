import { Genre } from "@shared/schema";
import { Link } from "wouter";

interface CategoryCardProps {
  genre: Genre;
}

export function CategoryCard({ genre }: CategoryCardProps) {
  // A selection of background gradient colors to use for different genres
  const gradients = [
    "from-blue-900 to-blue-700",
    "from-red-900 to-red-700",
    "from-green-900 to-green-700",
    "from-purple-900 to-purple-700",
    "from-yellow-800 to-yellow-600",
    "from-pink-900 to-pink-700",
    "from-indigo-900 to-indigo-700",
    "from-gray-900 to-gray-700",
  ];
  
  // Use the genre id to determine a consistent gradient for each genre
  const gradientIndex = genre.id % gradients.length;
  const gradientClass = gradients[gradientIndex];

  return (
    <Link href={`/categories?genre=${genre.id}`}>
      <div className="aspect-video relative rounded-lg overflow-hidden group cursor-pointer">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass}`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-heading font-bold text-white text-xl text-center">
            {genre.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

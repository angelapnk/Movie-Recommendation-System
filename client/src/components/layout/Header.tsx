import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Film, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const [location, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    } else {
      toast({
        title: "Search error",
        description: "Please enter a search term",
        variant: "destructive"
      });
    }
  };



  useEffect(() => {
    // Clean up the query after navigation
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Film className="h-8 w-8 text-primary mr-2" />
              <span className="font-heading font-bold text-2xl">MovieMatcher</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-10">
              <Link href="/">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors",
                  location === "/" && "text-primary"
                )}>
                  Home
                </a>
              </Link>
              <Link href="/categories">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors",
                  location === "/categories" && "text-primary"
                )}>
                  Categories
                </a>
              </Link>
              <Link href="/recommendations">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors",
                  location === "/recommendations" && "text-primary"
                )}>
                  Recommendations
                </a>
              </Link>
              <Link href="/watchlist">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors",
                  location === "/watchlist" && "text-primary"
                )}>
                  Watchlist
                </a>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="relative mr-4 hidden md:block">
              <Input
                type="text"
                placeholder="Search movies..."
                className="w-64 py-2 px-4 rounded-full bg-gray-light focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <Search className="h-4 w-4 text-gray-500" />
              </Button>
            </form>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login / Register
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-4 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="pb-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search movies..."
              className="w-full py-2 px-4 rounded-full bg-gray-light focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              <Search className="h-4 w-4 text-gray-500" />
            </Button>
          </form>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md pb-4 px-4 transition-all duration-200`}>
        <Link href="/">
          <a className="block py-2 font-medium hover:text-primary">
            Home
          </a>
        </Link>
        <Link href="/categories">
          <a className="block py-2 font-medium hover:text-primary">
            Categories
          </a>
        </Link>
        <Link href="/recommendations">
          <a className="block py-2 font-medium hover:text-primary">
            Recommendations
          </a>
        </Link>
        <Link href="/watchlist">
          <a className="block py-2 font-medium hover:text-primary">
            Watchlist
          </a>
        </Link>
        <hr className="my-2 border-gray-200" />
        <button 
          className="flex items-center py-2 font-medium hover:text-primary w-full"
          onClick={() => navigate("/login")}
        >
          <User className="mr-2 h-4 w-4" /> Login / Register
        </button>
      </div>
    </header>
  );
}

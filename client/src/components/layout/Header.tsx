import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Film, Moon, Sun, Search, Menu, X, User } from "lucide-react";
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
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  useEffect(() => {
    // Clean up the query after navigation
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 bg-white dark:bg-dark shadow-md z-50 transition-colors duration-200">
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
                  "mx-3 font-medium hover:text-primary dark:hover:text-secondary transition-colors",
                  location === "/" && "text-primary dark:text-secondary"
                )}>
                  Home
                </a>
              </Link>
              <Link href="/categories">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary dark:hover:text-secondary transition-colors",
                  location === "/categories" && "text-primary dark:text-secondary"
                )}>
                  Categories
                </a>
              </Link>
              <Link href="/recommendations">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary dark:hover:text-secondary transition-colors",
                  location === "/recommendations" && "text-primary dark:text-secondary"
                )}>
                  Recommendations
                </a>
              </Link>
              <Link href="/watchlist">
                <a className={cn(
                  "mx-3 font-medium hover:text-primary dark:hover:text-secondary transition-colors",
                  location === "/watchlist" && "text-primary dark:text-secondary"
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
                className="w-64 py-2 px-4 rounded-full bg-gray-light dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </form>
            
            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-4"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-secondary" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
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
                <DropdownMenuItem onClick={() => 
                  toast({
                    title: "User authentication",
                    description: "Login feature is not implemented yet.",
                  })
                }>
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
              className="w-full py-2 px-4 rounded-full bg-gray-light dark:bg-gray-800 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          </form>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-dark shadow-md pb-4 px-4 transition-all duration-200`}>
        <Link href="/">
          <a className="block py-2 font-medium hover:text-primary dark:hover:text-secondary">
            Home
          </a>
        </Link>
        <Link href="/categories">
          <a className="block py-2 font-medium hover:text-primary dark:hover:text-secondary">
            Categories
          </a>
        </Link>
        <Link href="/recommendations">
          <a className="block py-2 font-medium hover:text-primary dark:hover:text-secondary">
            Recommendations
          </a>
        </Link>
        <Link href="/watchlist">
          <a className="block py-2 font-medium hover:text-primary dark:hover:text-secondary">
            Watchlist
          </a>
        </Link>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <button 
          className="flex items-center py-2 font-medium hover:text-primary dark:hover:text-secondary w-full"
          onClick={() => 
            toast({
              title: "User authentication",
              description: "Login feature is not implemented yet.",
            })
          }
        >
          <User className="mr-2 h-4 w-4" /> Login / Register
        </button>
      </div>
    </header>
  );
}

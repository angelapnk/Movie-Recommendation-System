
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Film, Search, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [location, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, logoutMutation } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query.trim());
      const searchParam = encodeURIComponent(query.trim());
      navigate(`/search?query=${searchParam}`);
      setQuery("");
    } else {
      toast({
        title: "Search error",
        description: "Please enter a search term",
        variant: "destructive"
      });
    }
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 bg-background border-b z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Film className="h-8 w-8 text-primary mr-2" />
                <div className="font-heading font-bold text-2xl text-foreground">MovieMatchMaker</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-10 text-foreground">
              <Link href="/">
                <div className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors cursor-pointer",
                  location === "/" && "text-primary"
                )}>
                  Home
                </div>
              </Link>
              <Link href="/categories">
                <div className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors cursor-pointer",
                  location === "/categories" && "text-primary"
                )}>
                  Categories
                </div>
              </Link>
              <Link href="/recommendations">
                <div className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors cursor-pointer",
                  location === "/recommendations" && "text-primary"
                )}>
                  Recommendations
                </div>
              </Link>
              <Link href="/watchlist">
                <div className={cn(
                  "mx-3 font-medium hover:text-primary transition-colors cursor-pointer",
                  location === "/watchlist" && "text-primary"
                )}>
                  Watchlist
                </div>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="relative mr-4 hidden md:block">
              <Input
                type="text"
                placeholder="Search movies..."
                className="w-64 py-2 px-4 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </form>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user ? (
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem disabled>
                      <span className="font-medium">{user.username}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={() => navigate("/auth")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Login / Register</span>
                  </DropdownMenuItem>
                )}
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
              className="w-full py-2 px-4 rounded-full bg-muted focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </Button>
          </form>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-background border-t pb-4 px-4`}>
        <div onClick={() => navigate("/")} className="block py-2 font-medium hover:text-primary cursor-pointer">
          Home
        </div>
        <div onClick={() => navigate("/categories")} className="block py-2 font-medium hover:text-primary cursor-pointer">
          Categories
        </div>
        <div onClick={() => navigate("/recommendations")} className="block py-2 font-medium hover:text-primary cursor-pointer">
          Recommendations
        </div>
        <div onClick={() => navigate("/watchlist")} className="block py-2 font-medium hover:text-primary cursor-pointer">
          Watchlist
        </div>
        <hr className="my-2 border-border" />
        {user ? (
          <button 
            className="flex items-center py-2 font-medium hover:text-primary w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </button>
        ) : (
          <button 
            className="flex items-center py-2 font-medium hover:text-primary w-full"
            onClick={() => navigate("/auth")}
          >
            <User className="mr-2 h-4 w-4" /> Login / Register
          </button>
        )}
      </div>
    </header>
  );
}

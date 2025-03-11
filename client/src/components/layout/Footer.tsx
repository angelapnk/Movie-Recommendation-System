import { Link } from "wouter";
import { Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Film className="h-8 w-8 text-primary mr-2" />
              <span className="font-heading font-bold text-2xl">MovieMatcher</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Discover your next favorite movie with personalized recommendations based on your taste.
            </p>
            <div className="flex mt-6">
              <a href="#" className="mr-4 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="mr-4 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lg">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="mr-4 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/categories">
                    <a className="text-gray-400 hover:text-white transition-colors">Categories</a>
                  </Link>
                </li>
                <li>
                  <Link href="/recommendations">
                    <a className="text-gray-400 hover:text-white transition-colors">Recommendations</a>
                  </Link>
                </li>
                <li>
                  <Link href="/watchlist">
                    <a className="text-gray-400 hover:text-white transition-colors">Watchlist</a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Advertise</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MovieMatcher. All rights reserved. Movie data provided by TMDB.</p>
        </div>
      </div>
    </footer>
  );
}

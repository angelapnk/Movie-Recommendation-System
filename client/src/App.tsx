import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import Categories from "@/pages/Categories";
import Recommendations from "@/pages/Recommendations";
import Watchlist from "@/pages/Watchlist";
import SearchResults from "@/pages/SearchResults";
import AuthPage from "@/pages/auth-page";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/categories" component={Categories} />
          <Route path="/recommendations" component={Recommendations} />
          <ProtectedRoute path="/watchlist" component={Watchlist} />
          <Route path="/search" component={SearchResults} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

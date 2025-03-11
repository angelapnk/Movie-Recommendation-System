import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Redirect } from "wouter";
import { Film, User, Key } from "lucide-react";

// Schema for login
const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

// Schema for registration
const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values);
  };

  return (
    <div className="container flex flex-col lg:flex-row items-center justify-center min-h-[80vh] py-10 gap-8">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:pr-8">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to MovieMatcher</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <Input {...field} placeholder="Enter your username" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Key className="h-4 w-4 text-gray-500" />
                              <Input type="password" {...field} placeholder="Enter your password" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Register Tab */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Join us to get personalized movie recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <Input {...field} placeholder="Choose a username" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Key className="h-4 w-4 text-gray-500" />
                              <Input type="password" {...field} placeholder="Create a password" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating account..." : "Register"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="w-full lg:w-1/2 lg:border-l lg:pl-8 py-4">
        <div className="flex flex-col items-center text-center">
          <Film className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-2">MovieMatcher</h1>
          <h2 className="text-xl font-medium mb-4 text-gray-700">Your Personal Movie Recommendation Engine</h2>
          <p className="text-gray-600 max-w-md">
            Create an account to track your favorite movies, build a watchlist, and get personalized recommendations 
            based on your preferences and viewing history.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium">Trending Movies</h3>
              <p className="text-sm text-gray-600">Discover what's popular right now</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium">Recommendations</h3>
              <p className="text-sm text-gray-600">Get personalized suggestions</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium">Watchlist</h3>
              <p className="text-sm text-gray-600">Save movies for later</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium">Categories</h3>
              <p className="text-sm text-gray-600">Browse movies by genre</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
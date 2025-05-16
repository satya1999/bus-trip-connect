
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Bus, UserType } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user type from query params or default to customer
  const userType = (searchParams.get("type") as UserType) || "customer";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password, userType as UserType);
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      // Redirect based on user type
      navigate(userType === "customer" ? "/" : `/${userType}-dashboard`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center">
              <Bus className="h-8 w-8 text-rentBus-blue mr-2" />
              <span className="text-2xl font-bold text-rentBus-blue">Rent Any Bus</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-6 text-center">
            Log In as {userType === "owner" ? "Bus Owner" : userType === "admin" ? "Admin" : "Customer"}
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to={`/register${userType !== "customer" ? `?type=${userType}` : ""}`} className="text-rentBus-blue font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm">
              <Link to="/login?type=customer" className={`px-2 py-1 rounded ${userType === "customer" ? "bg-rentBus-blue text-white" : ""}`}>
                Customer
              </Link>
              <Link to="/login?type=owner" className={`px-2 py-1 rounded ${userType === "owner" ? "bg-rentBus-blue text-white" : ""}`}>
                Bus Owner
              </Link>
              <Link to="/login?type=admin" className={`px-2 py-1 rounded ${userType === "admin" ? "bg-rentBus-blue text-white" : ""}`}>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

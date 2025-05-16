
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Bus, UserType } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user type from query params or default to customer
  const userType = (searchParams.get("type") as UserType) || "customer";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(name, email, password, userType as UserType);
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      
      // Redirect based on user type
      if (userType === "owner") {
        navigate("/owner-kyc");
      } else {
        navigate(userType === "customer" ? "/" : `/${userType}-dashboard`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
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
            Register as {userType === "owner" ? "Bus Owner" : userType === "admin" ? "Admin" : "Customer"}
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to={`/login${userType !== "customer" ? `?type=${userType}` : ""}`} className="text-rentBus-blue font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-sm">
              <Link to="/register?type=customer" className={`px-2 py-1 rounded ${userType === "customer" ? "bg-rentBus-blue text-white" : ""}`}>
                Customer
              </Link>
              <Link to="/register?type=owner" className={`px-2 py-1 rounded ${userType === "owner" ? "bg-rentBus-blue text-white" : ""}`}>
                Bus Owner
              </Link>
              <Link to="/register?type=admin" className={`px-2 py-1 rounded ${userType === "admin" ? "bg-rentBus-blue text-white" : ""}`}>
                Admin
              </Link>
            </div>
          </div>

          {userType === "owner" && (
            <div className="mt-6 bg-gray-50 p-4 rounded">
              <h3 className="font-medium mb-2">Bus Owner Registration</h3>
              <p className="text-sm text-gray-600">
                As a bus owner, after registration you'll need to complete KYC verification and submit your bus documents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

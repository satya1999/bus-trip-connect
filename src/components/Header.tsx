
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Bus, Menu, X } from "lucide-react";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white header-shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Bus className="h-6 w-6 text-rentBus-blue mr-2" />
          <span className="text-xl font-bold text-rentBus-blue">Rent Any Bus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-rentBus-darkGray hover:text-rentBus-blue">
            Home
          </Link>
          <Link to="/buses" className="text-rentBus-darkGray hover:text-rentBus-blue">
            Find Buses
          </Link>
          <Link to="/about" className="text-rentBus-darkGray hover:text-rentBus-blue">
            About
          </Link>
          <Link to="/contact" className="text-rentBus-darkGray hover:text-rentBus-blue">
            Contact
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full p-0 h-9 w-9">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="capitalize">{user?.type}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={`/${user?.type}-dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-rentBus-darkGray"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-rentBus-darkGray hover:text-rentBus-blue py-2">
              Home
            </Link>
            <Link to="/buses" className="text-rentBus-darkGray hover:text-rentBus-blue py-2">
              Find Buses
            </Link>
            <Link to="/about" className="text-rentBus-darkGray hover:text-rentBus-blue py-2">
              About
            </Link>
            <Link to="/contact" className="text-rentBus-darkGray hover:text-rentBus-blue py-2">
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link to={`/${user?.type}-dashboard`} className="text-rentBus-darkGray hover:text-rentBus-blue py-2">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-rentBus-darkGray hover:text-rentBus-blue py-2">
                  Profile
                </Link>
                <Button onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => navigate("/login")} className="w-full">
                  Login
                </Button>
                <Button onClick={() => navigate("/register")} className="w-full">
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

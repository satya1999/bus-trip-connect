import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { BusCard } from "@/components/BusCard";
import { mockBuses } from "@/lib/mockData";
import { Bus } from "@/lib/types";
import { Check, MapPin, Search, Star } from "lucide-react";

export default function Homepage() {
  const [featuredBuses, setFeaturedBuses] = useState<Bus[]>([]);

  useEffect(() => {
    // In a real app, we would fetch featured buses from the server
    // For now, we'll just use the top 4 buses from our mock data
    setFeaturedBuses(mockBuses.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rentBus-blue to-rentBus-teal text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rent the Perfect Bus for Your Next Journey
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Connect with verified bus owners across India for comfortable, safe, and affordable travel
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-rentBus-amber hover:bg-rentBus-amber/90 text-black"
                asChild
              >
                <Link to="/buses">Browse Buses</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/register?type=owner">List Your Bus</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Featured Buses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Buses</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBuses.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/buses">View All Buses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Renting a bus has never been easier. Follow these simple steps to get started
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-rentBus-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-rentBus-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Search & Compare</h3>
              <p className="text-gray-600">
                Enter your travel details, compare buses based on features, prices, and reviews.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-rentBus-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-rentBus-teal" />
              </div>
              <h3 className="text-xl font-bold mb-3">Book & Pay</h3>
              <p className="text-gray-600">
                Select your bus, fill in trip details, and secure with partial payment of ₹10,000.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-rentBus-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-rentBus-amber" />
              </div>
              <h3 className="text-xl font-bold mb-3">Travel & Review</h3>
              <p className="text-gray-600">
                Enjoy your journey and share your experience by rating and reviewing the service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-rentBus-blue text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Verified Owners</h3>
                <p className="text-gray-300">
                  All bus owners undergo strict verification and KYC procedures for your safety.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                <p className="text-gray-300">
                  No hidden charges or last-minute surprises. See complete breakdown before booking.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">24x7 Support</h3>
                <p className="text-gray-300">
                  Our customer service team is available round the clock to assist you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Partial Payment</h3>
                <p className="text-gray-300">
                  Book with just ₹10,000 advance payment. Pay the rest directly to the owner.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Nationwide Network</h3>
                <p className="text-gray-300">
                  Access thousands of buses across India for all your travel needs.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Review System</h3>
                <p className="text-gray-300">
                  Make informed choices based on genuine reviews from other travelers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-rentBus-teal rounded-xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Own a Bus? Start Earning with Us</h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg">
              Join hundreds of bus owners who are generating consistent income by renting their buses on our platform.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-rentBus-teal hover:bg-gray-100"
              asChild
            >
              <Link to="/register?type=owner">Register as Bus Owner</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

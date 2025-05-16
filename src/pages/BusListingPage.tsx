
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { BusCard } from "@/components/BusCard";
import { searchBuses, busTypes, locations } from "@/lib/mockData";
import { Bus, BusType } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function BusListingPage() {
  const [searchParams] = useSearchParams();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [busType, setBusType] = useState(searchParams.get("type") || "");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortOption, setSortOption] = useState("recommended");

  // Get search params
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const capacityParam = searchParams.get("capacity");
  
  const startDate = startDateParam ? new Date(startDateParam) : undefined;
  const endDate = endDateParam ? new Date(endDateParam) : undefined;
  const capacity = capacityParam ? parseInt(capacityParam) : undefined;

  useEffect(() => {
    // Fetch buses based on search params
    const results = searchBuses(location || undefined, startDate, endDate, capacity, busType as BusType || undefined);
    setBuses(results);
    setFilteredBuses(results);
  }, [location, startDate, endDate, capacity, busType]);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...buses];
    
    // Filter by price
    filtered = filtered.filter(bus => 
      bus.pricePerDay >= minPrice && bus.pricePerDay <= maxPrice
    );
    
    // Sort
    switch (sortOption) {
      case "price_low":
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price_high":
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // "recommended" - no specific sort for demo
        break;
    }
    
    setFilteredBuses(filtered);
  }, [buses, minPrice, maxPrice, sortOption]);

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleTypeChange = (value: string) => {
    setBusType(value);
  };

  const handlePriceChange = (value: number[]) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Search Section */}
      <div className="bg-rentBus-blue py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">Find Your Ideal Bus</h1>
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            
            {/* Location Filter */}
            <div className="mb-6">
              <Label htmlFor="location" className="mb-2 block">Location</Label>
              <Select value={location} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Bus Type Filter */}
            <div className="mb-6">
              <Label htmlFor="busType" className="mb-2 block">Bus Type</Label>
              <Select value={busType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {busTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <Label className="mb-2 block">Price Range (per day)</Label>
              <div className="mt-6 px-2">
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  max={30000}
                  step={1000}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>₹{minPrice.toLocaleString()}</span>
                  <span>₹{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-xl font-bold">{filteredBuses.length} Buses Available</h2>
                {(startDate && endDate) && (
                  <p className="text-sm text-gray-500">
                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="mt-3 sm:mt-0">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredBuses.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No buses found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuses.map((bus) => (
                  <BusCard key={bus.id} bus={bus} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

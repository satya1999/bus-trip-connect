
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getBusById, amenities as allAmenities } from "@/lib/mockData";
import { Bus } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { Star, MapPin, Calendar as CalendarIcon, Wifi, Check, X } from "lucide-react";

export default function BusDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [bus, setBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  
  useEffect(() => {
    if (id) {
      const busData = getBusById(id);
      setBus(busData || null);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
    } else {
      setTotalDays(0);
    }
  }, [startDate, endDate]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to book this bus.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsBookingOpen(true);
  };

  const handleSubmitBooking = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing Date Selection",
        description: "Please select both start and end dates for your trip.",
        variant: "destructive",
      });
      return;
    }

    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Missing Location",
        description: "Please enter pickup and drop locations.",
        variant: "destructive",
      });
      return;
    }

    // This would make a booking API call in a real app
    toast({
      title: "Booking Initiated",
      description: "Your booking request has been sent. Redirecting to payment...",
    });
    
    // Simulate redirect to payment page
    setTimeout(() => {
      navigate("/booking-payment", { 
        state: { 
          busId: bus?.id,
          startDate,
          endDate,
          pickupLocation,
          dropLocation,
          passengers,
          totalAmount: totalDays * (bus?.pricePerDay || 0),
          advanceAmount: 10000
        } 
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-rentBus-teal border-t-transparent rounded-full animate-spin inline-block"></div>
          <p className="mt-2">Loading bus details...</p>
        </div>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bus Not Found</h2>
          <p className="mb-6">We couldn't find the bus you're looking for.</p>
          <Button onClick={() => navigate("/buses")}>Back to Bus Listings</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Bus Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{bus.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="text-sm">
              {bus.type}
            </Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-rentBus-amber fill-current" />
              <span className="ml-1 text-sm font-medium">{bus.rating}/5</span>
              <span className="ml-1 text-sm text-gray-500">({bus.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="ml-1 text-sm">{bus.location}</span>
            </div>
          </div>
          
          {/* Image Carousel */}
          <Carousel className="w-full mb-8">
            <CarouselContent>
              {bus.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${bus.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <Tabs defaultValue="details" className="mb-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="layout">Seat Layout</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <h3 className="font-bold text-xl mb-3">Bus Description</h3>
              <p className="text-gray-700 mb-6">{bus.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Capacity</h4>
                  <p>{bus.capacity} passengers</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Bus Type</h4>
                  <p>{bus.type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Base Price Per Day</h4>
                  <p>₹{bus.pricePerDay.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Price Per Kilometer</h4>
                  <p>₹{bus.pricePerKm}</p>
                </div>
              </div>
              
              <h3 className="font-bold text-xl mb-3">Availability</h3>
              <div className="bg-gray-50 p-4 rounded">
                {bus.availableDates.map((dateRange, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <p>
                      {format(dateRange.start, "MMMM d, yyyy")} - {format(dateRange.end, "MMMM d, yyyy")}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="pt-4">
              <h3 className="font-bold text-xl mb-4">Bus Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bus.amenities.map((amenityId) => {
                  const amenity = allAmenities.find(a => a.id === amenityId);
                  return amenity ? (
                    <div key={amenity.id} className="flex items-center p-3 bg-gray-50 rounded">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{amenity.name}</span>
                    </div>
                  ) : null;
                })}
                
                {allAmenities.filter(a => !bus.amenities.includes(a.id)).slice(0, 3).map((amenity) => (
                  <div key={amenity.id} className="flex items-center p-3 bg-gray-50 rounded text-gray-400">
                    <X className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="pt-4">
              <h3 className="font-bold text-xl mb-4">Seat Layout</h3>
              <div className="bg-gray-50 p-4 rounded">
                <img 
                  src={bus.seatLayoutImage || "/placeholder.svg"} 
                  alt="Seat Layout" 
                  className="max-w-full mx-auto" 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Booking Card */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-rentBus-blue">₹{bus.pricePerDay.toLocaleString()}</p>
                <p className="text-sm text-gray-500">per day</p>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="space-y-4 mb-6">
                <div>
                  <Label className="block mb-2">Trip dates</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {startDate && endDate ? (
                          <span>
                            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
                          </span>
                        ) : (
                          <span>Select dates</span>
                        )}
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Trip Dates</DialogTitle>
                        <DialogDescription>
                          Choose your start and end dates for the trip.
                        </DialogDescription>
                      </DialogHeader>
                      <Calendar
                        mode="range"
                        selected={{
                          from: startDate,
                          to: endDate,
                        }}
                        onSelect={(range) => {
                          setStartDate(range?.from);
                          setEndDate(range?.to);
                        }}
                        className="p-3 pointer-events-auto"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div>
                  <Label className="block mb-2">Number of passengers</Label>
                  <Input 
                    type="number" 
                    value={passengers}
                    min={1}
                    max={bus.capacity}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Max capacity: {bus.capacity} passengers</p>
                </div>
              </div>
              
              {startDate && endDate && totalDays > 0 && (
                <div className="mb-6 bg-gray-50 p-4 rounded">
                  <div className="flex justify-between mb-2">
                    <span>₹{bus.pricePerDay.toLocaleString()} x {totalDays} days</span>
                    <span>₹{(bus.pricePerDay * totalDays).toLocaleString()}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{(bus.pricePerDay * totalDays).toLocaleString()}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    *Additional costs may apply based on distance traveled at ₹{bus.pricePerKm}/km
                  </p>
                </div>
              )}
              
              <Button onClick={handleBookNow} className="w-full">
                Book Now
              </Button>
            </CardContent>
          </Card>
          
          {/* Additional Information */}
          <div className="mt-6">
            <h3 className="font-bold mb-4">Important Information</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Booking requires ₹10,000 advance payment</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Bus owner will contact you after booking</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Full payment settlement on trip day</span>
              </li>
              <li className="flex">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Free cancellation 48 hours before trip</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
            <DialogDescription>
              Fill in the details below to book this bus.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="pickup-location">Pickup Location</Label>
              <Input
                id="pickup-location"
                placeholder="Enter pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="drop-location">Drop Location</Label>
              <Input
                id="drop-location"
                placeholder="Enter drop location"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="dates">Trip Dates</Label>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {startDate && endDate ? (
                  <span>
                    {format(startDate, "MMMM d, yyyy")} - {format(endDate, "MMMM d, yyyy")}
                  </span>
                ) : (
                  <span className="text-gray-500">No dates selected</span>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Input
                id="passengers"
                type="number"
                min={1}
                max={bus.capacity}
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              />
            </div>
            
            {totalDays > 0 && (
              <div className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between mb-2">
                  <span>Total Amount</span>
                  <span>₹{(bus.pricePerDay * totalDays).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Advance Payment</span>
                  <span>₹10,000</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Remaining (to owner)</span>
                  <span>₹{(bus.pricePerDay * totalDays - 10000).toLocaleString()}</span>
                </div>
              </div>
            )}
            
            <Button onClick={handleSubmitBooking} className="w-full">
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

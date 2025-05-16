
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Bus } from "@/lib/types";

interface BookingFormProps {
  bus: Bus;
}

export function BookingForm({ bus }: BookingFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [passengers, setPassengers] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate total trip duration in days
  const tripDays = startDate && endDate 
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  
  // Calculate pricing
  const totalPrice = tripDays * bus.pricePerDay;
  const advancePayment = 10000; // Fixed advance amount
  const remainingPayment = totalPrice - advancePayment;
  
  const handleBookNow = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to book a bus",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }
    
    if (!pickupLocation || !dropLocation) {
      toast({
        title: "Error",
        description: "Please enter pickup and drop locations",
        variant: "destructive",
      });
      return;
    }
    
    if (!passengers || parseInt(passengers) <= 0 || parseInt(passengers) > bus.capacity) {
      toast({
        title: "Error",
        description: `Please enter a valid number of passengers (1-${bus.capacity})`,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would make an API call to create the booking
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast({
        title: "Booking Initiated",
        description: "You will be redirected to the payment page.",
      });
      
      // Redirect to a mock payment page
      navigate(`/payment?busId=${bus.id}&amount=${advancePayment}&days=${tripDays}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if the selected dates are in the bus availability
  const isDateAvailable = (date: Date) => {
    // Convert date to midnight for comparison
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    
    // Check against bus availability
    for (const range of bus.availableDates) {
      const rangeStart = new Date(range.start);
      rangeStart.setHours(0, 0, 0, 0);
      
      const rangeEnd = new Date(range.end);
      rangeEnd.setHours(0, 0, 0, 0);
      
      if (dateToCheck >= rangeStart && dateToCheck <= rangeEnd) {
        return true;
      }
    }
    
    return false;
  };
  
  // Check if date range is available
  const isRangeAvailable = (start: Date, end: Date) => {
    let current = new Date(start);
    current.setHours(0, 0, 0, 0);
    
    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);
    
    while (current <= endDate) {
      if (!isDateAvailable(current)) {
        return false;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return true;
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (!startDate) {
      setStartDate(date);
    } else if (!endDate && date >= startDate) {
      // Check if the entire range is available
      if (isRangeAvailable(startDate, date)) {
        setEndDate(date);
      } else {
        toast({
          title: "Date Unavailable",
          description: "Some days in your selected range are not available. Please choose different dates.",
          variant: "destructive",
        });
      }
    } else {
      setStartDate(date);
      setEndDate(undefined);
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="bg-muted rounded-t-lg">
        <CardTitle>Book This Bus</CardTitle>
        <CardDescription>Complete your booking details</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="date-range">Trip Dates</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-range"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate && endDate
                  ? `${format(startDate, "PPP")} - ${format(endDate, "PPP")}`
                  : startDate
                  ? `${format(startDate, "PPP")} - Select end date`
                  : "Select date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                selected={startDate}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  // Disable dates in the past
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today || !isDateAvailable(date);
                }}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="pickup">Pickup Location</Label>
          <Input
            id="pickup"
            placeholder="e.g. Mumbai Central"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="drop">Drop Location</Label>
          <Input
            id="drop"
            placeholder="e.g. Goa Panjim"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="passengers">Number of Passengers</Label>
          <Input
            id="passengers"
            type="number"
            placeholder={`Max ${bus.capacity} passengers`}
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            min="1"
            max={bus.capacity.toString()}
          />
        </div>
        
        {startDate && endDate && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Price Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Daily Rate:</span>
                <span>₹{bus.pricePerDay.toLocaleString()}/day</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{tripDays} {tripDays === 1 ? "day" : "days"}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-rentBus-blue">
                  <span>Advance Payment:</span>
                  <span>₹{advancePayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Payment:</span>
                  <span>₹{remainingPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleBookNow} 
          className="w-full"
          disabled={isSubmitting || !startDate || !endDate || !pickupLocation || !dropLocation || !passengers || parseInt(passengers) <= 0}
        >
          {isSubmitting ? "Processing..." : "Book Now with ₹10,000"}
        </Button>
      </CardFooter>
    </Card>
  );
}

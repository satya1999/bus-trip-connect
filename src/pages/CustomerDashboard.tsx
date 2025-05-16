
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Calendar, User, MapPin, Bus, Clock } from "lucide-react";
import { BookingStatus } from "@/lib/types";
import { useFormatters } from "@/hooks/useFormatters";
import { StatusBadge, getStatusColor } from "@/components/ui/status-badge";

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    busId: "bus1",
    busName: "Volvo Luxury Sleeper",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-03"),
    pickupLocation: "Mumbai",
    dropLocation: "Goa",
    numberOfPassengers: 20,
    totalAmount: 32000,
    advanceAmount: 10000,
    remainingAmount: 22000,
    status: "Confirmed" as BookingStatus,
    ownerName: "Rajesh Transport",
    ownerPhone: "+91 9876543210"
  },
  {
    id: "2",
    busId: "bus2",
    busName: "Mercedes 2x1 VIP",
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-06-20"),
    pickupLocation: "Delhi",
    dropLocation: "Shimla",
    numberOfPassengers: 12,
    totalAmount: 45000,
    advanceAmount: 10000,
    remainingAmount: 35000,
    status: "Pending" as BookingStatus,
    ownerName: "Singh Travels",
    ownerPhone: "+91 9876543211"
  },
  {
    id: "3",
    busId: "bus3",
    busName: "AC Seater Mini Bus",
    startDate: new Date("2025-05-10"),
    endDate: new Date("2025-05-13"),
    pickupLocation: "Bangalore",
    dropLocation: "Mysore",
    numberOfPassengers: 15,
    totalAmount: 18000,
    advanceAmount: 10000,
    remainingAmount: 8000,
    status: "Completed" as BookingStatus,
    ownerName: "Karnataka Tours",
    ownerPhone: "+91 9876543212"
  }
];

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState("upcoming");
  const { formatDate } = useFormatters();

  const getFilteredBookings = () => {
    const today = new Date();
    
    switch (activeTab) {
      case "upcoming":
        return bookings.filter(booking => 
          booking.status !== "Completed" && booking.status !== "Cancelled" && 
          new Date(booking.startDate) > today
        );
      case "ongoing":
        return bookings.filter(booking => 
          booking.status !== "Completed" && booking.status !== "Cancelled" && 
          new Date(booking.startDate) <= today && new Date(booking.endDate) >= today
        );
      case "past":
        return bookings.filter(booking => 
          booking.status === "Completed" || booking.status === "Cancelled" || 
          new Date(booking.endDate) < today
        );
      default:
        return bookings;
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Cancellation Request Submitted",
      description: "The owner will be notified of your cancellation request."
    });
    
    // In a real app, we would call an API to cancel the booking
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Welcome Back</CardTitle>
            <CardDescription>
              {user?.name || "Customer"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mt-2">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {user?.email || "customer@example.com"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Trip</CardTitle>
            <CardDescription>Next scheduled journey</CardDescription>
          </CardHeader>
          <CardContent>
            {getFilteredBookings().filter(b => b.status === "Confirmed" && new Date(b.startDate) > new Date()).length > 0 ? (
              <div className="space-y-1">
                <div className="font-medium">
                  {getFilteredBookings().filter(b => b.status === "Confirmed" && new Date(b.startDate) > new Date())[0]?.busName}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {formatDate(getFilteredBookings().filter(b => b.status === "Confirmed" && new Date(b.startDate) > new Date())[0]?.startDate)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">No upcoming trips scheduled</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Booking Stats</CardTitle>
            <CardDescription>Your booking history</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <span className="text-2xl font-bold">
                {bookings.filter(b => b.status === "Completed").length}
              </span>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold">
                {bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length}
              </span>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        {["upcoming", "ongoing", "past"].map((tab) => (
          <TabsContent value={tab} key={tab}>
            {getFilteredBookings().length > 0 ? (
              <div className="space-y-6">
                {getFilteredBookings().map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className={`h-2 ${getStatusColor(booking.status)}`} />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{booking.busName}</CardTitle>
                          <CardDescription>
                            Booking ID: {booking.id}
                          </CardDescription>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {booking.pickupLocation} to {booking.dropLocation}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {booking.numberOfPassengers} passengers
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Bus className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {booking.ownerName}
                            </span>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Payment Status</p>
                              <p className="text-xs text-muted-foreground">
                                ₹{booking.advanceAmount} paid, ₹{booking.remainingAmount} remaining
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link to={`/buses/${booking.busId}`}>View Bus</Link>
                      </Button>
                      <div className="space-x-2">
                        {booking.status === "Pending" || booking.status === "Confirmed" ? (
                          <Button 
                            variant="destructive" 
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        ) : booking.status === "Completed" && (
                          <Button variant="outline" asChild>
                            <Link to={`/review/${booking.id}`}>Leave Review</Link>
                          </Button>
                        )}
                        <Button asChild>
                          <Link to={`/booking/${booking.id}`}>Details</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === "upcoming" ? "You don't have any upcoming trips scheduled." : 
                   activeTab === "ongoing" ? "You don't have any ongoing trips." : 
                   "You haven't taken any trips yet."}
                </p>
                <Button asChild>
                  <Link to="/buses">Find a Bus</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

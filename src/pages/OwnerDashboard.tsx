
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Bus, BadgeIndianRupee, CreditCard, User, MapPin, Clock, Check, X } from "lucide-react";
import { BookingStatus, Bus as BusType } from "@/lib/types";
import { mockBuses } from "@/lib/mockData";

// Mock data for owner bookings
const mockOwnerBookings = [
  {
    id: "1",
    busId: "bus1",
    busName: "Volvo Luxury Sleeper",
    customerId: "cust1",
    customerName: "Aarav Sharma",
    customerPhone: "+91 9876543210",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-03"),
    pickupLocation: "Mumbai",
    dropLocation: "Goa",
    numberOfPassengers: 20,
    totalAmount: 32000,
    advanceAmount: 10000,
    remainingAmount: 22000,
    status: "Confirmed" as BookingStatus
  },
  {
    id: "2",
    busId: "bus1",
    busName: "Volvo Luxury Sleeper",
    customerId: "cust2",
    customerName: "Priya Patel",
    customerPhone: "+91 9876543211",
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-06-20"),
    pickupLocation: "Delhi",
    dropLocation: "Shimla",
    numberOfPassengers: 12,
    totalAmount: 45000,
    advanceAmount: 10000,
    remainingAmount: 35000,
    status: "Pending" as BookingStatus
  }
];

// Earnings data
const mockEarnings = {
  totalEarnings: 142000,
  pendingPayout: 32000,
  completedPayouts: 110000,
  recentTransactions: [
    { id: "t1", date: new Date("2025-05-01"), amount: 22000, type: "payout", status: "completed" },
    { id: "t2", date: new Date("2025-04-15"), amount: 35000, type: "payout", status: "completed" },
    { id: "t3", date: new Date("2025-04-01"), amount: 28000, type: "payout", status: "completed" },
    { id: "t4", date: new Date("2025-03-15"), amount: 25000, type: "payout", status: "completed" }
  ]
};

export default function OwnerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("buses");
  const [buses, setBuses] = useState<BusType[]>(mockBuses.slice(0, 3));
  const [bookings, setBookings] = useState(mockOwnerBookings);
  const [earnings, setEarnings] = useState(mockEarnings);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAcceptBooking = (bookingId: string) => {
    toast({
      title: "Booking Accepted",
      description: "The customer will be notified that you've accepted their booking.",
    });
    
    // In a real app, we would call an API to update the booking status
    setBookings(
      bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: "Confirmed" as BookingStatus } 
          : booking
      )
    );
  };

  const handleRejectBooking = (bookingId: string) => {
    toast({
      title: "Booking Rejected",
      description: "The customer will be notified that you've rejected their booking.",
    });
    
    // In a real app, we would call an API to update the booking status
    setBookings(
      bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: "Cancelled" as BookingStatus } 
          : booking
      )
    );
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "Confirmed": return "bg-green-500";
      case "Pending": return "bg-amber-500";
      case "Completed": return "bg-blue-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <Button className="mt-4 md:mt-0" asChild>
          <Link to="/add-bus">+ Add New Bus</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Buses</CardTitle>
            <CardDescription>
              Total vehicles listed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bus className="h-5 w-5 mr-2 text-rentBus-blue" />
                <span className="text-2xl font-bold">{buses.length}</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="#" onClick={() => setActiveTab("buses")}>Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bookings</CardTitle>
            <CardDescription>Upcoming and pending bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-rentBus-blue" />
                <span className="text-2xl font-bold">
                  {bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length}
                </span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="#" onClick={() => setActiveTab("bookings")}>View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Earnings</CardTitle>
            <CardDescription>Total earnings to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-rentBus-blue" />
                <span className="text-2xl font-bold">
                  ₹{(earnings.totalEarnings / 1000).toFixed(0)}K
                </span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="#" onClick={() => setActiveTab("earnings")}>Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="buses">My Buses</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buses">
          <div className="space-y-6">
            {buses.map((bus) => (
              <Card key={bus.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{bus.name}</CardTitle>
                      <CardDescription>{bus.type}</CardDescription>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${bus.isApproved ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>
                      {bus.isApproved ? "Approved" : "Pending Approval"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative aspect-video rounded-md overflow-hidden">
                      <img 
                        src={bus.images[0] || "https://placehold.co/600x400?text=Bus+Image"} 
                        alt={bus.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Daily Rate</p>
                          <p className="font-medium">₹{bus.pricePerDay}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Capacity</p>
                          <p className="font-medium">{bus.capacity} seats</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{bus.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rating</p>
                          <p className="font-medium">{bus.rating} ★ ({bus.reviewCount})</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amenities</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bus.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          {bus.amenities.length > 3 && (
                            <span className="text-xs bg-muted px-2 py-1 rounded">
                              +{bus.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button variant="outline" asChild>
                    <Link to={`/buses/${bus.id}`}>View Details</Link>
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" asChild>
                      <Link to={`/edit-bus/${bus.id}`}>Edit</Link>
                    </Button>
                    <Button>
                      Manage Availability
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/add-bus">+ Add Another Bus</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bookings">
          <div className="space-y-6">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
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
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {booking.customerName} • {booking.customerPhone}
                          </span>
                        </div>
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
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <User className="h-4 w-4 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Passengers</p>
                            <p className="text-xs text-muted-foreground">
                              {booking.numberOfPassengers} seats
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Payment Status</p>
                            <p className="text-xs text-muted-foreground">
                              ₹{booking.advanceAmount} received, ₹{booking.remainingAmount} pending
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">
                            Total: ₹{booking.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to={`/buses/${booking.busId}`}>View Bus</Link>
                    </Button>
                    
                    {booking.status === "Pending" && (
                      <div className="space-x-2">
                        <Button 
                          variant="destructive" 
                          onClick={() => handleRejectBooking(booking.id)}
                        >
                          <X className="h-4 w-4 mr-2" /> Reject
                        </Button>
                        <Button 
                          variant="default" 
                          onClick={() => handleAcceptBooking(booking.id)}
                        >
                          <Check className="h-4 w-4 mr-2" /> Accept
                        </Button>
                      </div>
                    )}
                    
                    {booking.status !== "Pending" && (
                      <Button asChild>
                        <Link to={`/booking/${booking.id}`}>View Details</Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any bookings for your buses yet.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="earnings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(earnings.totalEarnings)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(earnings.pendingPayout)}
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link to="/withdraw">Withdraw</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(earnings.completedPayouts)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your recent payouts and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earnings.recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p className="font-medium">
                        {transaction.type === "payout" ? "Payout" : "Booking"} 
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className={`text-sm ${transaction.status === "completed" ? "text-green-600" : "text-amber-600"}`}>
                        {transaction.status === "completed" ? "Completed" : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/transactions">View All Transactions</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

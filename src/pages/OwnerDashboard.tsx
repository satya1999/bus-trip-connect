
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Bus, BadgeIndianRupee, CreditCard } from "lucide-react";
import { BookingStatus, Bus as BusType } from "@/lib/types";
import { mockBuses } from "@/lib/mockData";
import { StatCard } from "@/components/owner/StatCard";
import { BusesTab } from "@/components/owner/BusesTab";
import { BookingsTab } from "@/components/owner/BookingsTab";
import { EarningsTab } from "@/components/owner/EarningsTab";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <Button className="mt-4 md:mt-0" asChild>
          <Link to="/add-bus">+ Add New Bus</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="My Buses"
          description="Total vehicles listed"
          value={buses.length}
          icon={<Bus className="h-5 w-5 text-rentBus-blue" />}
          action={{ label: "Manage", href: "#", onClick: () => setActiveTab("buses") }}
        />
        
        <StatCard 
          title="Bookings"
          description="Upcoming and pending bookings"
          value={bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length}
          icon={<Calendar className="h-5 w-5 text-rentBus-blue" />}
          action={{ label: "View All", href: "#", onClick: () => setActiveTab("bookings") }}
        />
        
        <StatCard 
          title="Earnings"
          description="Total earnings to date"
          value={`₹${(earnings.totalEarnings / 1000).toFixed(0)}K`}
          icon={<CreditCard className="h-5 w-5 text-rentBus-blue" />}
          action={{ label: "Details", href: "#", onClick: () => setActiveTab("earnings") }}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="buses">My Buses</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buses">
          <BusesTab buses={buses} />
        </TabsContent>
        
        <TabsContent value="bookings">
          <BookingsTab 
            bookings={bookings} 
            onAcceptBooking={handleAcceptBooking} 
            onRejectBooking={handleRejectBooking} 
          />
        </TabsContent>
        
        <TabsContent value="earnings">
          <EarningsTab earnings={earnings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

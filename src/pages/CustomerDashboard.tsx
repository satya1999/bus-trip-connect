
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BookingStatus } from "@/lib/types";
import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { BookingsTabs } from "@/components/dashboard/BookingsTabs";
import { useBookingFilters } from "@/hooks/useBookingFilters";

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
  const { toast } = useToast();
  const [bookings, setBookings] = useState(mockBookings);
  const { activeTab, setActiveTab, getFilteredBookings } = useBookingFilters(bookings);

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Cancellation Request Submitted",
      description: "The owner will be notified of your cancellation request."
    });
    
    // In a real app, we would call an API to cancel the booking
  };

  // Dashboard stats
  const completedCount = bookings.filter(b => b.status === "Completed").length;
  const activeCount = bookings.filter(b => b.status === "Confirmed" || b.status === "Pending").length;
  
  // Find upcoming booking
  const upcomingBooking = getFilteredBookings().filter(
    b => b.status === "Confirmed" && new Date(b.startDate) > new Date()
  )[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
      <DashboardCards
        upcomingBooking={upcomingBooking}
        completedCount={completedCount}
        activeCount={activeCount}
      />
      
      <BookingsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getFilteredBookings={getFilteredBookings}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
}

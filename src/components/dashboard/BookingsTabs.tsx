
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCard } from "./BookingCard";
import { BookingStatus } from "@/lib/types";

interface Booking {
  id: string;
  busId: string;
  busName: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropLocation: string;
  numberOfPassengers: number;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  status: BookingStatus;
  ownerName: string;
  ownerPhone: string;
}

interface BookingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  getFilteredBookings: () => Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export function BookingsTabs({ activeTab, setActiveTab, getFilteredBookings, onCancelBooking }: BookingsTabsProps) {
  return (
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
                <BookingCard 
                  key={booking.id}
                  booking={booking} 
                  onCancelBooking={onCancelBooking} 
                />
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
  );
}


import { BookingCard } from "./BookingCard";
import { BookingStatus } from "@/lib/types";

interface Booking {
  id: string;
  busId: string;
  busName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropLocation: string;
  numberOfPassengers: number;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  status: BookingStatus;
}

interface BookingsTabProps {
  bookings: Booking[];
  onAcceptBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string) => void;
}

export const BookingsTab = ({ bookings, onAcceptBooking, onRejectBooking }: BookingsTabProps) => {
  return (
    <div className="space-y-6">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            onAccept={onAcceptBooking} 
            onReject={onRejectBooking} 
          />
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
  );
};

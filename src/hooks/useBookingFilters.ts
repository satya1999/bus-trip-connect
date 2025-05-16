
import { useState } from "react";
import { BookingStatus } from "@/lib/types";

type Booking = {
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
};

export function useBookingFilters<T extends Booking>(bookings: T[]) {
  const [activeTab, setActiveTab] = useState("upcoming");

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

  return {
    activeTab,
    setActiveTab,
    getFilteredBookings
  };
}

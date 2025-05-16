
// User types
export type UserType = "customer" | "owner" | "admin";

export type BusType = "2x2 Sleeper" | "3x2 Seater" | "2x1 Luxury" | "Mini Bus";
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface AmenityType {
  id: string;
  name: string;
  icon: string;
}

export interface Bus {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  type: BusType;
  capacity: number;
  images: string[];
  seatLayoutImage: string;
  amenities: string[];
  pricePerDay: number;
  pricePerKm: number; 
  location: string;
  availableDates: {
    start: Date;
    end: Date;
  }[];
  isApproved: boolean;
  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  busId: string;
  customerId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  dropLocation: string;
  numberOfPassengers: number;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  status: BookingStatus;
  createdAt: Date;
}

export interface Review {
  id: string;
  busId: string;
  customerId: string;
  bookingId: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  type: UserType;
  createdAt: Date;
}

export interface OwnerProfile extends UserProfile {
  gstNumber?: string;
  rcBookFiles?: string[];
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    accountName: string;
  };
  kycApproved: boolean;
  walletBalance: number;
}

export interface CustomerProfile extends UserProfile {
  bookings: string[];
}

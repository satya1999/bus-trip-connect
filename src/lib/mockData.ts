
import { Bus, AmenityType, Booking, BusType } from "./types";

// Mock Amenities
export const amenities: AmenityType[] = [
  { id: "1", name: "AC", icon: "snowflake" },
  { id: "2", name: "WiFi", icon: "wifi" },
  { id: "3", name: "USB Charging", icon: "usb" },
  { id: "4", name: "TV", icon: "tv" },
  { id: "5", name: "Blanket", icon: "blanket" },
  { id: "6", name: "Water Bottle", icon: "bottle" },
  { id: "7", name: "Snacks", icon: "cookie" },
  { id: "8", name: "Reading Light", icon: "bulb" },
  { id: "9", name: "Toilet", icon: "toilet" },
];

// Mock Buses
export const mockBuses: Bus[] = [
  {
    id: "bus1",
    ownerId: "owner1",
    name: "Royal Cruiser",
    description: "Luxury 2x2 sleeper bus with all amenities for a comfortable journey",
    type: "2x2 Sleeper",
    capacity: 36,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    seatLayoutImage: "/placeholder.svg",
    amenities: ["1", "2", "3", "4", "5"],
    pricePerDay: 15000,
    pricePerKm: 25,
    location: "Mumbai",
    availableDates: [
      {
        start: new Date(2024, 4, 1),
        end: new Date(2024, 4, 15),
      },
      {
        start: new Date(2024, 4, 20),
        end: new Date(2024, 5, 10),
      },
    ],
    isApproved: true,
    rating: 4.7,
    reviewCount: 24,
  },
  {
    id: "bus2",
    ownerId: "owner1",
    name: "City Express",
    description: "Comfortable seater bus ideal for short city trips",
    type: "3x2 Seater",
    capacity: 45,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    seatLayoutImage: "/placeholder.svg",
    amenities: ["1", "3", "6"],
    pricePerDay: 12000,
    pricePerKm: 22,
    location: "Delhi",
    availableDates: [
      {
        start: new Date(2024, 4, 5),
        end: new Date(2024, 4, 25),
      },
    ],
    isApproved: true,
    rating: 4.5,
    reviewCount: 18,
  },
  {
    id: "bus3",
    ownerId: "owner2",
    name: "Mountain Explorer",
    description: "Rugged bus designed for hill station trips with extra comfort",
    type: "2x2 Sleeper",
    capacity: 32,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    seatLayoutImage: "/placeholder.svg",
    amenities: ["1", "2", "3", "5", "7", "8", "9"],
    pricePerDay: 18000,
    pricePerKm: 28,
    location: "Shimla",
    availableDates: [
      {
        start: new Date(2024, 4, 10),
        end: new Date(2024, 4, 30),
      },
    ],
    isApproved: true,
    rating: 4.8,
    reviewCount: 32,
  },
  {
    id: "bus4",
    ownerId: "owner3",
    name: "Mini Tourer",
    description: "Compact bus perfect for small groups and families",
    type: "Mini Bus",
    capacity: 18,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    seatLayoutImage: "/placeholder.svg",
    amenities: ["1", "2", "3", "6", "7"],
    pricePerDay: 8000,
    pricePerKm: 20,
    location: "Bangalore",
    availableDates: [
      {
        start: new Date(2024, 4, 1),
        end: new Date(2024, 5, 30),
      },
    ],
    isApproved: true,
    rating: 4.6,
    reviewCount: 15,
  },
  {
    id: "bus5",
    ownerId: "owner2",
    name: "Party Bus",
    description: "Specially designed for events and celebrations with music system and LED lights",
    type: "2x1 Luxury",
    capacity: 24,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    seatLayoutImage: "/placeholder.svg",
    amenities: ["1", "2", "3", "4", "7", "8"],
    pricePerDay: 25000,
    pricePerKm: 35,
    location: "Goa",
    availableDates: [
      {
        start: new Date(2024, 4, 5),
        end: new Date(2024, 4, 15),
      },
      {
        start: new Date(2024, 4, 20),
        end: new Date(2024, 5, 10),
      },
    ],
    isApproved: true,
    rating: 4.9,
    reviewCount: 28,
  },
];

// Get a list of locations from the buses
export const locations = Array.from(new Set(mockBuses.map(bus => bus.location)));

// Get a list of bus types
export const busTypes: BusType[] = ["2x2 Sleeper", "3x2 Seater", "2x1 Luxury", "Mini Bus"];

// Mock bookings
export const mockBookings: Booking[] = [
  {
    id: "booking1",
    busId: "bus1",
    customerId: "customer1",
    startDate: new Date(2024, 4, 5),
    endDate: new Date(2024, 4, 7),
    pickupLocation: "Mumbai Central",
    dropLocation: "Pune Station",
    numberOfPassengers: 30,
    totalAmount: 45000,
    advanceAmount: 10000,
    remainingAmount: 35000,
    status: "Confirmed",
    createdAt: new Date(2024, 3, 25),
  },
  {
    id: "booking2",
    busId: "bus3",
    customerId: "customer1",
    startDate: new Date(2024, 5, 12),
    endDate: new Date(2024, 5, 15),
    pickupLocation: "Delhi Airport",
    dropLocation: "Shimla Bus Stand",
    numberOfPassengers: 28,
    totalAmount: 54000,
    advanceAmount: 10000,
    remainingAmount: 44000,
    status: "Pending",
    createdAt: new Date(2024, 4, 1),
  },
];

// Function to filter buses based on search criteria
export function searchBuses(
  location?: string,
  startDate?: Date,
  endDate?: Date,
  capacity?: number,
  busType?: BusType
) {
  return mockBuses.filter((bus) => {
    // Filter by location if provided
    if (location && bus.location !== location) return false;
    
    // Filter by capacity if provided
    if (capacity && bus.capacity < capacity) return false;
    
    // Filter by type if provided
    if (busType && bus.type !== busType) return false;
    
    // Filter by date if provided
    if (startDate && endDate) {
      let isAvailable = false;
      for (const availableDateRange of bus.availableDates) {
        if (
          availableDateRange.start <= startDate &&
          availableDateRange.end >= endDate
        ) {
          isAvailable = true;
          break;
        }
      }
      if (!isAvailable) return false;
    }
    
    return true;
  });
}

// Get bus by ID
export function getBusById(id: string): Bus | undefined {
  return mockBuses.find((bus) => bus.id === id);
}

// Get bookings by customer ID
export function getBookingsByCustomerId(customerId: string): Booking[] {
  return mockBookings.filter((booking) => booking.customerId === customerId);
}

// Get bookings by bus ID
export function getBookingsByBusId(busId: string): Booking[] {
  return mockBookings.filter((booking) => booking.busId === busId);
}

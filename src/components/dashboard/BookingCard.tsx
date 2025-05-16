
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, User, Bus, Clock } from "lucide-react";
import { StatusBadge, getStatusColor } from "@/components/ui/status-badge";
import { useFormatters } from "@/hooks/useFormatters";
import { BookingStatus } from "@/lib/types";

interface BookingCardProps {
  booking: {
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
  };
  onCancelBooking: (bookingId: string) => void;
}

export function BookingCard({ booking, onCancelBooking }: BookingCardProps) {
  const { formatDate } = useFormatters();
  
  return (
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
              onClick={() => onCancelBooking(booking.id)}
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
  );
}


import { Link } from "react-router-dom";
import { User, Calendar, MapPin, Clock, CreditCard, Check, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingStatus } from "@/lib/types";

interface BookingCardProps {
  booking: {
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
  };
  onAccept: (bookingId: string) => void;
  onReject: (bookingId: string) => void;
}

export const BookingCard = ({ booking, onAccept, onReject }: BookingCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
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
              onClick={() => onReject(booking.id)}
            >
              <X className="h-4 w-4 mr-2" /> Reject
            </Button>
            <Button 
              variant="default" 
              onClick={() => onAccept(booking.id)}
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
  );
};

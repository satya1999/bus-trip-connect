
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useFormatters } from "@/hooks/useFormatters";

type BookingWithDetails = {
  busName: string;
  startDate: Date;
  status: string;
};

interface DashboardCardsProps {
  upcomingBooking: BookingWithDetails | undefined;
  completedCount: number;
  activeCount: number;
}

export function DashboardCards({ upcomingBooking, completedCount, activeCount }: DashboardCardsProps) {
  const { user } = useAuth();
  const { formatDate } = useFormatters();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Welcome Back</CardTitle>
          <CardDescription>
            {user?.name || "Customer"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mt-2">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {user?.email || "customer@example.com"}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Trip</CardTitle>
          <CardDescription>Next scheduled journey</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBooking ? (
            <div className="space-y-1">
              <div className="font-medium">
                {upcomingBooking.busName}
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {formatDate(upcomingBooking.startDate)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">No upcoming trips scheduled</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Booking Stats</CardTitle>
          <CardDescription>Your booking history</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <span className="text-2xl font-bold">
              {completedCount}
            </span>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">
              {activeCount}
            </span>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

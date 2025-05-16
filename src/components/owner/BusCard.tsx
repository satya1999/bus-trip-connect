
import { Link } from "react-router-dom";
import { Bus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus as BusType } from "@/lib/types";

interface BusCardProps {
  bus: BusType;
}

export const BusCard = ({ bus }: BusCardProps) => {
  return (
    <Card key={bus.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{bus.name}</CardTitle>
            <CardDescription>{bus.type}</CardDescription>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${bus.isApproved ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>
            {bus.isApproved ? "Approved" : "Pending Approval"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-video rounded-md overflow-hidden">
            <img 
              src={bus.images[0] || "https://placehold.co/600x400?text=Bus+Image"} 
              alt={bus.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Daily Rate</p>
                <p className="font-medium">₹{bus.pricePerDay}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium">{bus.capacity} seats</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{bus.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-medium">{bus.rating} ★ ({bus.reviewCount})</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amenities</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {bus.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
                {bus.amenities.length > 3 && (
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    +{bus.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" asChild>
          <Link to={`/buses/${bus.id}`}>View Details</Link>
        </Button>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/edit-bus/${bus.id}`}>Edit</Link>
          </Button>
          <Button>
            Manage Availability
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

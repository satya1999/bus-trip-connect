
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Bus } from "@/lib/types";
import { amenities as allAmenities } from "@/lib/mockData";

interface BusCardProps {
  bus: Bus;
}

export function BusCard({ bus }: BusCardProps) {
  const navigate = useNavigate();
  const displayAmenities = bus.amenities.slice(0, 3).map(id => 
    allAmenities.find(amenity => amenity.id === id)?.name || ""
  ).filter(Boolean);

  const handleViewDetails = () => {
    navigate(`/buses/${bus.id}`);
  };

  return (
    <Card className="bus-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={bus.images[0] || "/placeholder.svg"}
          alt={bus.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-white text-rentBus-blue">
            {bus.type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate">{bus.name}</h3>
          <div className="flex items-center text-rentBus-amber">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{bus.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{bus.description}</p>
        
        <div className="mb-2">
          <span className="text-sm text-gray-500">Capacity: </span>
          <span className="text-sm font-medium">{bus.capacity} seats</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-1">
          {displayAmenities.map((amenity, i) => (
            <Badge key={i} variant="outline" className="bg-gray-50">
              {amenity}
            </Badge>
          ))}
          {bus.amenities.length > 3 && (
            <Badge variant="outline" className="bg-gray-50">
              +{bus.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 flex items-center justify-between pt-3 pb-3">
        <div>
          <p className="text-rentBus-blue font-bold">₹{bus.pricePerDay.toLocaleString()}</p>
          <p className="text-xs text-gray-500">per day</p>
        </div>
        <Button onClick={handleViewDetails}>View Details</Button>
      </CardFooter>
    </Card>
  );
}

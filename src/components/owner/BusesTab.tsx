
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bus as BusType } from "@/lib/types";
import { BusCard } from "./BusCard";

interface BusesTabProps {
  buses: BusType[];
}

export const BusesTab = ({ buses }: BusesTabProps) => {
  return (
    <div className="space-y-6">
      {buses.map((bus) => (
        <BusCard key={bus.id} bus={bus} />
      ))}
      
      <div className="text-center mt-8">
        <Button asChild>
          <Link to="/add-bus">+ Add Another Bus</Link>
        </Button>
      </div>
    </div>
  );
};

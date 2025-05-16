
import { cn } from "@/lib/utils";
import { BookingStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusColor = getStatusColor(status);
  
  return (
    <span className={cn(
      "px-2 py-1 text-xs rounded-full text-white",
      statusColor,
      className
    )}>
      {status}
    </span>
  );
}

export function getStatusColor(status: BookingStatus): string {
  switch (status) {
    case "Confirmed": return "bg-green-500";
    case "Pending": return "bg-amber-500";
    case "Completed": return "bg-blue-500";
    case "Cancelled": return "bg-red-500";
    default: return "bg-gray-500";
  }
}

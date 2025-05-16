
import { Card, CardContent } from "@/components/ui/card";

interface TransactionItemProps {
  id: string;
  date: Date;
  amount: number;
  type: string;
  status: string;
}

export const TransactionItem = ({ id, date, amount, type, status }: TransactionItemProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <p className="font-medium">
          {type === "payout" ? "Payout" : "Booking"} 
        </p>
        <p className="text-sm text-muted-foreground">
          {formatDate(date)}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">
          {formatCurrency(amount)}
        </p>
        <p className={`text-sm ${status === "completed" ? "text-green-600" : "text-amber-600"}`}>
          {status === "completed" ? "Completed" : "Pending"}
        </p>
      </div>
    </div>
  );
};

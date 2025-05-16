
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "./StatCard";
import { TransactionItem } from "./TransactionItem";

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: string;
  status: string;
}

interface EarningsData {
  totalEarnings: number;
  pendingPayout: number;
  completedPayouts: number;
  recentTransactions: Transaction[];
}

interface EarningsTabProps {
  earnings: EarningsData;
}

export const EarningsTab = ({ earnings }: EarningsTabProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Earnings" 
          value={formatCurrency(earnings.totalEarnings)} 
          variant="link"
        />
        
        <StatCard 
          title="Pending Payout" 
          value={formatCurrency(earnings.pendingPayout)} 
          variant="link"
          action={{
            label: "Withdraw",
            href: "/withdraw"
          }}
        />
        
        <StatCard 
          title="Completed Payouts" 
          value={formatCurrency(earnings.completedPayouts)} 
          variant="link"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Your recent payouts and transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earnings.recentTransactions.map(transaction => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/transactions">View All Transactions</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

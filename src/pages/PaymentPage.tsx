
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Get parameters from URL
  const busId = searchParams.get("busId") || "";
  const amount = parseInt(searchParams.get("amount") || "0");
  const days = parseInt(searchParams.get("days") || "0");
  
  useEffect(() => {
    // Ensure we have valid parameters
    if (!busId || !amount || !days) {
      toast({
        title: "Invalid Parameters",
        description: "Something went wrong. Redirecting to home page.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [busId, amount, days, toast, navigate]);
  
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const chunks = [];
    
    for (let i = 0; i < cleaned.length; i += 4) {
      chunks.push(cleaned.substring(i, i + 4));
    }
    
    return chunks.join(" ");
  };
  
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    
    return cleaned;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    if (formattedValue.length <= 19) { // 16 digits + 3 spaces
      setCardNumber(formattedValue);
    }
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    if (formattedValue.length <= 5) { // MM/YY
      setExpiry(formattedValue);
    }
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "card") {
      if (!cardName || !cardNumber || !expiry || !cvv) {
        toast({
          title: "Missing Fields",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
      
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive",
        });
        return;
      }
      
      if (expiry.length !== 5 || !expiry.includes("/")) {
        toast({
          title: "Invalid Expiry Date",
          description: "Please enter a valid expiry date (MM/YY)",
          variant: "destructive",
        });
        return;
      }
      
      if (cvv.length !== 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid 3-digit CVV",
          variant: "destructive",
        });
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        toast({
          title: "Missing UPI ID",
          description: "Please enter your UPI ID",
          variant: "destructive",
        });
        return;
      }
      
      if (!upiId.includes("@")) {
        toast({
          title: "Invalid UPI ID",
          description: "Please enter a valid UPI ID (e.g. name@upi)",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would make an API call to process the payment
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment processing
      
      setIsSuccess(true);
      
      // Simulate some time to display the success message
      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 3000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container max-w-md mx-auto px-4 py-16">
        <Card className="border-green-100">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your booking has been confirmed. A confirmation has been sent to your email.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="text-sm text-gray-600 flex justify-between mb-2">
                <span>Amount Paid:</span>
                <span className="font-medium">₹{amount.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>Booking ID:</span>
                <span className="font-medium">BK{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => navigate("/customer-dashboard")}
            >
              Go to My Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Secure Payment</CardTitle>
          <CardDescription>
            Complete your advance booking payment
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePayment}>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-muted-foreground">Trip Duration:</span>
                <span className="font-medium">{days} {days === 1 ? "day" : "days"}</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-muted-foreground">Advance Payment:</span>
                <span className="font-medium">₹{amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Lock className="h-3 w-3 mr-1" />
                Your payment is secure and encrypted
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup 
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard className="mb-3 h-6 w-6" />
                    Credit/Debit Card
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem
                    value="upi"
                    id="upi"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="upi"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 22V12M12 12V2M12 12H22M12 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    UPI Payment
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {paymentMethod === "card" && (
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="cardName">Card Holder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Name on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      type="password"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="saveCard" 
                    checked={savePaymentMethod}
                    onCheckedChange={() => setSavePaymentMethod(!savePaymentMethod)}
                  />
                  <Label htmlFor="saveCard" className="text-sm font-normal">
                    Save card for future payments
                  </Label>
                </div>
              </div>
            )}
            
            {paymentMethod === "upi" && (
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                  You will receive a payment request on your UPI app. Please approve it to complete the payment.
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : `Pay ₹${amount.toLocaleString()}`}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By proceeding, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

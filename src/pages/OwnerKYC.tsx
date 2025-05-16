
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Check, Upload } from "lucide-react";

export default function OwnerKYC() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [gstCertificate, setGstCertificate] = useState<File | null>(null);
  const [rcBook, setRcBook] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [steps, setSteps] = useState({
    companyInfo: false,
    bankDetails: false,
    documents: false
  });

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName || !gstNumber || !address) {
      toast({
        title: "Error",
        description: "Please fill in all company details.",
        variant: "destructive",
      });
      return;
    }
    
    setSteps({ ...steps, companyInfo: true });
    toast({
      title: "Success",
      description: "Company information saved.",
    });
  };

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber || !ifscCode || !accountName) {
      toast({
        title: "Error",
        description: "Please fill in all bank details.",
        variant: "destructive",
      });
      return;
    }
    
    setSteps({ ...steps, bankDetails: true });
    toast({
      title: "Success",
      description: "Bank details saved.",
    });
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gstCertificate || !rcBook) {
      toast({
        title: "Error",
        description: "Please upload all required documents.",
        variant: "destructive",
      });
      return;
    }
    
    setSteps({ ...steps, documents: true });
    toast({
      title: "Success",
      description: "Documents uploaded successfully.",
    });
  };

  const handleFinalSubmit = async () => {
    if (!steps.companyInfo || !steps.bankDetails || !steps.documents) {
      toast({
        title: "Error",
        description: "Please complete all steps before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would make an API call to submit the KYC details
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast({
        title: "KYC Submitted",
        description: "Your KYC details have been submitted for verification. This usually takes 1-2 business days.",
      });
      
      navigate("/owner-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit KYC. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Bus Owner Verification</h1>
        <p className="text-center text-muted-foreground mb-8">
          Complete the KYC process to start listing your buses
        </p>
        
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className={`p-4 rounded-lg border ${steps.companyInfo ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${steps.companyInfo ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                  {steps.companyInfo ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <h3 className="font-medium">Company Details</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your business information
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${steps.bankDetails ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${steps.bankDetails ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                  {steps.bankDetails ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <h3 className="font-medium">Bank Details</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For receiving payments
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${steps.documents ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${steps.documents ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                  {steps.documents ? <Check className="h-5 w-5" /> : "3"}
                </div>
                <h3 className="font-medium">Documents</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Verify your identity
              </p>
            </div>
          </div>
          
          {!steps.companyInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Please enter your business details
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleCompanySubmit}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your company or business name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input
                      id="gstNumber"
                      placeholder="Enter your 15-digit GST number"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete business address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Save & Continue
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
          {steps.companyInfo && !steps.bankDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>
                  Please enter your bank account information for receiving payments
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleBankSubmit}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter your bank account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      placeholder="Enter bank IFSC code"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input
                      id="accountName"
                      placeholder="Enter name as per bank account"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Save & Continue
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
          {steps.companyInfo && steps.bankDetails && !steps.documents && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>
                  Please upload the following documents for verification
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleDocumentSubmit}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="gstCertificate">GST Certificate</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="gstCertificate"
                              className="relative cursor-pointer rounded-md font-medium text-rentBus-blue hover:text-rentBus-blue/90 focus-within:outline-none"
                            >
                              <span>Upload GST Certificate</span>
                              <input 
                                id="gstCertificate" 
                                type="file" 
                                className="sr-only"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setGstCertificate(e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, JPG or PNG up to 5MB
                          </p>
                        </div>
                      </div>
                      {gstCertificate && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ {gstCertificate.name} ({Math.round(gstCertificate.size / 1024)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="rcBook">RC Book (for at least one bus)</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="rcBook"
                              className="relative cursor-pointer rounded-md font-medium text-rentBus-blue hover:text-rentBus-blue/90 focus-within:outline-none"
                            >
                              <span>Upload RC Book</span>
                              <input 
                                id="rcBook" 
                                type="file" 
                                className="sr-only"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setRcBook(e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, JPG or PNG up to 5MB
                          </p>
                        </div>
                      </div>
                      {rcBook && (
                        <p className="mt-2 text-sm text-green-600">
                          ✓ {rcBook.name} ({Math.round(rcBook.size / 1024)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Upload Documents
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
          
          {steps.companyInfo && steps.bankDetails && steps.documents && (
            <Card>
              <CardHeader>
                <CardTitle>Verification Complete</CardTitle>
                <CardDescription>
                  Review your information before final submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg divide-y">
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Company Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Company Name</p>
                        <p>{companyName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GST Number</p>
                        <p>{gstNumber}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Address</p>
                        <p>{address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Bank Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Account Holder</p>
                        <p>{accountName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">IFSC Code</p>
                        <p>{ifscCode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Account Number</p>
                        <p>
                          {accountNumber.replace(/\d(?=\d{4})/g, "•")}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Uploaded Documents</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <p>GST Certificate</p>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <p>RC Book</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Please Note:</strong> Once submitted, your KYC will be reviewed by our team. 
                    This usually takes 1-2 business days. You will be notified once your account is verified.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleFinalSubmit} 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit for Verification"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

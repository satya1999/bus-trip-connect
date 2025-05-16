
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Users, 
  Bus, 
  CreditCard, 
  Check, 
  X, 
  UserCheck,
  Download
} from "lucide-react";
import { mockBuses } from "@/lib/mockData";

// Mock data for KYC approvals
const mockKycRequests = [
  {
    id: "1",
    name: "Rajesh Singh",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    companyName: "Singh Travels",
    gstNumber: "29AABCU9603R1ZX",
    documentUploaded: true,
    dateSubmitted: new Date("2025-05-01"),
    status: "pending"
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 9876543211",
    companyName: "Comfort Travels",
    gstNumber: "27AADCB0828R1Z3",
    documentUploaded: true,
    dateSubmitted: new Date("2025-05-05"),
    status: "pending"
  }
];

// Mock data for bus approvals
const mockBusApprovals = mockBuses.slice(0, 3).map(bus => ({
  ...bus,
  ownerName: "Rajesh Singh",
  ownerEmail: "rajesh@example.com",
  dateSubmitted: new Date("2025-05-01"),
  status: bus.isApproved ? "approved" : "pending"
}));

// Mock data for dashboard stats
const mockStats = {
  totalUsers: 254,
  totalOwners: 32,
  totalBuses: 45,
  totalBookings: 128,
  totalRevenue: 2540000,
  platformFees: 254000,
  pendingKyc: 5,
  pendingBusApprovals: 8,
  recentBookings: 12,
  completedTrips: 108
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [kycRequests, setKycRequests] = useState(mockKycRequests);
  const [busApprovals, setBusApprovals] = useState(mockBusApprovals);
  const [stats, setStats] = useState(mockStats);
  
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

  const handleApproveKyc = (kycId: string) => {
    setKycRequests(
      kycRequests.map(kyc => 
        kyc.id === kycId 
          ? { ...kyc, status: "approved" } 
          : kyc
      )
    );
    
    toast({
      title: "KYC Approved",
      description: "The owner has been notified and can now add buses."
    });
  };

  const handleRejectKyc = (kycId: string) => {
    setKycRequests(
      kycRequests.map(kyc => 
        kyc.id === kycId 
          ? { ...kyc, status: "rejected" } 
          : kyc
      )
    );
    
    toast({
      title: "KYC Rejected",
      description: "The owner has been notified."
    });
  };

  const handleApproveBus = (busId: string) => {
    setBusApprovals(
      busApprovals.map(bus => 
        bus.id === busId 
          ? { ...bus, status: "approved", isApproved: true } 
          : bus
      )
    );
    
    toast({
      title: "Bus Approved",
      description: "The bus has been approved and is now available for booking."
    });
  };

  const handleRejectBus = (busId: string) => {
    setBusApprovals(
      busApprovals.map(bus => 
        bus.id === busId 
          ? { ...bus, status: "rejected", isApproved: false } 
          : bus
      )
    );
    
    toast({
      title: "Bus Rejected",
      description: "The owner has been notified."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-rentBus-blue" />
              <span className="text-2xl font-bold">{stats.totalUsers}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Bus Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-rentBus-blue" />
              <span className="text-2xl font-bold">{stats.totalOwners}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Buses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bus className="h-5 w-5 mr-2 text-rentBus-blue" />
              <span className="text-2xl font-bold">{stats.totalBuses}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-rentBus-blue" />
              <span className="text-2xl font-bold">
                ₹{(stats.totalRevenue / 100000).toFixed(1)}L
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kyc-approval">KYC Approval</TabsTrigger>
          <TabsTrigger value="bus-approval">Bus Approval</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>
                  Overview of platform performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{stats.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Platform Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(stats.platformFees)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Approvals</p>
                      <p className="text-2xl font-bold">{stats.pendingKyc + stats.pendingBusApprovals}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed Trips</p>
                      <p className="text-2xl font-bold">{stats.completedTrips}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/statistics">View Detailed Stats</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Monthly revenue statistics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Revenue chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>
                  Items requiring your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div className="flex items-center">
                      <UserCheck className="h-5 w-5 mr-3 text-rentBus-teal" />
                      <div>
                        <p className="font-medium">Pending KYC Approvals</p>
                        <p className="text-sm text-muted-foreground">
                          {kycRequests.filter(k => k.status === "pending").length} owners waiting for verification
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="#" onClick={() => setActiveTab("kyc-approval")}>Review</Link>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div className="flex items-center">
                      <Bus className="h-5 w-5 mr-3 text-rentBus-teal" />
                      <div>
                        <p className="font-medium">Pending Bus Approvals</p>
                        <p className="text-sm text-muted-foreground">
                          {busApprovals.filter(b => b.status === "pending").length} buses waiting for approval
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="#" onClick={() => setActiveTab("bus-approval")}>Review</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="kyc-approval">
          <div className="space-y-6">
            {kycRequests.filter(kyc => kyc.status === "pending").length > 0 ? (
              kycRequests.filter(kyc => kyc.status === "pending").map((kyc) => (
                <Card key={kyc.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{kyc.name}</CardTitle>
                        <CardDescription>{kyc.companyName}</CardDescription>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        Pending Approval
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Contact Information</p>
                          <p className="font-medium">{kyc.email}</p>
                          <p className="font-medium">{kyc.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">GST Number</p>
                          <p className="font-medium">{kyc.gstNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date Submitted</p>
                          <p className="font-medium">{formatDate(kyc.dateSubmitted)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Documents</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">GST Certificate</span>
                            </div>
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">RC Book</span>
                            </div>
                            <div className="flex items-center p-2 bg-gray-50 rounded">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-sm">Bank Details</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleRejectKyc(kyc.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      onClick={() => handleApproveKyc(kyc.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No Pending KYC Approvals</h3>
                <p className="text-muted-foreground">
                  All owner KYC submissions have been processed.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="bus-approval">
          <div className="space-y-6">
            {busApprovals.filter(bus => bus.status === "pending").length > 0 ? (
              busApprovals.filter(bus => bus.status === "pending").map((bus) => (
                <Card key={bus.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{bus.name}</CardTitle>
                        <CardDescription>
                          Submitted by {bus.ownerName} • {formatDate(bus.dateSubmitted)}
                        </CardDescription>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        Pending Approval
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative aspect-video rounded-md overflow-hidden">
                        <img 
                          src={bus.images[0] || "https://placehold.co/600x400?text=Bus+Image"} 
                          alt={bus.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Bus Details</p>
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <div>
                              <p className="text-xs text-muted-foreground">Type</p>
                              <p className="text-sm font-medium">{bus.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Capacity</p>
                              <p className="text-sm font-medium">{bus.capacity} seats</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Price per Day</p>
                              <p className="text-sm font-medium">₹{bus.pricePerDay}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Location</p>
                              <p className="text-sm font-medium">{bus.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Amenities</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {bus.amenities.map((amenity, index) => (
                              <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Description</p>
                          <p className="text-sm">{bus.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to={`/admin/bus-details/${bus.id}`}>View All Details</Link>
                    </Button>
                    <div className="space-x-2">
                      <Button 
                        variant="destructive" 
                        onClick={() => handleRejectBus(bus.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button 
                        onClick={() => handleApproveBus(bus.id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No Pending Bus Approvals</h3>
                <p className="text-muted-foreground">
                  All bus submissions have been processed.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>
                  Generate financial and revenue reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Revenue Report</p>
                    <p className="text-sm text-muted-foreground">
                      Download detailed revenue data
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Commission Summary</p>
                    <p className="text-sm text-muted-foreground">
                      Platform fees and earnings
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Payouts Report</p>
                    <p className="text-sm text-muted-foreground">
                      Owner payout transactions
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>
                  Generate reports on users and owners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Customer Directory</p>
                    <p className="text-sm text-muted-foreground">
                      All registered customers
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Bus Owner Directory</p>
                    <p className="text-sm text-muted-foreground">
                      All verified bus owners
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Bus Inventory</p>
                    <p className="text-sm text-muted-foreground">
                      All buses on the platform
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Booking Reports</CardTitle>
                <CardDescription>
                  Generate reports on bookings and trips
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">All Bookings</p>
                    <p className="text-sm text-muted-foreground">
                      Complete booking history
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Completed Trips</p>
                    <p className="text-sm text-muted-foreground">
                      All finished journeys
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Cancelled Bookings</p>
                    <p className="text-sm text-muted-foreground">
                      All cancelled reservations
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Reviews & Ratings</p>
                    <p className="text-sm text-muted-foreground">
                      Customer feedback data
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Upload, Plus, X } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { BusType } from "@/lib/types";

// Mock data for amenities
const availableAmenities = [
  { id: "ac", name: "Air Conditioning" },
  { id: "wifi", name: "WiFi" },
  { id: "tv", name: "TV" },
  { id: "usb", name: "USB Charging" },
  { id: "blanket", name: "Blankets" },
  { id: "water", name: "Water Bottle" },
  { id: "toilet", name: "Toilet" },
  { id: "food", name: "Food & Snacks" },
  { id: "sleeper", name: "Sleeper Beds" },
  { id: "music", name: "Music System" },
  { id: "reading", name: "Reading Light" },
  { id: "cctv", name: "CCTV" }
];

export default function AddBus() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "" as BusType,
    capacity: "",
    pricePerDay: "",
    pricePerKm: "",
    location: "",
    amenities: [] as string[]
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [seatLayout, setSeatLayout] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAmenityToggle = (amenityId: string) => {
    if (formData.amenities.includes(amenityId)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(id => id !== amenityId)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityId]
      });
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 10) {
        toast({
          title: "Error",
          description: "You can upload a maximum of 10 images.",
          variant: "destructive",
        });
        return;
      }
      setImages([...images, ...newImages]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleLayoutUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSeatLayout(e.target.files[0]);
    }
  };
  
  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.type || !formData.capacity || 
        !formData.pricePerDay || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image of your bus.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!seatLayout) {
      toast({
        title: "Error",
        description: "Please upload a seat layout image.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload images and make an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast({
        title: "Bus Added",
        description: "Your bus has been submitted for approval. We'll notify you once it's approved.",
      });
      
      navigate("/owner-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add bus. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a New Bus</h1>
      
      <Card className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Bus Details</CardTitle>
            <CardDescription>
              Enter information about your bus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Bus Name/Model <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Volvo 9400 Luxury Sleeper"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Bus Type <span className="text-red-500">*</span></Label>
                <Select
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select bus type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2x2 Sleeper">2x2 Sleeper</SelectItem>
                    <SelectItem value="3x2 Seater">3x2 Seater</SelectItem>
                    <SelectItem value="2x1 Luxury">2x1 Luxury</SelectItem>
                    <SelectItem value="Mini Bus">Mini Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Seating Capacity <span className="text-red-500">*</span></Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="e.g. 40"
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Mumbai"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricePerDay">Price Per Day (₹) <span className="text-red-500">*</span></Label>
                <Input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  placeholder="e.g. 15000"
                  value={formData.pricePerDay}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pricePerKm">Price Per KM (₹)</Label>
                <Input
                  id="pricePerKm"
                  name="pricePerKm"
                  type="number"
                  placeholder="e.g. 50"
                  value={formData.pricePerKm}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your bus, its features, condition, etc."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div>
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                {availableAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.id}`}
                      checked={formData.amenities.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityToggle(amenity.id)}
                    />
                    <Label
                      htmlFor={`amenity-${amenity.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {amenity.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Bus Images <span className="text-red-500">*</span> <span className="text-xs text-muted-foreground">(Upload up to 10 images)</span></Label>
              <div className="mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Bus image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {images.length < 10 && (
                    <div className="aspect-square rounded-md border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50">
                      <label
                        htmlFor="bus-images"
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Plus className="h-8 w-8 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Add Image</span>
                        <input
                          id="bus-images"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seat-layout">Seat Layout Image <span className="text-red-500">*</span></Label>
              {!seatLayout ? (
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="seat-layout"
                        className="relative cursor-pointer rounded-md font-medium text-rentBus-blue hover:text-rentBus-blue/90 focus-within:outline-none"
                      >
                        <span>Upload seat layout image</span>
                        <input
                          id="seat-layout"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleLayoutUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or JPEG up to 5MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video rounded-md overflow-hidden border">
                  <img
                    src={URL.createObjectURL(seatLayout)}
                    alt="Seat layout"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setSeatLayout(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex items-center justify-between px-2 py-4 bg-muted rounded">
              <div className="flex items-center space-x-2">
                <Switch id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I confirm that all details provided are accurate and I own/have the right to rent this bus.
                </Label>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit for Approval"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

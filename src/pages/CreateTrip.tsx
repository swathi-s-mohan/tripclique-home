import { ArrowLeft, Camera, Calendar, MapPin, Wifi, Waves, Building, Mountain, UtensilsCrossed, Gamepad2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addTrip } from "@/data/trips";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    tripName: '',
    startDate: '',
    endDate: '',
    preferredPlaces: '',
    minBudget: '',
    maxBudget: ''
  });

  const travelPreferences = [
    { id: "beach", label: "Beach & Relax", icon: Waves },
    { id: "culture", label: "Culture & History", icon: Building },
    { id: "adventure", label: "Adventure", icon: Mountain },
    { id: "food", label: "Food & Dining", icon: UtensilsCrossed }
  ];

  const amenities = [
    { id: "wifi", label: "Free WiFi", icon: Wifi },
    { id: "pool", label: "Pool", icon: Waves },
    { id: "nightlife", label: "Nightlife", icon: Gamepad2 },
    { id: "shopping", label: "Shopping", icon: ShoppingBag }
  ];

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) 
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTrip = () => {
    if (!formData.tripName.trim()) {
      alert('Please enter a trip name');
      return;
    }

    const newTrip = addTrip({
      name: formData.tripName,
      subtitle: "Trip created! Let's start planning together.",
      startDate: formData.startDate,
      endDate: formData.endDate,
      destinations: formData.preferredPlaces ? [formData.preferredPlaces] : [],
      minBudget: formData.minBudget,
      maxBudget: formData.maxBudget,
      preferences: selectedPreferences,
      amenities: selectedAmenities,
      members: [
        { id: "1", name: "You" }
      ],
      status: "planning"
    });

    // Navigate to the trip chat with the new trip ID
    navigate(`/trip-chat/${newTrip.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-6 border-b border-border flex items-center">
          <button 
            onClick={() => navigate('/create-join')}
            className="mr-4 p-1 hover:bg-accent rounded-md transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Create trip</h1>
        </header>
        
        {/* Main Content */}
        <main className="px-6 py-6 space-y-8">
          {/* Trip Icon and Name */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <Label htmlFor="tripName" className="text-base font-medium text-foreground">
                  Trip name
                </Label>
                <Input
                  id="tripName"
                  placeholder="Enter trip name"
                  value={formData.tripName}
                  onChange={(e) => handleInputChange('tripName', e.target.value)}
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
              </div>
            </div>
          </div>
          
          {/* Preferred Dates */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-foreground">Preferred dates</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm text-muted-foreground">Start Date</Label>
                <div className="relative mt-2">
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="h-12 rounded-xl border-border bg-background pr-12"
                  />
                  {/* <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" /> */}
                </div>
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm text-muted-foreground">End Date</Label>
                <div className="relative mt-2">
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="h-12 rounded-xl border-border bg-background pr-12"
                  />
                  {/* <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" /> */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Preferred Places */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium text-foreground">Preferred places</Label>
              <span className="text-sm text-muted-foreground">Add up to 5 places</span>
            </div>
            <div className="relative">
              <Input
                placeholder="Enter destination"
                value={formData.preferredPlaces}
                onChange={(e) => handleInputChange('preferredPlaces', e.target.value)}
                className="h-12 rounded-xl border-border bg-background pr-12"
              />
              <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Budget */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-foreground">Add budget</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minBudget" className="text-sm text-muted-foreground">Min</Label>
                <Input
                  id="minBudget"
                  type="number"
                  placeholder="Min amount"
                  value={formData.minBudget}
                  onChange={(e) => handleInputChange('minBudget', e.target.value)}
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
              </div>
              <div>
                <Label htmlFor="maxBudget" className="text-sm text-muted-foreground">Max</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  placeholder="Max amount"
                  value={formData.maxBudget}
                  onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
              </div>
            </div>
          </div>
          
          {/* Travel Preferences */}
          <div className="space-y-4">
            <Label className="text-xl font-bold text-foreground">Travel Preferences</Label>
            <div className="grid grid-cols-2 gap-3">
              {travelPreferences.map((preference) => {
                const Icon = preference.icon;
                const isSelected = selectedPreferences.includes(preference.id);
                return (
                  <div
                    key={preference.id}
                    onClick={() => togglePreference(preference.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-card hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-primary' : 'text-foreground'
                      }`}>
                        {preference.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Must-Have Amenities */}
          <div className="space-y-4">
            <Label className="text-xl font-bold text-foreground">Must-Have Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity) => {
                const Icon = amenity.icon;
                const isChecked = selectedAmenities.includes(amenity.id);
                return (
                  <div key={amenity.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={amenity.id}
                      checked={isChecked}
                      onCheckedChange={() => toggleAmenity(amenity.id)}
                    />
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <Label 
                        htmlFor={amenity.id}
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        {amenity.label}
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Create Button */}
          <div className="pt-6 pb-8">
            <Button 
              onClick={handleCreateTrip}
              className="w-full h-14 text-base font-semibold rounded-2xl bg-foreground text-background hover:bg-foreground/90"
            >
              Create & Open chat
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTrip;
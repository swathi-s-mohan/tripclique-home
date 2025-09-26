import { ArrowLeft, Camera, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTrip } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlexible, setIsFlexible] = useState(false);
  const [preferredPlaces, setPreferredPlaces] = useState<string[]>([]);
  const [currentPlace, setCurrentPlace] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    tripName: '',
    startDate: '',
    endDate: '',
    minBudget: '',
    maxBudget: ''
  });

  const travelPreferences = [
    { id: "beach", label: "Beach & Relax", icon: "🏖️" },
    { id: "culture", label: "Culture & History", icon: "🏛️" },
    { id: "adventure", label: "Adventure", icon: "🧗" },
    { id: "food", label: "Food & Dining", icon: "🍽️" }
  ];

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const addPlace = () => {
    if (currentPlace.trim() && preferredPlaces.length < 5 && !preferredPlaces.includes(currentPlace.trim())) {
      setPreferredPlaces(prev => [...prev, currentPlace.trim()]);
      setCurrentPlace('');
    }
  };

  const removePlace = (place: string) => {
    setPreferredPlaces(prev => prev.filter(p => p !== place));
  };

  const handlePlaceKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPlace();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTrip = async () => {
    if (!formData.tripName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a trip name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare date ranges
      const dateRanges: string[] = [];
      if (formData.startDate && formData.endDate) {
        dateRanges.push(`${formData.startDate} to ${formData.endDate}`);
      } else if (formData.startDate) {
        dateRanges.push(formData.startDate);
      }

      // Use the preferredPlaces array directly

      // Calculate budget (use max budget if available, otherwise min budget)
      const budget = formData.maxBudget 
        ? parseInt(formData.maxBudget) 
        : formData.minBudget 
          ? parseInt(formData.minBudget) 
          : 0;

      // Prepare preferences (map to API format)
      const preferences = selectedPreferences.map(pref => {
        switch (pref) {
          case 'beach': return 'Beach & Relax';
          case 'culture': return 'Culture & History';
          case 'adventure': return 'Adventure';
          case 'food': return 'Food & Dining';
          default: return pref;
        }
      });

      // No must-haves for simplified design
      const mustHaves: string[] = [];

      const requestBody = {
        trip_name: formData.tripName.trim(),
        user_id: user?.user_id || "",
        date_ranges: dateRanges,
        preferred_places: preferredPlaces,
        budget: budget,
        preferences: preferences,
        must_haves: mustHaves
      };

      const newTrip = await createTrip(requestBody);
      
      // Navigate to the trip chat with the new trip ID
      navigate(`/trip-chat/${newTrip.id || newTrip.trip_id}?tripName=${formData.tripName}`);
      
    } catch (error) {
      console.error('Error creating trip:', error);
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-border mx-auto">
              <Camera className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <Label htmlFor="tripName" className="text-base font-medium text-foreground">
                Trip name
              </Label>
              <Input
                id="tripName"
                placeholder="Enter trip name"
                value={formData.tripName}
                onChange={(e) => handleInputChange('tripName', e.target.value)}
                className="mt-2 h-12 rounded-lg border-border bg-background"
              />
            </div>
          </div>
          
          {/* Preferred Dates */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-foreground">Preferred dates</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm text-muted-foreground">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  disabled={isFlexible}
                  className={`mt-2 h-12 rounded-lg border-border bg-background ${isFlexible ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm text-muted-foreground">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  disabled={isFlexible}
                  className={`mt-2 h-12 rounded-lg border-border bg-background ${isFlexible ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flexible"
                checked={isFlexible}
                onCheckedChange={(checked) => setIsFlexible(checked === true)}
              />
              <Label htmlFor="flexible" className="text-sm text-foreground cursor-pointer">
                I'm flexible
              </Label>
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
                placeholder="Enter a place"
                value={currentPlace}
                onChange={(e) => setCurrentPlace(e.target.value)}
                onKeyPress={handlePlaceKeyPress}
                onBlur={addPlace}
                disabled={preferredPlaces.length >= 5}
                className="h-12 rounded-lg border-border bg-background pr-12"
              />
              <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            {preferredPlaces.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferredPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    <span>{place}</span>
                    <button
                      onClick={() => removePlace(place)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                  placeholder="0"
                  value={formData.minBudget}
                  onChange={(e) => handleInputChange('minBudget', e.target.value)}
                  className="mt-2 h-12 rounded-lg border-border bg-background"
                />
              </div>
              <div>
                <Label htmlFor="maxBudget" className="text-sm text-muted-foreground">Max</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  placeholder="0"
                  value={formData.maxBudget}
                  onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                  className="mt-2 h-12 rounded-lg border-border bg-background"
                />
              </div>
            </div>
          </div>
          
          {/* Travel Preferences */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-foreground">Travel Preferences</Label>
            <div className="grid grid-cols-2 gap-3">
              {travelPreferences.map((preference) => {
                const isSelected = selectedPreferences.includes(preference.id);
                return (
                  <div
                    key={preference.id}
                    onClick={() => togglePreference(preference.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-card hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <span className="text-2xl">{preference.icon}</span>
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
          
          {/* Create Button */}
          <div className="pt-6 pb-8">
            <Button 
              onClick={handleCreateTrip}
              disabled={isLoading}
              className="w-full h-12 text-base font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
            >
              {isLoading ? 'Creating trip...' : 'Create & Open Chat'}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateTrip;
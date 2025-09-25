import { ArrowLeft, Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const CreateJoinTrip = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-6 border-b border-border flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 p-1 hover:bg-accent rounded-md transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">TripClique</h1>
        </header>
        
        {/* Main Content */}
        <main className="px-6 py-12">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-3">Start Planning</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Choose how you'd like to begin your trip planning
            </p>
          </div>
          
          {/* Action Cards */}
          <div className="space-y-4">
            {/* Create Trip Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:bg-trip-card-hover transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus className="w-6 h-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Create a Trip</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Start a new trip and invite your friends to join the planning
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-border rounded-full flex-shrink-0"></div>
              </div>
            </div>
            
            {/* Join Trip Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:bg-trip-card-hover transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Join an Existing Group</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Use an invite code to join a trip that's already being planned
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-border rounded-full flex-shrink-0"></div>
              </div>
            </div>
          </div>
          
          {/* Invite Code Input */}
          <div className="mt-8">
            <Input
              type="text"
              placeholder="Enter Invite Code"
              className="w-full h-12 rounded-xl border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateJoinTrip;
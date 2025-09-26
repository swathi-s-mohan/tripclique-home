import { useState, useEffect } from "react";
import { TripList } from "@/components/TripList";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import TripListShimmer from "@/components/TripListShimmer";
import { User, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/constants";
import { Trip } from "@/data/trips";
import { getTripsByUser } from "@/utils/api";
import amigoLogo from "@/assets/logo-amigo.png";
import { useAuth } from "@/contexts/AuthContext";
import CreateJoinTrip from "./CreateJoinTrip";

const  Index = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    navigate("/");
    setShowProfileDropdown(false);
  };

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      // Wait for auth loading to complete before checking authentication
      if (authLoading) {
        return;
      }

      if (user?.username) {
        try {
          const tripData = await getTripsByUser(user.username);
          setTrips(tripData.trips);
        } catch (error) {
          console.error("Error fetching trips:", error);
          setError("Failed to load trips");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("User not authenticated");
      }
    };
    fetchTrips();
  }, [user?.username, authLoading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-6 border-b border-border flex items-center justify-between relative">
          <img src={amigoLogo} alt="amiGo" className="h-24 w-auto" />

          {/* Profile Button */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold text-sm"
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileDropdown(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg z-50 py-2 animate-scale-in">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">
                      {user?.username || "User"}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150",
                      "hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none text-destructive"
                    )}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Trip List */}
        <main className="pb-20">
          {loading || authLoading ? (
            <TripListShimmer />
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-destructive">Error: {error}</div>
            </div>
           ) : trips.length > 0 ? (
            <TripList trips={trips} />
          ) : (
            <CreateJoinTrip showHeader={false} />
          )}
        </main>

        {/* Floating Action Button - Only show when there are trips */}
        {trips.length > 0 && <FloatingActionButton />}
      </div>
    </div>
  );
};

export default Index;

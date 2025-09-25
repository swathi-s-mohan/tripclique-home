import { TripList } from "@/components/TripList";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Index = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
    setShowProfileDropdown(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-6 border-b border-border flex items-center justify-between relative">
          <h1 className="text-2xl font-bold text-foreground">AmiGO</h1>
          
          {/* Profile Button */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <User size={20} className="text-muted-foreground" />
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
                    <p className="text-sm font-semibold text-foreground">Alex</p>
                    <p className="text-xs text-muted-foreground">alex@example.com</p>
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
          <TripList />
        </main>
        
        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </div>
  );
};

export default Index;

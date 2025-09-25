import { Users, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripCardProps {
  tripName: string;
  subtitle: string;
  timestamp: string;
  avatarContent?: React.ReactNode;
}

export const TripCard = ({ tripName, subtitle, timestamp, avatarContent }: TripCardProps) => {
  return (
    <div className="flex items-center gap-3 p-4 hover:bg-trip-card-hover transition-colors cursor-pointer">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-trip-avatar flex items-center justify-center flex-shrink-0">
        {avatarContent || <Users className="w-6 h-6 text-trip-avatar-foreground" />}
      </div>
      
      {/* Trip Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-foreground truncate">{tripName}</h3>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-sm text-timestamp">{timestamp}</span>
            <Button variant="ghost" size="sm" className="h-auto p-1 hover:bg-accent">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
      </div>
    </div>
  );
};
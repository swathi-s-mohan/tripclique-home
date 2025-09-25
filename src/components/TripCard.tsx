import { Users, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getTimeAgo } from "@/utils/timeUtils";

interface TripCardProps {
  tripId: number;
  tripName: string;
  latest_message: string;
  latest_message_at: string;
  avatarContent?: React.ReactNode;
}

export const TripCard = ({
  tripId,
  tripName,
  latest_message,
  latest_message_at,
  avatarContent,
}: TripCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleTripClick = () => {
    navigate(`/trip-chat/${tripId}?tripName=${tripName}`);
  };

  return (
    <div
      className="flex items-center gap-3 p-4 hover:bg-trip-card-hover transition-colors cursor-pointer"
      onClick={handleTripClick}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-trip-avatar flex items-center justify-center flex-shrink-0">
        {avatarContent || (
          <Users className="w-6 h-6 text-trip-avatar-foreground" />
        )}
      </div>

      {/* Trip Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-foreground truncate">{tripName}</h3>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-sm text-timestamp">{getTimeAgo(latest_message_at)}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 hover:bg-accent"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground truncate">{latest_message}</p>
      </div>
    </div>
  );
};

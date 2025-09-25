import { TripCard } from "./TripCard";
import { Users } from "lucide-react";

const trips = [
  {
    id: 1,
    name: "Bali Squad ✈️",
    subtitle: "Consensus reached on Nov 14-18. Generate...",
    timestamp: "2m ago",
    avatarContent: <Users className="w-6 h-6 text-trip-avatar-foreground" />
  },
  {
    id: 2,
    name: "Europe Adventure",
    subtitle: "Poll: Pick your preferred destination",
    timestamp: "1h ago",
    avatarContent: <Users className="w-6 h-6 text-trip-avatar-foreground" />
  },
  {
    id: 3,
    name: "Tokyo Friends 🍜",
    subtitle: "Budget discussion in progress",
    timestamp: "3h ago",
    avatarContent: <Users className="w-6 h-6 text-trip-avatar-foreground" />
  },
  {
    id: 4,
    name: "Beach Vibes 🏖️",
    subtitle: "Accommodation poll closing soon",
    timestamp: "1d ago",
    avatarContent: <Users className="w-6 h-6 text-trip-avatar-foreground" />
  }
];

export const TripList = () => {
  return (
    <div className="divide-y divide-border">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          tripName={trip.name}
          subtitle={trip.subtitle}
          timestamp={trip.timestamp}
          avatarContent={trip.avatarContent}
        />
      ))}
    </div>
  );
};
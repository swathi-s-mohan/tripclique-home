import { TripCard } from "./TripCard";
import { Trip } from "@/data/trips";

interface TripListProps {
  trips: Trip[];
}

export const TripList = ({ trips }: TripListProps) => {
  return (
    <div className="divide-y divide-border">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          tripId={trip.id}
          tripName={trip.trip_name}
          subtitle={trip.subtitle}
          timestamp={trip.timestamp}
          avatarContent={trip.avatarContent}
        />
      ))}
    </div>
  );
};
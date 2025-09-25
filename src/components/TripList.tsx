import { TripCard } from "./TripCard";
import { trips } from "@/data/trips";

export const TripList = () => {
  return (
    <div className="divide-y divide-border">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          tripId={trip.id}
          tripName={trip.name}
          subtitle={trip.subtitle}
          timestamp={trip.timestamp}
          avatarContent={trip.avatarContent}
        />
      ))}
    </div>
  );
};
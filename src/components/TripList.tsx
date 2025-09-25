import { TripCard } from "./TripCard";
import { Trip } from "@/data/trips";

interface TripListProps {
  trips: Trip[];
}

export const TripList = ({ trips }: TripListProps) => {
  console.log({ trips });
  return (
    <div className="divide-y divide-border">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          tripId={trip.id}
          tripName={trip.trip_name}
          latest_message={trip.latest_message}
          latest_message_at={trip.latest_message_at}
          avatarContent={trip.avatarContent}
        />
      ))}
    </div>
  );
};

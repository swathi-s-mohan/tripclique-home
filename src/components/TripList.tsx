import { TripCard } from "./TripCard";
import { Trip } from "@/data/trips";
import { getAvatarIcon } from "@/constants/avatarIcons";

interface TripListProps {
  trips: Trip[];
}

export const TripList = ({ trips }: TripListProps) => {
  console.log({ trips });
  return (
    <div className="divide-y divide-border">
      {trips.map((trip, index) => (
        <TripCard
          key={trip.id}
          tripId={trip.id}
          tripName={trip.trip_name}
          latest_message={trip.latest_message}
          latest_message_at={trip.latest_message_at}
          avatarIcon={getAvatarIcon(index)}
        />
      ))}
    </div>
  );
};

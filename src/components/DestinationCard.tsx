import { ConsensusCandidate } from "@/types/consensus";
import React from "react";



export const DestinationCard: React.FC<ConsensusCandidate> = ({
  image,
  place_name,
  best_time,
  why_it_matches,
  budget,
}) => {
  return (
    <div className="w-full max-w-sm bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Image Banner */}
      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={place_name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground">{place_name}</h3>

        {/* Best Months */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Best months:
          </p>
          <div className="flex flex-wrap gap-2">
            {best_time.map((month, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full border border-border"
              >
                {month}
              </span>
            ))}
          </div>
        </div>

        {/* Why it matches */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Why it matches:
          </p>
          <div className="flex flex-wrap gap-2">
            {why_it_matches.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

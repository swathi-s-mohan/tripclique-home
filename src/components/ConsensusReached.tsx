import React from "react";
import { Check, Calendar, Plane, Building2, Car, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsensusReachedData } from "@/types/consensus-reached";
import seminyakBeach from "@/assets/seminyak-beach.jpg";
import ubudCultural from "@/assets/ubud-cultural.jpg";
import nusaPenida from "@/assets/nusa-penida.jpg";

interface ConsensusReachedProps {
  data?: ConsensusReachedData;
  onStartBooking?: () => void;
  onKeepDiscussing?: () => void;
  onRegenerate?: () => void;
}

const defaultData: ConsensusReachedData = {
  tripTitle: "Bali Long Weekend",
  dates: {
    from: "Nov 14, 2025",
    to: "Nov 18, 2025",
    duration: "4 days",
    range: "Thursday to Sunday"
  },
  experiences: [
    {
      title: "Seminyak Beach Experience",
      description: "Beach relaxation, sunset views, local cuisine",
      tags: ["Beach", "Sunset", "Dining"],
      thumbnail: seminyakBeach
    },
    {
      title: "Ubud Cultural Journey",
      description: "Rice terraces, waterfalls, traditional temples",
      tags: ["Culture", "Nature", "Heritage"],
      thumbnail: ubudCultural
    },
    {
      title: "Nusa Penida Adventure",
      description: "Island hopping, scenic viewpoints, snorkeling",
      tags: ["Adventure", "Island", "Photography"],
      thumbnail: nusaPenida
    }
  ],
  costEstimate: {
    perPerson: "₹35,000",
    breakdown: {
      flight: "₹18,500",
      stay: "₹12,600",
      localTransport: "₹3,900"
    }
  }
};

export const ConsensusReached: React.FC<ConsensusReachedProps> = ({
  data = defaultData,
  onStartBooking,
  onKeepDiscussing,
  onRegenerate
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto bg-card border border-border rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          {/* Consensus Reached */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Consensus Reached
            </span>
          </div>

          {/* Trip Title */}
          <h2 className="text-xl font-semibold text-foreground">
            {data.tripTitle}
          </h2>

          {/* Trip Dates */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {data.dates.from}–{data.dates.to.split(", ")[0]}, {data.dates.to.split(", ")[1]} • {data.dates.duration} • {data.dates.range}
            </span>
          </div>
        </div>

        {/* Experiences List */}
        <div className="space-y-4">
          {data.experiences.map((experience, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={experience.thumbnail}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {experience.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {experience.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Estimation */}
        <div className="space-y-3 pt-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Estimated cost per person: {data.costEstimate.perPerson}
            </p>
            
            {/* Cost Breakdown */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Plane className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{data.costEstimate.breakdown.flight}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{data.costEstimate.breakdown.stay}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{data.costEstimate.breakdown.localTransport}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onStartBooking}
          >
            Start Booking Process
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onKeepDiscussing}
            >
              Keep Discussing
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={onRegenerate}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
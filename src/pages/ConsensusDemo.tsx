import React from "react";
import { ConsensusReached } from "@/components/ConsensusReached";

const ConsensusDemo = () => {
  const handleStartBooking = () => {
    console.log("Starting booking process...");
  };

  const handleKeepDiscussing = () => {
    console.log("Keep discussing...");
  };

  const handleRegenerate = () => {
    console.log("Regenerating suggestions...");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[390px]">
        <ConsensusReached
          onStartBooking={handleStartBooking}
          onKeepDiscussing={handleKeepDiscussing}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
};

export default ConsensusDemo;
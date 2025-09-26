import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Flight } from "@/types/consensus";
import { BookingDetailsModal } from "./BookingDetailsModal";

export const FlightCard: React.FC<Flight> = ({
  departure_time,
  origin_code,
  origin_city,
  arrival_time,
  dest_code,
  dest_city,
  duration,
  airline,
  flight_code,
  cabin,
  price_current,
  price_strike,
  stops,
  stops_text,
  travellers,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChoose = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProceedToPayment = () => {
    console.log("Proceeding to payment for flight:", flight_code);
    setIsModalOpen(false);
  };
  return (
    <div className="w-full bg-background rounded-2xl shadow-sm border border-border p-4 space-y-4">
      {/* Flight Route Section */}
      <div className="flex items-center justify-between">
        {/* Departure */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-muted-foreground">{departure_time}</div>
          <div className="text-xl font-bold text-foreground">{origin_code}</div>
          <div className="text-sm text-muted-foreground">{origin_city}</div>
        </div>

        {/* Flight Info & Arrow */}
        <div className="flex flex-col items-center space-y-1">
          <div className="text-xs font-medium text-foreground">
            {flight_code}
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-foreground rounded-full">
            <ArrowRight size={16} className="text-background" />
          </div>
          <div className="text-xs text-muted-foreground">{duration}</div>
        </div>

        {/* Arrival */}
        <div className="flex flex-col items-end">
          <div className="text-sm text-muted-foreground">{arrival_time}</div>
          <div className="text-xl font-bold text-foreground">{dest_code}</div>
          <div className="text-sm text-muted-foreground">{dest_city}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border"></div>

      {/* Flight Details */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground mb-1">Airline</div>
          <div className="font-medium text-foreground">{airline}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Flight Code</div>
          <div className="font-medium text-foreground">{flight_code}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Class</div>
          <div className="font-medium text-foreground">{cabin}</div>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-foreground">
            {price_current}
          </div>
          {price_strike && (
            <div className="text-sm text-muted-foreground line-through">
              {price_strike}
            </div>
          )}
        </div>
        <Button 
          onClick={handleChoose}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl px-8 py-3 gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Choose
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={{
          departure_time,
          origin_code,
          origin_city,
          arrival_time,
          dest_code,
          dest_city,
          duration,
          airline,
          flight_code,
          cabin,
          price_current,
          price_strike,
          stops,
          stops_text,
        } as Flight}
        onProceedToPayment={handleProceedToPayment}
        type="flight"
        travellers={travellers}
      />
    </div>
  );
};

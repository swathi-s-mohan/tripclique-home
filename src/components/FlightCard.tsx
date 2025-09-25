import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FlightCardProps {
  departureTime: string;
  departureCode: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCode: string;
  arrivalCity: string;
  flightDuration: string;
  airline: string;
  flightCode: string;
  classType: string;
  price: string;
  oldPrice?: string;
  ctaText: string;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  departureTime,
  departureCode,
  departureCity,
  arrivalTime,
  arrivalCode,
  arrivalCity,
  flightDuration,
  airline,
  flightCode,
  classType,
  price,
  oldPrice,
  ctaText
}) => {
  return (
    <div className="w-full bg-background rounded-2xl shadow-sm border border-border p-4 space-y-4">
      {/* Flight Route Section */}
      <div className="flex items-center justify-between">
        {/* Departure */}
        <div className="flex flex-col items-start">
          <div className="text-sm text-muted-foreground">{departureTime}</div>
          <div className="text-xl font-bold text-foreground">{departureCode}</div>
          <div className="text-sm text-muted-foreground">{departureCity}</div>
        </div>
        
        {/* Flight Info & Arrow */}
        <div className="flex flex-col items-center space-y-1">
          <div className="text-xs font-medium text-foreground">{flightCode}</div>
          <div className="flex items-center justify-center w-10 h-10 bg-foreground rounded-full">
            <ArrowRight size={16} className="text-background" />
          </div>
          <div className="text-xs text-muted-foreground">{flightDuration}</div>
        </div>
        
        {/* Arrival */}
        <div className="flex flex-col items-end">
          <div className="text-sm text-muted-foreground">{arrivalTime}</div>
          <div className="text-xl font-bold text-foreground">{arrivalCode}</div>
          <div className="text-sm text-muted-foreground">{arrivalCity}</div>
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
          <div className="font-medium text-foreground">{flightCode}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Class</div>
          <div className="font-medium text-foreground">{classType}</div>
        </div>
      </div>
      
      {/* Price and CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-foreground">{price}</div>
          {oldPrice && (
            <div className="text-sm text-muted-foreground line-through">{oldPrice}</div>
          )}
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl px-8 py-3 gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          {ctaText}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
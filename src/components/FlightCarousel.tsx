import React from 'react';
import { Carousel } from './Carousel';
import { FlightCard } from './FlightCard';

interface FlightOption {
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

interface FlightCarouselProps {
  flights: FlightOption[];
}

export const FlightCarousel: React.FC<FlightCarouselProps> = ({ flights }) => {
  return (
    <div className="w-full">
      <Carousel 
        showDots={true} 
        loop={false}
        className="w-full"
      >
        {flights.map((flight, index) => (
          <FlightCard 
            key={index}
            {...flight}
          />
        ))}
      </Carousel>
    </div>
  );
};

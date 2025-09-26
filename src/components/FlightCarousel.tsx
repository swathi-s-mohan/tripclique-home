import React from 'react';
import { Carousel } from './Carousel';
import { FlightCard } from './FlightCard';
import { Flight } from '@/types/consensus';


interface FlightCarouselProps {
  flights: Flight[];
  travellers: number;
}

export const FlightCarousel: React.FC<FlightCarouselProps> = ({ flights, travellers }) => {
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
            travellers={travellers}
          />
        ))}
      </Carousel>
    </div>
  );
};

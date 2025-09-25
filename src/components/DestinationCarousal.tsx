import React from 'react';
import { Carousel } from './Carousel';
import { DestinationCard } from './DestinationCard';
import { ConsensusCandidate } from '@/types/consensus';



interface DestinationCarouselProps {
  destinations: ConsensusCandidate[];
}

export const DestinationCarousel: React.FC<DestinationCarouselProps> = ({ destinations }) => {
  return (
    <div className="w-full">
      <Carousel 
        showDots={true} 
        loop={false}
        className="w-full"
      >
        {destinations.map((destination, index) => (
          <DestinationCard 
            key={index}
            {...destination}
          />
        ))}
      </Carousel>
    </div>
  );
};

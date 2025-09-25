import React from 'react';
import { Carousel } from './Carousel';
import { HotelCard } from './HotelCard';

interface HotelOption {
  imageUrl: string;
  title: string;
  dateRange: string;
  description: string;
  rating: number;
  isTopRated?: boolean;
  whyItMatches?: string[];
  price: string;
  ctaText: string;
}

interface HotelCarouselProps {
  hotels: HotelOption[];
}

export const HotelCarousel: React.FC<HotelCarouselProps> = ({ hotels }) => {
  return (
    <div className="w-full">
      <Carousel 
        showDots={true} 
        loop={false}
        className="w-full"
      >
        {hotels.map((hotel, index) => (
          <HotelCard 
            key={index}
            {...hotel}
          />
        ))}
      </Carousel>
    </div>
  );
};

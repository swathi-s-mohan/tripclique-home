import React from "react";
import { Carousel } from "./Carousel";
import { HotelCard } from "./HotelCard";
import { Hotel } from "@/types/consensus";

interface HotelCarouselProps {
  hotels: Hotel[];
  travellers: number;
}

export const HotelCarousel: React.FC<HotelCarouselProps> = ({ hotels, travellers }) => {
  return (
    <div className="w-full">
      <Carousel showDots={true} loop={false} className="w-full">
        {(hotels || [])?.map((hotel, index) => (
          <HotelCard key={index} {...hotel} travellers={travellers} />
        ))}
      </Carousel>
    </div>
  );
};

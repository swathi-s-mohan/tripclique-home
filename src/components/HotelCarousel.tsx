import React from "react";
import { Carousel } from "./Carousel";
import { HotelCard } from "./HotelCard";
import { Hotel } from "@/types/consensus";

interface HotelCarouselProps {
  hotels: Hotel[];
}

export const HotelCarousel: React.FC<HotelCarouselProps> = ({ hotels }) => {
  return (
    <div className="w-full">
      <Carousel showDots={true} loop={false} className="w-full">
        {(hotels || [])?.map((hotel, index) => (
          <HotelCard key={index} {...hotel} />
        ))}
      </Carousel>
    </div>
  );
};

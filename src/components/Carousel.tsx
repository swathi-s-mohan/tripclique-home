import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode[];
  showDots?: boolean;
  loop?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  showDots = true,
  loop = false,
  className
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    slidesToScroll: 1,
    skipSnaps: false,
    duration: 20,
    dragThreshold: 10
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, []);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className={cn("w-full", className)}>
      {/* Carousel Container */}
      <div 
        className="overflow-hidden cursor-grab active:cursor-grabbing" 
        ref={emblaRef}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <div className="flex gap-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-none min-w-0 w-full select-none"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-200",
                index === selectedIndex
                  ? "bg-foreground"
                  : "bg-muted-foreground/30"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
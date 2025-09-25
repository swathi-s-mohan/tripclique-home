import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';

interface HotelCardProps {
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

export const HotelCard: React.FC<HotelCardProps> = ({
  imageUrl,
  title,
  dateRange,
  description,
  rating,
  isTopRated = false,
  whyItMatches = [],
  price,
  ctaText
}) => {
  return (
    <div className="w-full max-w-sm bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Image Banner with Overlays */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Rating Overlay - Top Left */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-lg">
          <span className="text-sm font-medium">Rating</span>
          <div className="flex items-center gap-0.5">
            <span className="text-sm font-bold">{rating}</span>
            <Star size={14} fill="currentColor" className="text-yellow-400" />
          </div>
        </div>
        
        {/* Top Rated Badge - Top Right */}
        {isTopRated && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black text-white border-0">
              Top Rated
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title and Date Range */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {dateRange}
          </p>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        {/* Why it matches - only show if tags provided */}
        {whyItMatches.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Why it matches:
            </p>
            <div className="flex flex-wrap gap-2">
              {whyItMatches.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xl font-bold text-foreground">
            {price}
          </div>
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 gap-1">
            {ctaText}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
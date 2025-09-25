import React from 'react';

interface DestinationCardProps {
  imageUrl: string;
  title: string;
  bestMonths: string[];
  tags: string[];
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  imageUrl,
  title,
  bestMonths,
  tags
}) => {
  return (
    <div className="w-full max-w-sm bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Image Banner */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-foreground">
          {title}
        </h3>
        
        {/* Best Months */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Best months:
          </p>
          <div className="flex flex-wrap gap-2">
            {bestMonths.map((month, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full border border-border"
              >
                {month}
              </span>
            ))}
          </div>
        </div>
        
        {/* Why it matches */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Why it matches:
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
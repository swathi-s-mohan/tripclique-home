import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, Plane, Building2, Clock, MapPin, ChevronDown, Train } from "lucide-react";

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ItineraryModal = ({ isOpen, onClose }: ItineraryModalProps) => {
  const itineraryData = [
    {
      day: 1,
      date: "Sat, Sep 27",
      title: "🚆 Kochi to Calicut & Flight to Ahmedabad",
      stops: [
        {
          id: 1,
          title: "Ernakulam Junction Railway Station",
          time: "8:00 AM - 8:15 AM",
          image: "/placeholder.svg",
          action: "Link",
          actionType: "secondary",
          distance: "939 mi"
        },
        {
          id: 2,
          title: "Biznotel By Pride Motera",
          time: "Check-in 3:00 PM (2 nights)",
          image: "/placeholder.svg",
          action: "Book",
          actionType: "primary",
          distance: "2.66 mi"
        },
        {
          id: 3,
          title: "Sardar Vallabhbhai Patel Airport",
          time: "5:00 PM - 7:30 PM",
          image: "/placeholder.svg",
          action: "Details",
          actionType: "secondary",
          distance: "5.04 mi"
        }
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[390px] max-h-[80vh] p-0 rounded-xl overflow-hidden">
        {/* Sticky Header */}
        <DialogHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Trip Itinerary</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <Accordion
            type="single"
            collapsible
            defaultValue={`day-${itineraryData[0].day}`}
            className="px-4 pb-6"
          >
            {itineraryData.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`} className="border-none">
                <AccordionTrigger className="hover:no-underline py-4 px-2">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Day {day.day}</span>
                      <span className="text-sm">{day.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{day.date}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-4">
                  <div className="space-y-4">
                    {day.stops.map((stop, index) => (
                      <div key={stop.id}>
                        {/* Stop Card */}
                        <div className="flex gap-3 p-4 bg-card rounded-xl shadow-sm border">
                          {/* Thumbnail */}
                          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                            <img 
                              src={stop.image} 
                              alt={stop.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 truncate">{stop.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{stop.time}</span>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <div className="flex-shrink-0">
                            <Button
                              variant={stop.actionType === 'primary' ? 'default' : 'outline'}
                              size="sm"
                              className={`rounded-full px-4 h-8 text-xs ${
                                stop.actionType === 'primary' 
                                  ? 'bg-foreground text-background hover:bg-foreground/90' 
                                  : 'border-muted-foreground/30 hover:bg-muted'
                              }`}
                            >
                              {stop.action}
                            </Button>
                          </div>
                        </div>
                        
                        {/* Distance to next stop */}
                        {index < day.stops.length - 1 && (
                          <div className="pl-8 py-2">
                            <span className="text-xs text-muted-foreground">{stop.distance}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};
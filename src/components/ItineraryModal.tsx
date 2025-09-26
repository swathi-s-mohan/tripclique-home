import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plane, Building2, Clock, MapPin, ChevronDown, Train } from "lucide-react";
import { getItinerary } from "@/utils/api";

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ItineraryStop = {
  id: number | string;
  title: string;
  time: string;
  image?: string;
  action?: string;
  actionType?: "primary" | "secondary";
  distance?: string;
};

type ItineraryDay = {
  day: number;
  date: string;
  title: string;
  stops: ItineraryStop[];
};

export const ItineraryModal = ({ isOpen, onClose }: ItineraryModalProps) => {
  const [itineraryData, setItineraryData] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;

    const normalizeStops = (stops: unknown[] | undefined): ItineraryStop[] => {
      if (!Array.isArray(stops)) return [];
      return stops.map((raw, idx) => {
        const s = raw as Record<string, unknown>;
        const get = (k: string) => s[k] as string | undefined;
        return {
          id: (s["id"] as number | string) ?? idx,
          title: get("title") ?? get("name") ?? get("place") ?? get("activity") ?? "",
          time: get("time") ?? get("time_range") ?? get("when") ?? "",
          image: get("image") ?? get("thumbnail") ?? undefined,
          action: get("action") ?? get("cta") ?? undefined,
        actionType:
            (get("actionType") === "primary" || get("action_type") === "primary")
              ? "primary"
              : "secondary",
          distance: get("distance") ?? (s["km_away"] ? `${s["km_away"] as string} km` : undefined),
        };
      });
    };

    const parseDays = (res: unknown): ItineraryDay[] => {
      const r = res as Record<string, unknown>;
      const candidate =
        (r?.["days"] as unknown) ??
        (r?.["itinerary"] as unknown)?.["days"] ??
        r?.["itinerary"] ??
        (r?.["data"] as Record<string, unknown>)?.["days"] ??
        (Array.isArray(res) ? res : []);
      if (!Array.isArray(candidate)) return [];
      return (candidate as unknown[]).map((raw, i: number) => {
        const d = raw as Record<string, unknown>;
        const get = (k: string) => d[k] as string | undefined;
        return {
          day: Number(d["day"]) || i + 1,
          date: get("date") ?? get("when") ?? "",
          title: get("title") ?? get("name") ?? "",
          stops: normalizeStops((d["stops"] as unknown[]) ?? (d["items"] as unknown[]) ?? (d["activities"] as unknown[])),
        };
      });
    };

    (async () => {
      setLoading(true);
      try {
        const res = await getItinerary();
        const days = parseDays(res);
        if (mounted) setItineraryData(days);
      } catch {
        if (mounted) setItineraryData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[390px] h-[80vh] p-0 rounded-xl overflow-hidden flex flex-col fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Trip Itinerary</DialogTitle>
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
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              {loading ? (
                <div className="py-8 text-center text-sm text-muted-foreground">Loading itinerary...</div>
              ) : (
              <Accordion
                type="single"
                collapsible
                defaultValue={itineraryData.length > 0 ? `day-${itineraryData[0].day}` : undefined}
                className="space-y-2"
              >
             {itineraryData.map((day) => (
               <AccordionItem key={day.day} value={`day-${day.day}`} className="border-none">
                 <AccordionTrigger className="hover:no-underline py-2 px-1 [&>svg]:w-3 [&>svg]:h-3">
                   <div className="flex items-center justify-between w-full mr-1">
                     <div className="flex items-center gap-1.5 min-w-0">
                       <span className="font-medium text-xs">Day {day.day}</span>
                       <span className="text-[10px] text-muted-foreground truncate">{day.title}</span>
                     </div>
                     <span className="text-[10px] text-muted-foreground flex-shrink-0">{day.date}</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pt-0 pb-3">
                   <div className="space-y-2">
                     {day.stops.map((stop, index) => (
                       <div key={stop.id}>
                         {/* Stop Card */}
                         <div className="flex gap-2 p-2.5 bg-card rounded-lg shadow-sm border">
                           {/* Thumbnail */}
                           <div className="w-8 h-8 rounded-md bg-muted overflow-hidden flex-shrink-0">
                             <img 
                               src={stop.image} 
                               alt={stop.title}
                               className="w-full h-full object-cover"
                             />
                           </div>
                           
                           {/* Content */}
                           <div className="flex-1 min-w-0">
                             <h4 className="font-medium text-[10px] mb-0.5 truncate">{stop.title}</h4>
                             <div className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                               <Clock className="w-2 h-2" />
                               <span>{stop.time}</span>
                             </div>
                           </div>
                           
                           {/* Action Button */}
                           <div className="flex-shrink-0">
                             <Button
                               variant={stop.actionType === 'primary' ? 'default' : 'outline'}
                               size="sm"
                               className={`rounded-full px-2 h-5 text-[9px] font-medium ${
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
                           <div className="pl-4 py-0.5">
                             <span className="text-[9px] text-muted-foreground">{stop.distance}</span>
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                 </AccordionContent>
               </AccordionItem>
              ))}
              </Accordion>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
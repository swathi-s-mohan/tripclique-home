import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plane, Building2 } from "lucide-react";
import { getBookings } from "@/utils/api";

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingsModal = ({ isOpen, onClose }: BookingsModalProps) => {
  type FlightBooking = {
    flight_code: string;
    route: string;
    date: string;
    price_current: string;
    type?: string;
  };

  const [flights, setFlights] = useState<FlightBooking[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  type HotelBooking = {
    hotel_name: string;
    rating?: number;
    location?: string;
    image?: string;
    summary?: string;
    stay_check_in: string;
    stay_check_out: string;
    stay_nights?: number;
    travelers?: number;
    rooms?: number;
    room?: { type?: string };
    currency?: string;
    price_breakdown?: { total?: string };
  };
  const [hotels, setHotels] = useState<HotelBooking[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    (async () => {
      try {
        setLoadingFlights(true);
        setLoadingHotels(true);
        const res = await getBookings();
        const list: FlightBooking[] = (res?.flights as FlightBooking[]) || [];
        if (mounted) setFlights(list);
        const hotelsList: HotelBooking[] = (res?.hotels as HotelBooking[]) || [];
        if (mounted) setHotels(hotelsList);
      } catch (e) {
        if (mounted) {
          setFlights([]);
          setHotels([]);
        }
      } finally {
        if (mounted) {
          setLoadingFlights(false);
          setLoadingHotels(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-0 rounded-xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-center">Bookings</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Flight Bookings (from API) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Flight Bookings
            </h3>

            {loadingFlights && (
              <div className="text-sm text-muted-foreground">Loading flights...</div>
            )}

            {!loadingFlights && flights.length === 0 && (
              <div className="text-sm text-muted-foreground">No flights found.</div>
            )}

            {!loadingFlights &&
              flights.map((f, idx) => (
                <div key={`${f.flight_code}-${idx}`} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plane className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium truncate">{f.route}</h4>
                        <p className="text-sm text-muted-foreground truncate">{new Date(f.date).toDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium whitespace-nowrap">{f.flight_code}</p>
                      <p className="text-sm font-semibold whitespace-nowrap">{f.price_current}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Hotel Bookings (from API) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Hotel Bookings
            </h3>

            {loadingHotels && (
              <div className="text-sm text-muted-foreground">Loading hotels...</div>
            )}

            {!loadingHotels && hotels.length === 0 && (
              <div className="text-sm text-muted-foreground">No hotels found.</div>
            )}

            {!loadingHotels &&
              hotels.map((h, idx) => {
                const ci = new Date(h.stay_check_in);
                const co = new Date(h.stay_check_out);
                const sameMonth = ci.getMonth() === co.getMonth();
                const monthShort = ci.toLocaleString("en-US", { month: "short" });
                const endMonthShort = co.toLocaleString("en-US", { month: "short" });
                const dateRange = sameMonth
                  ? `${monthShort} ${ci.getDate()}–${co.getDate()}`
                  : `${monthShort} ${ci.getDate()} – ${endMonthShort} ${co.getDate()}`;
                const roomType = h.room?.type ? ` • ${h.room.type}` : "";
                const nights = h.stay_nights ?? Math.max(
                  1,
                  Math.round((co.getTime() - ci.getTime()) / (1000 * 60 * 60 * 24))
                );
                const rawTotal = h.price_breakdown?.total || "";
                const cleanedTotal = rawTotal
                  .replace(/\s*\/night.*$/i, "")
                  .replace(/per\s*night/gi, "")
                  .trim();

                return (
                  <div key={`${h.hotel_name}-${idx}`} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium truncate">{h.hotel_name}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {dateRange}{roomType}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold whitespace-nowrap">{cleanedTotal}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{nights} nights</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Booking Details */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Booking Reference:</span>
              <Button variant="link" className="text-blue-600 h-auto p-0 text-sm font-medium">
                AI2024BLI789
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                Confirmed
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
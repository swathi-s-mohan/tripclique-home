import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Building2, Plane, Star } from "lucide-react";

interface HotelBooking {
  type: "hotel";
  name: string;
  location: string;
  rating: number;
  category: string;
  pricePerNight: number;
  travelers: number;
  checkIn: string;
  checkOut: string;
  nights: number;
}

interface FlightBooking {
  type: "flight";
  name: string;
  route: string;
  duration: string;
  airline: string;
  pricePerPerson: number;
  passengers: number;
  departureTime: string;
  arrivalTime: string;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: HotelBooking | FlightBooking;
  onProceedToPayment: () => void;
}

export const BookingDetailsModal = ({ 
  isOpen, 
  onClose, 
  booking, 
  onProceedToPayment 
}: BookingDetailsModalProps) => {
  const isHotel = booking.type === "hotel";
  const isFlight = booking.type === "flight";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    if (isHotel) {
      const hotelBooking = booking as HotelBooking;
      return hotelBooking.pricePerNight * hotelBooking.nights * hotelBooking.travelers;
    } else {
      const flightBooking = booking as FlightBooking;
      return flightBooking.pricePerPerson * flightBooking.passengers;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[390px] p-0 rounded-xl">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-bold">Booking Details</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Booking Item Section */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              {isHotel ? (
                <Building2 className="w-6 h-6 text-foreground" />
              ) : (
                <Plane className="w-6 h-6 text-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-1">
                {booking.name}
              </h3>
              <div className="text-sm text-muted-foreground mb-2">
                {isHotel ? (
                  <div className="flex items-center gap-1">
                    <span>{(booking as HotelBooking).location}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span>{(booking as HotelBooking).rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>rating</span>
                    </div>
                    <span>•</span>
                    <span>{(booking as HotelBooking).category}</span>
                  </div>
                ) : (
                  <div>
                    <span>{(booking as FlightBooking).route}</span>
                    <span className="mx-1">•</span>
                    <span>{(booking as FlightBooking).duration}</span>
                    <span className="mx-1">•</span>
                    <span>{(booking as FlightBooking).airline}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-semibold text-lg">
                {isHotel 
                  ? `${formatPrice((booking as HotelBooking).pricePerNight)}/night`
                  : `${formatPrice((booking as FlightBooking).pricePerPerson)}/person`
                }
              </div>
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-muted/50 rounded-lg p-4 shadow-sm space-y-3">
            <h4 className="font-semibold text-base mb-3">Booking Summary</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Item:</span>
                <span className="text-sm font-medium">{booking.name}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type:</span>
                <span className="text-sm font-medium capitalize">{booking.type}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {isHotel ? "Travelers:" : "Passengers:"}
                </span>
                <span className="text-sm font-medium">
                  {isHotel 
                    ? `${(booking as HotelBooking).travelers} people`
                    : `${(booking as FlightBooking).passengers} passengers`
                  }
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {isHotel ? "Dates:" : "Times:"}
                </span>
                <span className="text-sm font-medium">
                  {isHotel ? (
                    <div className="text-right">
                      <div>{(booking as HotelBooking).checkIn}</div>
                      <div className="text-xs text-muted-foreground">to {(booking as HotelBooking).checkOut}</div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div>{(booking as FlightBooking).departureTime}</div>
                      <div className="text-xs text-muted-foreground">to {(booking as FlightBooking).arrivalTime}</div>
                    </div>
                  )}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm font-semibold">Total:</span>
                <span className="text-lg font-bold">
                  {formatPrice(calculateTotal())}
                  {isHotel && `/${(booking as HotelBooking).nights} nights`}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By proceeding, you agree to the booking terms and conditions. Free 
              cancellation up to 24 hours before travel.
            </p>
            
            <Button 
              onClick={onProceedToPayment}
              className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
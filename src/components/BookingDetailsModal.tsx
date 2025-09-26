import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Building2, Plane, Star } from "lucide-react";
import { Flight } from "@/types/consensus";
import { Hotel } from "@/types/consensus";
import { PaymentModal } from "./PaymentModal";
import { useState } from "react";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Flight | Hotel;
  onProceedToPayment: () => void;
  type: "hotel" | "flight";
  travellers: number;
}

export const BookingDetailsModal = ({
  isOpen,
  onClose,
  booking,
  onProceedToPayment,
  type,
  travellers,
}: BookingDetailsModalProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const isHotel = type === "hotel";
  const isFlight = type === "flight";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    if (isHotel) {
      const hotelBooking = booking as Hotel;
      return parseFloat(hotelBooking.price_per_night);
    } else {
      const flightBooking = booking as Flight;
      return parseFloat(flightBooking.price_current);
    }
  };

  const transformBookingForPayment = () => {
    if (isHotel) {
      const hotelBooking = booking as Hotel;
      return {
        type: "hotel" as const,
        name: hotelBooking.name,
        pricePerNight: hotelBooking.price_per_night,
        travelers: travellers,
        nights: 1, // Default to 1 night, could be made configurable
      };
    } else {
      const flightBooking = booking as Flight;
      return {
        type: "flight" as const,
        name: `${flightBooking.origin_city} → ${flightBooking.dest_city}`,
        pricePerPerson: flightBooking.price_current,
        passengers: travellers,
      };
    }
  };

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };

  const handleBackToDetails = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    onProceedToPayment();
  };

  const handleClose = () => {
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[390px] p-0 rounded-xl left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  my-4">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-bold">
            Booking Details
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 sm:px-6 pb-6 space-y-6 overflow-x-hidden">
          {/* Booking Item Section */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              {isHotel ? (
                <Building2 className="w-6 h-6 text-foreground" />
              ) : (
                <Plane className="w-6 h-6 text-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
                {isHotel
                  ? (booking as Hotel).name
                  : (booking as Flight).airline}
              </h3>
              <div className="text-sm text-muted-foreground mb-2">
                {isHotel ? (
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="truncate">{(booking as Hotel).location}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span>{(booking as Hotel).rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>rating</span>
                    </div>
                    <span>•</span>
                    <span className="truncate">{(booking as Hotel).type}</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1">
                      {(booking as Flight).origin_code}{" "}
                      <span className="pb-1">→</span>{" "}
                      {(booking as Flight).dest_code}
                    </div>

                    <span>{(booking as Flight).duration}</span>
                    <span className="mx-1">•</span>
                    <span>{(booking as Flight).airline}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0 min-w-0">
              <div className="font-semibold text-lg">
                {isHotel ? (
                  <span className="break-words">{`${(booking as Hotel).price_per_night}/night`}</span>
                ) : (
                  <div className="flex flex-col">
                    {(booking as Flight).price_strike && (
                      <div className="text-sm text-muted-foreground line-through">
                        {(booking as Flight).price_strike}
                      </div>
                    )}
                    <div className="text-2xl font-bold text-foreground">
                      {(booking as Flight).price_current}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-muted/50 rounded-lg p-4 shadow-sm space-y-3 overflow-x-hidden">
            <h4 className="font-semibold text-base mb-3">Booking Summary</h4>

            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm text-muted-foreground flex-shrink-0">Item:</span>
                <span className="text-sm font-medium text-right truncate">
                  {isHotel
                    ? (booking as Hotel).name
                    : `${(booking as Flight).origin_city} → ${
                        (booking as Flight).dest_city
                      }`}
                </span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-sm text-muted-foreground flex-shrink-0">Type:</span>
                <span className="text-sm font-medium capitalize text-right truncate">
                  {isHotel ? (booking as Hotel).type : "Flight"}
                </span>
              </div>

              {isHotel && (
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm text-muted-foreground flex-shrink-0">
                    Location:
                  </span>
                  <span className="text-sm font-medium text-right truncate">
                    {(booking as Hotel).location}
                  </span>
                </div>
              )}

              {isFlight && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Flight:</span>
                  <span className="text-sm font-medium">
                    {(booking as Flight).flight_code}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center gap-2">
                <span className="text-sm text-muted-foreground flex-shrink-0">
                  {isHotel ? "Rating:" : "Cabin:"}
                </span>
                <span className="text-sm font-medium text-right">
                  {isHotel ? (
                    <div className="flex items-center gap-1 justify-end">
                      <span>{(booking as Hotel).rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  ) : (
                    <span>{(booking as Flight).cabin}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center gap-2">
                <span className="text-sm text-muted-foreground flex-shrink-0">
                  {isHotel ? "Date:" : "Times:"}
                </span>
                <span className="text-sm font-medium text-right">
                  {isHotel ? (
                    <div className="text-right">
                      <div className="break-words">Check-in & Check-out dates</div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div>{(booking as Flight).departure_time}</div>
                      <div className="text-xs text-muted-foreground">
                        to {(booking as Flight).arrival_time}
                      </div>
                    </div>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border gap-2">
                <span className="text-sm font-semibold flex-shrink-0">Total:</span>
                <span className="text-lg font-bold text-right break-words">
                  {isHotel
                    ? `${(booking as Hotel).price_per_night}/night`
                    : (booking as Flight).price_current}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed break-words">
              By proceeding, you agree to the booking terms and conditions. Free
              cancellation up to 24 hours before travel.
            </p>

            <Button
              onClick={handleProceedToPayment}
              className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Payment Modal */}
    <PaymentModal
      isOpen={showPaymentModal}
      onClose={handleClose}
      booking={transformBookingForPayment()}
      onBackToDetails={handleBackToDetails}
      onPaymentComplete={handlePaymentComplete}
    />
  </>
  );
};

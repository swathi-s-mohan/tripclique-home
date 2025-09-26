import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { BookingConfirmationModal } from "./BookingConfirmationModal";

interface HotelBooking {
  type: "hotel";
  name: string;
  pricePerNight: string;
  travelers: number;
  nights: number;
}

interface FlightBooking {
  type: "flight";
  name: string;
  pricePerPerson: string;
  passengers: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: HotelBooking | FlightBooking;
  onBackToDetails: () => void;
  onPaymentComplete: () => void;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  booking,
  onBackToDetails,
  onPaymentComplete,
}: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const parsePrice = (priceString: string) => {
    // Remove currency symbols, commas, and convert to number
    return Number(priceString.replace(/[₹$€£,]/g, ""));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    if (booking.type === "hotel") {
      const hotelBooking = booking as HotelBooking;
      return (
        parsePrice(hotelBooking.pricePerNight) *
        Math.ceil(hotelBooking.travelers / 2)
      );
    } else {
      const flightBooking = booking as FlightBooking;
      return (
        parsePrice(flightBooking.pricePerPerson) * flightBooking.passengers
      );
    }
  };

  const getPriceDisplay = () => {
    if (booking.type === "hotel") {
      return `${(booking as HotelBooking).pricePerNight}/night`;
    } else {
      return `${(booking as FlightBooking).pricePerPerson}/person`;
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      // 16 digits + 3 spaces
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const generateBookingReference = () => {
    const prefix = booking.type === "hotel" ? "HTL" : "FLT";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handlePayment = () => {
    // Here you would typically integrate with a payment processor
    const reference = generateBookingReference();
    setBookingReference(reference);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onPaymentComplete();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[390px] p-0 rounded-xl">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
            <DialogTitle className="text-xl font-bold">Payment</DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Booking Info Box */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 text-center space-y-3 shadow-soft">
              <div className="text-2xl">
                {booking.type === "hotel" ? "🏨" : "✈️"}
              </div>
              <h3 className="font-bold text-xl text-foreground">{booking.name}</h3>
              <p className="text-3xl font-bold text-primary">{getPriceDisplay()}</p>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              {/* Card Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Card Number
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="h-12 rounded-lg"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Expiry
                  </label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="h-12 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    CVV
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={handleCvvChange}
                    className="h-12 rounded-lg"
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="h-12 rounded-lg"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-success/10 border border-success/30 rounded-2xl p-4 flex items-center gap-3 shadow-soft">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-success" />
              </div>
              <p className="text-sm text-success font-medium">
                Your payment is secured with 256-bit SSL encryption
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                className="w-full h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg shadow-floating hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                <Shield className="w-5 h-5 mr-3" />
                Pay {formatPrice(calculateTotal())}
                {booking.type === "hotel" &&
                  `/night for ${Math.ceil(booking.travelers / 2)} rooms`}
              </Button>

              <Button
                variant="outline"
                onClick={onBackToDetails}
                className="w-full h-12 rounded-full border-2 hover:bg-muted/50"
              >
                Back to Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BookingConfirmationModal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        bookingReference={bookingReference}
        bookingType={booking.type}
        autoCloseDelay={5000}
      />
    </>
  );
};

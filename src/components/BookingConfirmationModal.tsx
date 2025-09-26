import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import { useEffect } from "react";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingReference: string;
  bookingType: "hotel" | "flight";
  autoCloseDelay?: number; // in milliseconds, default 5000
}

export const BookingConfirmationModal = ({
  isOpen,
  onClose,
  bookingReference,
  bookingType,
  autoCloseDelay = 5000,
}: BookingConfirmationModalProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseDelay]);

  const getBookingTypeText = () => {
    return bookingType === "hotel" ? "hotel" : "flight";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[390px] p-0 rounded-xl">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 pb-4">
          <DialogTitle className="text-xl font-bold">
            Booking Confirmed
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-8 space-y-8">
          {/* Confirmation Section */}
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>

            {/* Confirmation Text */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                Booking Confirmed!
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-[280px]">
                Your {getBookingTypeText()} booking has been confirmed. You'll
                receive a confirmation email with all the details.
              </p>
            </div>
          </div>

          {/* Booking Reference */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-center">
            <p className="text-sm text-muted-foreground font-medium">
              Booking Reference
            </p>
            <p className="text-xl font-bold tracking-wider text-foreground">
              {bookingReference}
            </p>
          </div>

          {/* Auto-close Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              This window will close automatically
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
            <div className="w-24 h-24 rounded-full bg-success flex items-center justify-center shadow-floating animate-scale-in">
              <Check className="w-12 h-12 text-success-foreground stroke-[3]" />
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
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 space-y-3 text-center shadow-soft">
            <p className="text-sm text-muted-foreground font-semibold">
              Booking Reference
            </p>
            <p className="text-2xl font-bold tracking-wider text-primary">
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

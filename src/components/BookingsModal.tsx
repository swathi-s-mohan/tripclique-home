import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plane, Building2 } from "lucide-react";

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingsModal = ({ isOpen, onClose }: BookingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] p-0 rounded-xl">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Bookings</DialogTitle>
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

        <div className="px-6 pb-6 space-y-6">
          {/* Flight Bookings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Flight Bookings
            </h3>
            
            {/* Outbound Flight */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Delhi → Bali</h4>
                    <p className="text-sm text-muted-foreground">Thu, Nov 14 • 2:00 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">AI 314</p>
                  <p className="text-sm font-semibold">₹18,500</p>
                </div>
              </div>
            </div>

            {/* Return Flight */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white transform rotate-180" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bali → Delhi</h4>
                    <p className="text-sm text-muted-foreground">Sun, Nov 17 • 5:30 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">AI 315</p>
                  <p className="text-sm font-medium">Included</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Bookings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Hotel Bookings
            </h3>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Seminyak Beach Resort</h4>
                  <p className="text-sm text-muted-foreground">May 1–6 • Deluxe Room</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">$4,200 total</p>
                <p className="text-xs text-muted-foreground">5 nights</p>
              </div>
            </div>
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
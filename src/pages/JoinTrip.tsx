import React, { useState } from "react";
import { ArrowLeft, UserPlus, Users, Copy, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const JoinTrip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInviteCode(value);
    setIsError(false);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInviteCode(text.toUpperCase());
      setIsError(false);
      toast({
        title: "Code pasted",
        description: "Invite code has been pasted from clipboard.",
      });
    } catch (err) {
      toast({
        title: "Unable to paste",
        description: "Please paste the code manually.",
        variant: "destructive",
      });
    }
  };

  const handleClearCode = () => {
    setInviteCode("");
    setIsError(false);
  };

  const handleFindGroup = async () => {
    if (!inviteCode.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate invalid code for demonstration
      if (inviteCode === "INVALID" || inviteCode.length < 6) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      // Simulate successful join
      setIsLoading(false);
      toast({
        title: "Group found!",
        description: `Joining trip with code ${inviteCode}...`,
      });
      
      // Navigate to trip chat with the code
      navigate(`/trip-chat/${inviteCode.toLowerCase()}`);
    }, 1500);
  };

  const isCodeValid = inviteCode.trim().length >= 6;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">Join a Trip</h1>
        <div className="w-10" /> {/* Spacer for center alignment */}
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-12 space-y-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-muted rounded-full">
          <UserPlus className="h-8 w-8 text-muted-foreground" />
        </div>

        {/* Title and Description */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Join an Existing Group
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Enter the invite code shared by your friends to join their trip planning group.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inviteCode" className="text-sm font-medium text-foreground">
              Invite Code
            </Label>
            <div className="relative">
              <Input
                id="inviteCode"
                type="text"
                placeholder="Enter Invite Code"
                value={inviteCode}
                onChange={handleInviteCodeChange}
                className={`pr-20 text-center font-mono text-lg tracking-wider justify-center ${
                  isError 
                    ? "border-destructive bg-destructive/10 text-destructive focus-visible:ring-destructive" 
                    : ""
                }`}
                maxLength={8}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                {inviteCode && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClearCode}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {isError ? (
              <p className="text-sm text-destructive">Invalid code</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Codes are usually 6-8 characters long
              </p>
            )}
          </div>

          {/* Action Button */}
          <Button
            onClick={handleFindGroup}
            disabled={!isCodeValid || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              "Finding Group..."
            ) : isCodeValid ? (
              <>
                <Users className="h-4 w-4 mr-2" />
                Find Group
              </>
            ) : (
              "Enter invite code"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinTrip;
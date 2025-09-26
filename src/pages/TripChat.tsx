import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getTripById } from "@/data/trips";
import {
  getChatsByTripId,
  getFlights,
  getHotels,
  getMembers,
  sendAiAnalysis,
  sendChatMessage,
} from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  Send,
  Bot,
  Users,
  MoreVertical,
  Copy,
  Share,
  BellOff,
  Download,
  Settings,
  LogOut,
  Calendar,
  Plane,
  FileText,
  Brain,
  MapIcon,
  Sparkles,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { DropdownMenu } from "@/components/DropdownMenu";
import { ItineraryModal } from "@/components/ItineraryModal";
import { Consensus, Hotel } from "@/types/consensus";
import { DestinationCarousel } from "@/components/DestinationCarousal";
import ChatShimmer from "@/components/ChatShimmer";
import { HotelCarousel } from "@/components/HotelCarousel";
import { FlightCarousel } from "@/components/FlightCarousel";
import { ConsensusReached } from "@/components/ConsensusReached";
import { BookingsModal } from "@/components/BookingsModal";

const TripChat = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [searchParams] = useSearchParams();
  const tripName = searchParams.get("tripName");
  const avatarIcon = searchParams.get("avatarIcon") || undefined;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<
    {
      id?: number;
      trip_id: string;
      username: string;
      message: string;
      time: string;
      consensus?: Consensus | null;
    }[]
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "timeline">("chat");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(0);
  const [startBooking, setStartBooking] = useState(false);

  const [showBookingsModal, setShowBookingsModal] = useState(false);

  const [members, setMembers] = useState<string[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [flights, setFlights] = useState<[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!tripId) return;
      const membersData = await getMembers(tripId);

      setMembers(membersData.members);
    };
    fetchMembers();
  }, [tripId]);

  useEffect(() => {
    const fetchFlights = async () => {
      if (!tripId) return;
      const flights = await getFlights();

      console.log({ hotels });
      setFlights(flights.flights);
    };
    fetchFlights();
  }, [tripId]);

  useEffect(() => {
    const fetchHotels = async () => {
      if (!tripId) return;
      const hotels = await getHotels();

      console.log({ hotels });
      setHotels(hotels.hotels);
    };
    fetchHotels();
  }, [tripId]);

  useEffect(() => {
    if (!messages) return;

    const currentMessageCount = messages.length;
    const lastMessageCount = lastMessageCountRef.current;

    // Scroll to end if:
    // 1. New messages were added (not just polling updates)
    // 2. This is the initial load (lastMessageCount is 0)
    if (currentMessageCount > lastMessageCount || lastMessageCount === 0 || startBooking)  {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    // Update the last message count
    lastMessageCountRef.current = currentMessageCount;
  }, [messages, startBooking]);

  // Reset message count when tripId changes (new trip selected)
  useEffect(() => {
    lastMessageCountRef.current = 0;
  }, [tripId]);

  // Polling effect for fetching chats
  useEffect(() => {
    if (!tripId) return;

    const fetchChats = async () => {
      try {
        const response = await getChatsByTripId(tripId);
        setMessages(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchChats();

    let interval = null;
    //Set up polling every 1 second
    if(!startBooking) 
      interval = setInterval(fetchChats, 1000);
    else
      interval = null;

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [tripId, startBooking]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !messages || !user?.username || !tripId) return;

    setIsSendingMessage(true);

    try {
      const messageData = {
        trip_id: tripId,
        username: user.username,
        message: newMessage,
        time: new Date().toISOString(),
      };

      // Send message to API
      await sendChatMessage(messageData);

      // Add message to local state for immediate UI update
      setMessages([...messages, messageData]);
      setNewMessage("");

      // Force scroll to bottom when sending a message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Failed to send message:", error);
      // You could add a toast notification here for error feedback
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleAiAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    await sendAiAnalysis(tripId);

    setIsAnalyzing(false);
  };

  const renderBookingMessage = () => {
    if (startBooking) {
      return (
        <>
        <div key="booking-message" className="mb-4">
          <div className="flex gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Hotel Recommendations
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-11">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <HotelCarousel hotels={hotels} travellers={members?.length ?? 0}/>
            </div>
          </div>
        </div>
        <div key="booking-message-1" className="mb-4">
          <div className="flex gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Flight Recommendations
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-11">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <FlightCarousel
                flights={flights}
                travellers={members?.length ?? 0}
              />
            </div>
          </div>
        </div>
        </>
      );
    }
  }

  const renderMessage = (message: {
    id?: number;
    trip_id: string;
    username: string;
    message: string;
    time: string;
    consensus?: Consensus | null;
  }) => {
    // const isUser = message.sender?.id === "1";
    // const isAi = message.type === "ai";
    const isDestination = message.consensus !== null;
    const hasConsensusCard = message.consensus?.consensus_card !== undefined;
    // const isFlight = message.type === "flight";
    // const isHotel = message.type === "hotel";

    const isCurrentUser = message.username === user?.username;

    if (isCurrentUser) {
      // Right-aligned message for current user
      return (
        <div
          key={message.id}
          className="flex justify-end gap-3 mb-4 items-center"
        >
          <div className="flex-1 max-w-[60%]">
            <div className="flex justify-end items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">
                {new Date(message.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-sm font-medium">{message.username}</span>
            </div>
            <p className="text-sm bg-muted p-3 rounded-lg">{message.message}</p>
          </div>
          <div className="w-8 h-8 bg-gray-200 text-primary-foreground rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {message.username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </div>
      );
    }

    if (isDestination) {
      // Check if consensus_card exists - show ConsensusReached component
      if (hasConsensusCard) {
        return (
          <div key={message.id} className="mb-4">
            <div className="flex gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <MapIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Consensus Reached</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-11">
              <ConsensusReached
                data={{
                  tripTitle: `${
                    message.consensus?.consensus_card.places[0]?.place || "Trip"
                  } - ${message.consensus?.consensus_card.no_of_days} days`,
                  dates: {
                    from: new Date("Oct 01, 2025").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                    to: new Date("Oct 03, 2025").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                    duration: `${3} days`,
                    range: "Friday to Sunday",
                  },
                  experiences:
                    message.consensus?.consensus_card.places.map((place) => ({
                      title: place.place,
                      description:
                        place.features || "Amazing destination experience",
                      tags: place.keywords || ["Travel", "Adventure"],
                      thumbnail:
                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center",
                    })) || [],
                  costEstimate: {
                    perPerson: `$${(
                      (message.consensus?.consensus_card
                        .flight_cost_per_person || 0) +
                      (message.consensus?.consensus_card
                        .accommodation_cost_per_person || 0) +
                      (message.consensus?.consensus_card
                        .transportation_cost_per_person || 0)
                    ).toLocaleString()}`,
                    breakdown: {
                      flight: `$${(
                        message.consensus?.consensus_card
                          .flight_cost_per_person || 0
                      ).toLocaleString()}`,
                      stay: `$${(
                        message.consensus?.consensus_card
                          .accommodation_cost_per_person || 0
                      ).toLocaleString()}`,
                      localTransport: `$${(
                        message.consensus?.consensus_card
                          .transportation_cost_per_person || 0
                      ).toLocaleString()}`,
                    },
                  },
                }}
                onStartBooking={() => setStartBooking(true)}
                onKeepDiscussing={() => {}}
                onRegenerate={() => {}}
              />
            </div>
          </div>
        );
      }
      return (
        <div key={message.id} className="mb-4">
          <div className="flex gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <MapIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Destination Recommendations
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(message.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-11">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <DestinationCarousel
                destinations={message.consensus?.candidates}
              />
            </div>
          </div>
        </div>
      );
    }

    // Left-aligned message for other users
    return (
      <div key={message.id} className="flex gap-3 mb-4 items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {message.username?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
        <div className="flex-1 max-w-[60%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{message.username}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(message.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-sm bg-muted p-3 rounded-lg">{message.message}</p>
        </div>
      </div>
    );

    // if (isAi) {
    //   return (
    //     <div key={message.id} className="flex gap-3 mb-4">
    //       <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
    //         <Bot className="w-4 h-4 text-white" />
    //       </div>
    //       <div className="flex-1">
    //         <div className="flex items-center gap-2 mb-1">
    //           <span className="text-sm font-medium">AI Assistant</span>
    //           <span className="text-xs text-muted-foreground">
    //             {message.timestamp}
    //           </span>
    //         </div>
    //         <p className="text-sm bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg whitespace-pre-line">
    //           {message.content}
    //         </p>
    //       </div>
    //     </div>
    //   );
    // }

    return null;
  };

  // const timelineItems = [
  //   {
  //     id: "1",
  //     title: "Trip Created",
  //     description: "Group trip initiated",
  //     status: "completed",
  //     timestamp: "2 days ago",
  //     icon: (
  //       <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs font-bold">+</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "2",
  //     title: "Members Added",
  //     description: "4 members joined the group",
  //     status: "completed",
  //     timestamp: "2 days ago",
  //     icon: <Users className="w-5 h-5 text-primary-foreground" />,
  //   },
  //   {
  //     id: "3",
  //     title: "Preferences Collected",
  //     description: "All members shared their preferences",
  //     status: "completed",
  //     timestamp: "1 day ago",
  //     icon: (
  //       <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs">💭</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "4",
  //     title: "Destinations Suggested",
  //     description: "AI proposed 3 destination options",
  //     status: "completed",
  //     timestamp: "1 day ago",
  //     icon: (
  //       <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs">📍</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "5",
  //     title: "Voting in Progress",
  //     description: "Members voting on destination",
  //     status:
  //       trip?.status === "planning"
  //         ? "active"
  //         : trip?.status === "consensus"
  //         ? "completed"
  //         : "pending",
  //     timestamp:
  //       trip?.status === "planning"
  //         ? "4 hours ago"
  //         : trip?.status === "consensus"
  //         ? "2 hours ago"
  //         : "",
  //     icon: (
  //       <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs">⏳</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "6",
  //     title: "Consensus Reached",
  //     description: "Bali selected with 56% votes",
  //     status:
  //       trip?.status === "consensus" ||
  //       trip?.status === "booking" ||
  //       trip?.status === "finalized"
  //         ? "completed"
  //         : "pending",
  //     timestamp:
  //       trip?.status === "consensus" ||
  //       trip?.status === "booking" ||
  //       trip?.status === "finalized"
  //         ? "2 hours ago"
  //         : "",
  //     icon: (
  //       <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs">📊</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "7",
  //     title: "Booking Process Started",
  //     description: "Flight, hotel, and activity booking",
  //     status:
  //       trip?.status === "booking" || trip?.status === "finalized"
  //         ? "completed"
  //         : "pending",
  //     timestamp:
  //       trip?.status === "booking" || trip?.status === "finalized"
  //         ? "1 hour ago"
  //         : "",
  //     icon: (
  //       <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs">✈️</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: "8",
  //     title: "Detailed Itinerary Generated",
  //     description: "Complete schedule with times and locations",
  //     status: trip?.status === "finalized" ? "completed" : "pending",
  //     timestamp: trip?.status === "finalized" ? "30 minutes ago" : "",
  //     icon: (
  //       <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
  //         <span className="text-primary text-xs">📋</span>
  //       </div>
  //     ),
  //   },
  // ];

  // Show loading state while fetching data
  if (isLoading) {
    return <ChatShimmer />;
  }

  // Show empty state only after loading is completed
  if (!messages) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Trip not found</h1>
          <Button onClick={() => navigate("/profile")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-10">
          <div className="p-4 flex items-center gap-3 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/profile")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {avatarIcon ? (
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={avatarIcon}
                      alt="trip avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                        const fallback = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                    <Users className="hidden w-5 h-5 text-muted-foreground" />
                  </div>
                ) : (
                  <Users className="w-5 h-5 text-muted-foreground" />
                )}
                <h1>{tripName}</h1>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">
                  {members
                    ?.slice(0, 3)
                    .map((member) => member)
                    .join(", ")}
                  {members &&
                    members.length > 3 &&
                    ` +${members.length - 3} more`}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOptionsPanel(!showOptionsPanel)}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>

            {/* Options Panel */}
            {showOptionsPanel && (
              <DropdownMenu onClose={() => setShowOptionsPanel(false)} />
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 px-4 text-sm transition-colors border-b-2 text-center cursor-pointer ${
                activeTab === "chat"
                  ? "border-primary text-primary bg-accent/50"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`flex-1 py-3 px-4 text-sm transition-colors border-b-2 text-center cursor-pointer ${
                activeTab === "timeline"
                  ? "border-primary text-primary bg-accent/50"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {
          activeTab === "chat" ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 pb-2">
                {/* Welcome Message */}
                <div className="mb-4">
                  <div className="flex gap-3 mb-4 items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        AI
                      </span>
                    </div>
                    <div className="flex-1 max-w-[60%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          AI Assistant
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Just now
                        </span>
                      </div>
                      <p className="text-sm bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg whitespace-pre-line">
                        Welcome to {tripName || "your trip"}! 🎉 I'm amiGO, your
                        AI travel assistant. I'm here to help you plan the
                        perfect trip. Discuss your preferences, ask about
                        destinations, flights, hotels, or request your
                        itinerary!
                      </p>
                    </div>
                  </div>
                </div>

                {messages?.map(renderMessage)}
                {startBooking && renderBookingMessage()}
                <div ref={messagesEndRef} />
              </div>

              {/* Action Buttons */}
              {/* {(trip.status === "booking" || trip.status === "finalized") && (
              <div className="px-4 pb-2">
                <div className="flex gap-2 justify-center">
                  {(trip.status === "booking" ||
                    trip.status === "finalized") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBookingsModal(true)}
                      className="rounded-full bg-white shadow-sm border-border hover:bg-muted/50"
                    >
                      Bookings
                    </Button>
                  )}
                  {trip.status === "finalized" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowItineraryModal(true)}
                      className="rounded-full bg-white shadow-sm border-border hover:bg-muted/50"
                    >
                      Itinerary
                    </Button>
                  )}
                </div>
              </div>
            )} */}

              {/* Fixed Bottom Section */}
              <div className="sticky bottom-0 bg-background border-t border-border">
                {/* Action Buttons */}
                <div className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBookingsModal(true)}
                      className="rounded-full bg-white shadow-sm border-border hover:bg-muted/50"
                    >
                      Bookings
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowItineraryModal(true)}
                      className="rounded-full bg-white shadow-sm border-border hover:bg-muted/50"
                    >
                      Itinerary
                    </Button>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 pt-2">
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="pr-12 bg-white border-gray-200 rounded-full h-12"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isSendingMessage}
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full hover:bg-gray-100"
                      >
                        {isSendingMessage ? (
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 text-gray-600" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={handleAiAnalysis}
                      disabled={isAnalyzing}
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
                      title="AI Analysis"
                    >
                      {isAnalyzing ? (
                        <Brain className="w-5 h-5 text-gray-800 animate-pulse" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-gray-800" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : null
          /* Timeline Tab */
          // <div className="flex-1 p-4 overflow-y-auto">
          //   <div className="space-y-4">
          //     {timelineItems.map((item, index) => {
          //       const isCompleted = item.status === "completed";
          //       const isActive = item.status === "active";
          //       const isPending = item.status === "pending";

          //       return (
          //         <div
          //           key={item.id}
          //           className={`bg-card rounded-2xl p-4 shadow-sm border ${
          //             isActive ? "border-2 border-primary" : "border-border"
          //           } ${isPending ? "opacity-50" : ""}`}
          //         >
          //           <div className="flex items-center justify-between">
          //             <div className="flex items-center space-x-3">
          //               <div
          //                 className={`w-10 h-10 rounded-full flex items-center justify-center ${
          //                   isCompleted
          //                     ? "bg-primary"
          //                     : isActive
          //                     ? "bg-primary"
          //                     : "bg-muted"
          //                 }`}
          //               >
          //                 {item.icon}
          //               </div>
          //               <div>
          //                 <h3
          //                   className={`font-semibold ${
          //                     isPending
          //                       ? "text-muted-foreground"
          //                       : "text-foreground"
          //                   }`}
          //                 >
          //                   {item.title}
          //                 </h3>
          //                 <p className="text-sm text-muted-foreground">
          //                   {item.description}
          //                 </p>
          //               </div>
          //             </div>
          //             <div className="flex items-center space-x-2">
          //               {item.timestamp && (
          //                 <span className="text-sm text-muted-foreground">
          //                   {item.timestamp}
          //                 </span>
          //               )}
          //               <div
          //                 className={`w-6 h-6 rounded-full flex items-center justify-center ${
          //                   isCompleted
          //                     ? "bg-green-500"
          //                     : isActive
          //                     ? "bg-primary"
          //                     : "bg-gray-300"
          //                 }`}
          //               >
          //                 {isCompleted ? (
          //                   <span className="text-white text-xs">✓</span>
          //                 ) : isActive ? (
          //                   <div className="w-2 h-2 bg-white rounded-full"></div>
          //                 ) : (
          //                   <span className="text-gray-600 text-xs">○</span>
          //                 )}
          //               </div>
          //             </div>
          //           </div>
          //         </div>
          //       );
          //     })}
          //   </div>
          // </div>
        }

        {/* Modals */}
        <BookingsModal
          isOpen={showBookingsModal}
          onClose={() => setShowBookingsModal(false)}
        />
        <ItineraryModal
          isOpen={showItineraryModal}
          onClose={() => setShowItineraryModal(false)}
        />
      </div>
    </div>
  );
};

export default TripChat;

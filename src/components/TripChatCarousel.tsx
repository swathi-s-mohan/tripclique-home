import React, { useState, useEffect, useRef } from 'react';
import { Trip, trips } from '@/data/trips';
import { ArrowLeft, Send, Bot, Users, MoreVertical, Plane, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu } from '@/components/DropdownMenu';
import { FlightCard } from '@/components/FlightCard';
import { Carousel } from './Carousel';

interface TripChatItemProps {
  trip: Trip;
}

export const TripChatItem: React.FC<TripChatItemProps> = ({ trip }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'timeline'>('chat');
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(trip);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentTrip?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentTrip) return;

    const message = {
      id: `msg-${Date.now()}`,
      type: 'user' as const,
      sender: { id: "1", name: "You" },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add message to trip
    if (currentTrip.messages) {
      currentTrip.messages.push(message);
    } else {
      currentTrip.messages = [message];
    }

    const userMessage = newMessage.toLowerCase();
    setNewMessage('');
    
    // Check if user is asking about flights
    const isFlightRelated = userMessage.includes('flight') || 
                           userMessage.includes('fly') || 
                           userMessage.includes('airline') || 
                           userMessage.includes('plane') ||
                           userMessage.includes('book flight') ||
                           userMessage.includes('flight options');
    
    // Simulate AI response
    setTimeout(() => {
      if (isFlightRelated) {
        // AI response for flight-related queries
        const aiResponse = {
          id: `msg-${Date.now()}-ai`,
          type: 'ai' as const,
          content: "I'll help you find the best flight options for your trip! Let me search for some great deals...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        if (currentTrip.messages) {
          currentTrip.messages.push(aiResponse);
          setCurrentTrip({ ...currentTrip });
        }
        
        // Add flight recommendation after AI response
        setTimeout(() => {
          const flightMessage = {
            id: `msg-${Date.now()}-flight`,
            type: 'flight' as const,
            content: "Here are some excellent flight options I found:",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            flightData: {
              departureTime: "08:30",
              departureCode: "LAX",
              departureCity: "Los Angeles",
              arrivalTime: "14:45",
              arrivalCode: "BAL",
              arrivalCity: "Bali",
              flightDuration: "17h 15m",
              airline: "Singapore Airlines",
              flightCode: "SQ 11",
              classType: "Economy",
              price: "₹1,04,000",
              oldPrice: "₹1,58,000",
              ctaText: "Book Now"
            }
          };
          
          if (currentTrip.messages) {
            currentTrip.messages.push(flightMessage);
            setCurrentTrip({ ...currentTrip });
          }
        }, 1500);
      } else {
        // Regular AI response
        const aiResponse = {
          id: `msg-${Date.now()}-ai`,
          type: 'ai' as const,
          content: "Thanks for your message! I'm here to help plan your trip. What would you like to know?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        if (currentTrip.messages) {
          currentTrip.messages.push(aiResponse);
          setCurrentTrip({ ...currentTrip });
        }
      }
    }, 1000);
  };

  const handleAiAnalysis = () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAiAnalysisEnabled(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now()}-ai-analysis`,
        type: 'ai' as const,
        content: "📊 Deep Analysis Complete! \n\n✅ Processed messages from group members\n✅ Identified budget range and preferences\n✅ Key interests and must-haves analyzed\n\nNow generating personalized recommendations...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      if (currentTrip.messages) {
        currentTrip.messages.push(aiMessage);
        setCurrentTrip({ ...currentTrip });
      }
      
      // Add flight recommendation after analysis
      setTimeout(() => {
        const flightMessage = {
          id: `msg-${Date.now()}-flight`,
          type: 'flight' as const,
          content: "Here's a great flight option I found for your trip:",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          flightData: {
            departureTime: "08:30",
            departureCode: "LAX",
            departureCity: "Los Angeles",
            arrivalTime: "14:45",
            arrivalCode: "BAL",
            arrivalCity: "Bali",
            flightDuration: "17h 15m",
            airline: "Singapore Airlines",
            flightCode: "SQ 11",
            classType: "Economy",
            price: "₹1,04,000",
            oldPrice: "₹1,58,000",
            ctaText: "Book Now"
          }
        };
        
        if (currentTrip.messages) {
          currentTrip.messages.push(flightMessage);
          setCurrentTrip({ ...currentTrip });
        }
      }, 1500);
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderMessage = (message: {
    id: string;
    type: 'user' | 'ai' | 'flight';
    sender?: { id: string; name: string };
    content: string;
    timestamp: string;
    flightData?: {
      departureTime: string;
      departureCode: string;
      departureCity: string;
      arrivalTime: string;
      arrivalCode: string;
      arrivalCity: string;
      flightDuration: string;
      airline: string;
      flightCode: string;
      classType: string;
      price: string;
      oldPrice?: string;
      ctaText: string;
    };
  }) => {
    const isUser = message.sender?.id === "1";
    const isAi = message.type === 'ai';
    const isFlight = message.type === 'flight';

    if (isUser) {
      return (
        <div key={message.id} className="flex gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {message.sender?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">{message.sender?.name}</span>
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            </div>
            <p className="text-sm bg-muted p-3 rounded-lg inline-block max-w-full">{message.content}</p>
          </div>
        </div>
      );
    }
    
    if (isAi) {
      return (
        <div key={message.id} className="flex gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">AI Assistant</span>
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            </div>
            <p className="text-sm bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg whitespace-pre-line inline-block max-w-full">{message.content}</p>
          </div>
        </div>
      );
    }

    if (isFlight && message.flightData) {
      return (
        <div key={message.id} className="flex gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Flight Recommendation</span>
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <FlightCard 
                departure_time={message.flightData.departureTime}
                origin_code={message.flightData.departureCode}
                origin_city={message.flightData.departureCity}
                arrival_time={message.flightData.arrivalTime}
                dest_code={message.flightData.arrivalCode}
                dest_city={message.flightData.arrivalCity}
                duration={message.flightData.flightDuration}
                airline={message.flightData.airline}
                flight_code={message.flightData.flightCode}
                cabin={message.flightData.classType}
                price_current={message.flightData.price}
                price_strike={message.flightData.oldPrice || ""}
                stops={0}
                stops_text="Non-stop"
                date={new Date().toISOString()}
                travellers={4}
              />
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const timelineItems = [
    {
      id: '1',
      title: "Trip Created",
      description: "Group trip initiated",
      status: "completed",
      timestamp: "2 days ago",
      icon: <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs font-bold">+</span>
      </div>
    },
    {
      id: '2',
      title: "Members Added",
      description: `${currentTrip.members?.length || 0} members joined the group`,
      status: "completed",
      timestamp: "2 days ago",
      icon: <Users className="w-5 h-5 text-primary-foreground" />
    },
    {
      id: '3',
      title: "Preferences Collected",
      description: "All members shared their preferences",
      status: "completed",
      timestamp: "1 day ago",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">💭</span>
      </div>
    },
    {
      id: '4',
      title: "Destinations Suggested",
      description: "AI proposed destination options",
      status: "completed",
      timestamp: "1 day ago",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">📍</span>
      </div>
    },
    {
      id: '5',
      title: "Voting in Progress",
      description: "Members voting on destination",
      status: currentTrip?.status === 'planning' ? "active" : currentTrip?.status === 'consensus' ? "completed" : "pending",
      timestamp: currentTrip?.status === 'planning' ? "4 hours ago" : currentTrip?.status === 'consensus' ? "2 hours ago" : "",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">⏳</span>
      </div>
    }
  ];

  return (
    <div className="w-full h-[600px] bg-background border border-border rounded-2xl shadow-sm flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border rounded-t-2xl">
        <div className="p-4 flex items-center gap-3 relative">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{currentTrip.trip_name}</h3>
            <div>
              <span className="text-xs text-muted-foreground">
                {currentTrip.members?.slice(0, 3).map(member => member.name).join(', ')}
                {currentTrip.members && currentTrip.members.length > 3 && ` +${currentTrip.members.length - 3} more`}
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
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-4 text-sm transition-colors border-b-2 text-center cursor-pointer ${
              activeTab === 'chat'
                ? 'border-primary text-primary bg-accent/50'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-3 px-4 text-sm transition-colors border-b-2 text-center cursor-pointer ${
              activeTab === 'timeline'
                ? 'border-primary text-primary bg-accent/50'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'chat' ? (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {currentTrip.messages?.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Input
                  placeholder="Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="pr-12 bg-white border-gray-200 rounded-full h-12"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim()}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full hover:bg-gray-100"
                >
                  <Send className="w-4 h-4 text-gray-600" />
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
        </>
      ) : (
        /* Timeline Tab */
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {timelineItems.map((item, index) => {
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';
              const isPending = item.status === 'pending';
              
              return (
                <div 
                  key={item.id} 
                  className={`bg-card rounded-2xl p-4 shadow-sm border ${
                    isActive 
                      ? 'border-2 border-primary' 
                      : 'border-border'
                  } ${isPending ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-primary' 
                          : isActive 
                            ? 'bg-primary' 
                            : 'bg-muted'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          isPending ? 'text-muted-foreground' : 'text-foreground'
                        }`}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.timestamp && (
                        <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                      )}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : isActive 
                            ? 'bg-primary' 
                            : 'bg-gray-300'
                      }`}>
                        {isCompleted ? (
                          <span className="text-white text-xs">✓</span>
                        ) : isActive ? (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        ) : (
                          <span className="text-gray-600 text-xs">○</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const TripChatCarousel: React.FC = () => {
  // Get the first 3 trips for the carousel
  const carouselTrips = trips.slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Trip Chats</h2>
      <Carousel 
        showDots={true} 
        loop={true}
        className="w-full"
      >
        {carouselTrips.map((trip) => (
          <TripChatItem 
            key={trip.id} 
            trip={trip} 
          />
        ))}
      </Carousel>
    </div>
  );
};
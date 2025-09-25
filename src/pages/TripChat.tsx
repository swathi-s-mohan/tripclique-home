import { useParams, useNavigate } from "react-router-dom";
import { getTripById } from "@/data/trips";
import { ArrowLeft, Send, Bot, Users, MoreVertical, Copy, Share, BellOff, Download, Settings, LogOut, Calendar, Plane, FileText, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { DropdownMenu } from "@/components/DropdownMenu";

const TripChat = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(getTripById(Number(tripId)));
  const [newMessage, setNewMessage] = useState('');
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'timeline'>('chat');
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundTrip = getTripById(Number(tripId));
    if (!foundTrip) {
      navigate('/');
      return;
    }
    setTrip(foundTrip);
  }, [tripId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [trip?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !trip) return;

    const message = {
      id: `msg-${Date.now()}`,
      type: 'user' as const,
      sender: { id: "1", name: "You" },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add message to trip
    if (trip.messages) {
      trip.messages.push(message);
    } else {
      trip.messages = [message];
    }

    setNewMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now()}-ai`,
        type: 'ai' as const,
        content: "Thanks for your message! I'm here to help plan your trip. What would you like to know?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      if (trip.messages) {
        trip.messages.push(aiResponse);
        setTrip({ ...trip });
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
      
      if (trip.messages) {
        trip.messages.push(aiMessage);
        setTrip({ ...trip });
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderMessage = (message: {
    id: string;
    type: 'user' | 'ai';
    sender?: { id: string; name: string };
    content: string;
    timestamp: string;
  }) => {
    const isUser = message.sender?.id === "1";
    const isAi = message.type === 'ai';

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
            <p className="text-sm bg-muted p-3 rounded-lg">{message.content}</p>
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
            <p className="text-sm bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg whitespace-pre-line">{message.content}</p>
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
      description: "4 members joined the group",
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
      description: "AI proposed 3 destination options",
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
      status: trip?.status === 'planning' ? "active" : trip?.status === 'consensus' ? "completed" : "pending",
      timestamp: trip?.status === 'planning' ? "4 hours ago" : trip?.status === 'consensus' ? "2 hours ago" : "",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">⏳</span>
                </div>
    },
    {
      id: '6',
      title: "Consensus Reached",
      description: "Bali selected with 56% votes",
      status: trip?.status === 'consensus' || trip?.status === 'booking' || trip?.status === 'finalized' ? "completed" : "pending",
      timestamp: trip?.status === 'consensus' || trip?.status === 'booking' || trip?.status === 'finalized' ? "2 hours ago" : "",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">📊</span>
            </div>
    },
    {
      id: '7',
      title: "Booking Process Started",
      description: "Flight, hotel, and activity booking",
      status: trip?.status === 'booking' || trip?.status === 'finalized' ? "completed" : "pending",
      timestamp: trip?.status === 'booking' || trip?.status === 'finalized' ? "1 hour ago" : "",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">✈️</span>
                </div>
    },
    {
      id: '8',
      title: "Detailed Itinerary Generated",
      description: "Complete schedule with times and locations",
      status: trip?.status === 'finalized' ? "completed" : "pending",
      timestamp: trip?.status === 'finalized' ? "30 minutes ago" : "",
      icon: <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
        <span className="text-primary text-xs">📋</span>
              </div>
    }
  ];

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Trip not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
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
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1>{trip.name}</h1>
            <div>
              <span className="text-xs text-muted-foreground">
                {trip.members?.slice(0, 3).map(member => member.name).join(', ')}
                {trip.members && trip.members.length > 3 && ` +${trip.members.length - 3} more`}
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
        {trip.messages?.map(renderMessage)}
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
    </div>
  );
};

export default TripChat;
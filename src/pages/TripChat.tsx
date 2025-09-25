import { ArrowLeft, Users, MoreVertical, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TripChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="px-4 py-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/')}
                className="p-1 hover:bg-accent rounded-md transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">Trip A</h1>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-muted-foreground">Alex</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">online</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="p-1 hover:bg-accent rounded-md transition-colors">
              <MoreVertical className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </header>

        {/* Tabs */}
        <Tabs defaultValue="chat" className="flex flex-col flex-1">
          <TabsList className="grid w-full grid-cols-2 bg-background border-b border-border rounded-none h-12">
            <TabsTrigger 
              value="chat" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:rounded-none"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:rounded-none"
            >
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex flex-col flex-1 mt-0">
            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 bg-muted/20">
              {/* AI Welcome Message */}
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="bg-card rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-foreground leading-relaxed">
                      Welcome to Trip A! I'm here to help you plan the perfect group trip. Share your preferred dates, places, budget, preferences, and must-haves. I'll propose options for the group.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-background border-t border-border">
              <div className="flex space-x-3 mb-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  Bookings
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Itinerary
                </Button>
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello"
                    className="rounded-full bg-muted border-0 pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-accent rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <button className="p-2 hover:bg-accent rounded-full transition-colors">
                  <Sparkles className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="flex-1 p-4 space-y-6">
            {/* Timeline Header */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Trip Progress</h2>
              <p className="text-muted-foreground">Track your planning journey</p>
            </div>

            {/* Timeline Items */}
            <div className="space-y-4">
              {/* Trip Created */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">+</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Trip Created</h3>
                      <p className="text-sm text-muted-foreground">Group trip initiated</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Added */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Members Added</h3>
                      <p className="text-sm text-muted-foreground">4 members joined the group</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences Collected */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
                        <span className="text-primary text-xs">💭</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Preferences Collected</h3>
                      <p className="text-sm text-muted-foreground">All members shared their preferences</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destinations Suggested */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
                        <span className="text-primary text-xs">📍</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Destinations Suggested</h3>
                      <p className="text-sm text-muted-foreground">AI proposed 3 destination options</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">1 day ago</span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voting in Progress - Active */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border-2 border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-primary-foreground rounded-full flex items-center justify-center">
                        <span className="text-primary text-xs">⏳</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Voting in Progress</h3>
                      <p className="text-sm text-muted-foreground">Members voting on destination</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">4 hours ago</span>
                    <div className="w-6 h-6 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Consensus Reached - Upcoming */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-muted-foreground rounded-full flex items-center justify-center">
                        <span className="text-muted text-xs">📊</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-muted-foreground">Consensus Reached</h3>
                      <p className="text-sm text-muted-foreground">Bali selected with 56% votes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Process Started - Upcoming */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-muted-foreground rounded-full flex items-center justify-center">
                        <span className="text-muted text-xs">✈️</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-muted-foreground">Booking Process Started</h3>
                      <p className="text-sm text-muted-foreground">Flight, hotel, and activity booking</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Itinerary Generated - Upcoming */}
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-muted-foreground rounded-full flex items-center justify-center">
                        <span className="text-muted text-xs">📋</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-muted-foreground">Detailed Itinerary Generated</h3>
                      <p className="text-sm text-muted-foreground">Complete schedule with times and locations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripChat;
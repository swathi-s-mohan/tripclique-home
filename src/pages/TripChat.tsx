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

          <TabsContent value="timeline" className="flex-1 p-4">
            <div className="text-center text-muted-foreground">
              <p>Timeline content coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripChat;
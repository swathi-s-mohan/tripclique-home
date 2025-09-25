import React from "react";
import { Users } from "lucide-react";

export interface Trip {
  id: number;
  trip_name: string;
  latest_message: string;
  latest_message_at: string;
  avatarContent: React.ReactNode;
  // Additional trip details
  startDate?: string;
  endDate?: string;
  destinations?: string[];
  minBudget?: string;
  maxBudget?: string;
  preferences?: string[];
  amenities?: string[];
  members?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  status?: 'planning' | 'consensus' | 'booking' | 'finalized';
  messages?: Array<{
    id: string;
    type: 'user' | 'ai' | 'poll' | 'location' | 'hotel' | 'flight' | 'itinerary';
    sender?: {
      id: string;
      name: string;
      avatar?: string;
    };
    content?: string;
    timestamp: string;
    data?: Record<string, unknown>;
  }>;
}

export const trips: Trip[] = [
  {
    id: 1,
    trip_name: "Bali Squad ✈️",
    latest_message: "Consensus reached on Nov 14-18. Generate...",
    latest_message_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    avatarContent: React.createElement(Users, { className: "w-6 h-6 text-trip-avatar-foreground" }),
    startDate: "2024-11-14",
    endDate: "2024-11-18",
    destinations: ["Bali, Indonesia"],
    minBudget: "25000",
    maxBudget: "40000",
    preferences: ["beach", "culture", "food"],
    amenities: ["wifi", "pool"],
    members: [
      { id: "1", name: "Alex" },
      { id: "2", name: "Sarah" },
      { id: "3", name: "Mike" },
      { id: "4", name: "Emma" }
    ],
    status: "consensus",
    messages: [
      {
        id: "1",
        type: "ai",
        content: "Welcome to Bali Squad! Share your preferred dates, places, budget, preferences, and must-haves. I'll propose options for the group.",
        timestamp: "10:30 AM"
      },
      {
        id: "2",
        type: "user",
        sender: { id: "1", name: "Alex" },
        content: "Hey everyone! I'm flexible on dates but would love somewhere tropical with good beaches and food scene. Budget around ₹40k per person.",
        timestamp: "10:32 AM"
      },
      {
        id: "3",
        type: "user",
        sender: { id: "2", name: "Sarah" },
        content: "Sounds great! I prefer Nov 14-18 or Nov 21-25. Love cultural experiences and good Instagram spots 📸",
        timestamp: "10:35 AM"
      },
      {
        id: "4",
        type: "ai",
        content: "I've analyzed everyone's inputs. Here are the top 3 destinations that fit your budgets and preferences:",
        timestamp: "10:37 AM"
      }
    ]
  },
  {
    id: 2,
    trip_name: "Europe Adventure",
    latest_message: "Poll: Pick your preferred destination",
    latest_message_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    avatarContent: React.createElement(Users, { className: "w-6 h-6 text-trip-avatar-foreground" }),
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    destinations: ["Paris, France", "Rome, Italy"],
    minBudget: "50000",
    maxBudget: "80000",
    preferences: ["culture", "adventure"],
    amenities: ["wifi", "nightlife"],
    members: [
      { id: "1", name: "Alex" },
      { id: "2", name: "Sarah" },
      { id: "3", name: "Mike" }
    ],
    status: "planning",
    messages: [
      {
        id: "1",
        type: "ai",
        content: "Welcome to Europe Adventure! Let's plan an amazing European trip together.",
        timestamp: "9:30 AM"
      }
    ]
  },
  {
    id: 3,
    trip_name: "Tokyo Friends 🍜",
    latest_message: "Budget discussion in progress",
    latest_message_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    avatarContent: React.createElement(Users, { className: "w-6 h-6 text-trip-avatar-foreground" }),
    startDate: "2025-01-10",
    endDate: "2025-01-17",
    destinations: ["Tokyo, Japan"],
    minBudget: "60000",
    maxBudget: "90000",
    preferences: ["food", "culture"],
    amenities: ["wifi", "shopping"],
    members: [
      { id: "1", name: "Alex" },
      { id: "4", name: "Emma" }
    ],
    status: "planning",
    messages: [
      {
        id: "1",
        type: "ai",
        content: "Welcome to Tokyo Friends! Let's explore the amazing food and culture of Japan.",
        timestamp: "7:30 AM"
      }
    ]
  },
  {
    id: 4,
    trip_name: "Beach Vibes 🏖️",
    latest_message: "Accommodation poll closing soon",
    latest_message_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    avatarContent: React.createElement(Users, { className: "w-6 h-6 text-trip-avatar-foreground" }),
    startDate: "2025-02-14",
    endDate: "2025-02-21",
    destinations: ["Goa, India"],
    minBudget: "20000",
    maxBudget: "35000",
    preferences: ["beach", "nightlife"],
    amenities: ["wifi", "pool", "nightlife"],
    members: [
      { id: "2", name: "Sarah" },
      { id: "3", name: "Mike" },
      { id: "4", name: "Emma" }
    ],
    status: "planning",
    messages: [
      {
        id: "1",
        type: "ai",
        content: "Welcome to Beach Vibes! Let's plan the perfect beach getaway.",
        timestamp: "Yesterday"
      }
    ]
  }
];

// Function to add a new trip
export const addTrip = (newTrip: Omit<Trip, 'id' | 'avatarContent' | 'latest_message_at'>): Trip => {
  const trip: Trip = {
    ...newTrip,
    id: Math.max(...trips.map(t => t.id), 0) + 1,
    avatarContent: React.createElement(Users, { className: "w-6 h-6 text-trip-avatar-foreground" }),
    latest_message_at: new Date().toISOString(),
    messages: [
      {
        id: "1",
        type: "ai",
        content: `Welcome to ${newTrip.trip_name}! I'm your AI travel assistant. Let's plan the perfect trip together!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };
  
  trips.unshift(trip); // Add to beginning of array
  return trip;
};

// Function to get trip by ID
export const getTripById = (id: number): Trip | undefined => {
  return trips.find(trip => trip.id === id);
};

// Function to update trip
export const updateTrip = (id: number, updates: Partial<Trip>): Trip | undefined => {
  const index = trips.findIndex(trip => trip.id === id);
  if (index !== -1) {
    trips[index] = { ...trips[index], ...updates };
    return trips[index];
  }
  return undefined;
};

// Function to add message to trip
export const addMessageToTrip = (tripId: number, message: Trip['messages'][0]): boolean => {
  const trip = getTripById(tripId);
  if (trip) {
    if (!trip.messages) {
      trip.messages = [];
    }
    trip.messages.push(message);
    return true;
  }
  return false;
};

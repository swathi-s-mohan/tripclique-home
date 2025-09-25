import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateJoinTrip from "./pages/CreateJoinTrip";
import CreateTrip from "./pages/CreateTrip";
import JoinTrip from "./pages/JoinTrip";
import TripChat from "./pages/TripChat";
import NotFound from "./pages/NotFound";
import ConsensusDemo from "./pages/ConsensusDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Index />} />
            <Route path="/create-join" element={<CreateJoinTrip />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/join-trip" element={<JoinTrip />} />
             <Route path="/trip-chat/:tripId" element={<TripChat />} />
             <Route path="/consensus-demo" element={<ConsensusDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

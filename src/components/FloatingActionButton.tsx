import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FloatingActionButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      onClick={() => navigate('/create-join')}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-fab hover:bg-fab/90 text-fab-foreground shadow-lg hover:shadow-xl transition-all duration-200 border-0"
      size="sm"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
};
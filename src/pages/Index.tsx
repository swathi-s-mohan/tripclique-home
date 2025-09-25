import { TripList } from "@/components/TripList";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">TripClique</h1>
        </header>
        
        {/* Trip List */}
        <main className="pb-20">
          <TripList />
        </main>
        
        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </div>
  );
};

export default Index;

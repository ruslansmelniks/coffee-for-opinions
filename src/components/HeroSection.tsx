import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartClick: () => void;
}

export const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="container px-4 text-center max-w-4xl">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
              ☕ CoffeeData
            </h1>
            
            <p className="text-2xl md:text-3xl text-notion-gray font-medium">
              Your opinion, your coffee.
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Answer short surveys and enjoy a free coffee in Riga.
            </p>
          </div>
          
          <div>
            <Button 
              onClick={onStartClick}
              variant="notion"
              size="lg"
              className="text-lg px-12 py-6 rounded-lg font-medium"
            >
              Start Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
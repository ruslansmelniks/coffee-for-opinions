import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import heroImage from "@/assets/coffee-hero.jpg";

interface HeroSectionProps {
  onStartClick: () => void;
}

export const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-6">
          <Coffee className="h-12 w-12 text-coffee-accent mr-3" />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            CoffeeData
          </h1>
        </div>
        
        <p className="text-2xl md:text-3xl text-coffee-warm mb-4 font-medium">
          ☕ Your opinion, your coffee.
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Answer short surveys and enjoy a free coffee in Riga.
        </p>
        
        <Button 
          variant="coffee" 
          size="lg" 
          onClick={onStartClick}
          className="text-lg px-8 py-4 h-auto font-semibold"
        >
          Start Now
        </Button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-coffee-accent/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-coffee-warm/20 rounded-full blur-xl" />
    </section>
  );
};
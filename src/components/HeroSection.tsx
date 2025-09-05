import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartClick: () => void;
}

export const HeroSection = ({
  onStartClick
}: HeroSectionProps) => {
  return (
    <section className="bg-background border-b border-border h-[600px] flex items-center">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full flex justify-center">
            <img 
              src="/lovable-uploads/ff8836b6-0a11-4a33-ae52-701e9c77431d.png" 
              alt="Coffee cup with latte art" 
              className="w-80 h-80 object-contain animate-fade-in hover:scale-105 transition-transform duration-300" 
            />
          </div>
          
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="font-bold text-2xl text-slate-900">1 opinion = 1 coffee</h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Answer short surveys and enjoy a free coffee at local cafes in Riga. Quick, simple, rewarding.
              </p>
            </div>
            
            <Button onClick={onStartClick} variant="notion" size="lg" className="font-medium">
              Start Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
import { Button } from "@/components/ui/button";
import coffeeShopImage from "@/assets/coffee-shop.jpg";
interface HeroSectionProps {
  onStartClick: () => void;
}
export const HeroSection = ({
  onStartClick
}: HeroSectionProps) => {
  return <section className="bg-background border-b border-border h-[600px] flex items-center">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          <div className="w-full">
            <img src={coffeeShopImage} alt="Cozy coffee shop interior" className="w-full h-80 object-cover rounded-2xl shadow-soft" />
          </div>
          
          <div className="text-center space-y-6">
            <div className="space-y-4">
              
              
              <p className="font-medium text-2xl text-slate-900">1 opinion = 1 coffee</p>
              
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
                Answer short surveys and enjoy a free coffee at local cafes in Riga. Quick, simple, rewarding.
              </p>
            </div>
            
            <Button onClick={onStartClick} variant="notion" size="lg" className="font-medium">
              Start Now
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
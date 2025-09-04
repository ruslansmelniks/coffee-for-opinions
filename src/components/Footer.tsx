import { Coffee, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="h-6 w-6 mr-2" />
            <span className="text-xl font-semibold">CoffeeData</span>
          </div>
          
          <p className="text-primary-foreground/80 mb-6 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-coffee-accent" /> in Riga by CoffeeData
          </p>
          
          <div className="flex justify-center space-x-6 text-sm">
            <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </button>
            <span className="text-primary-foreground/40">|</span>
            <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
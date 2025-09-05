import { Card, CardContent } from "@/components/ui/card";
import caffeineLogo from "@/assets/caffeine-logo.png";
import rocketbeanLogo from "/lovable-uploads/81dd2234-89ab-48fd-9bb1-ebb9b42301a5.png";
import cofyzLogo from "/lovable-uploads/b32621f0-482a-4a0d-91b8-90fa5fe9a5cd.png";

const partners = [
  {
    name: "RocketBean",
    description: "Specialty coffee roasters"
  },
  {
    name: "Caffeine", 
    description: "Modern coffee culture"
  },
  {
    name: "Cofyz",
    description: "Community coffee space"
  }
];

export const PartnersSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Coffee Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We work with local cafes to make your rewards tasty and real.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6">
                {partner.name === "Caffeine" ? (
                  <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center group-hover:bg-gray-50 transition-colors shadow-sm">
                    <img 
                      src={caffeineLogo} 
                      alt="Caffeine logo" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ) : partner.name === "RocketBean" ? (
                  <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center group-hover:bg-gray-50 transition-colors shadow-sm">
                    <img 
                      src={rocketbeanLogo} 
                      alt="RocketBean logo" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ) : partner.name === "Cofyz" ? (
                  <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center group-hover:bg-gray-50 transition-colors shadow-sm">
                    <img 
                      src={cofyzLogo} 
                      alt="Cofyz logo" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-notion-light-gray rounded-2xl mx-auto flex items-center justify-center group-hover:bg-notion-hover transition-colors">
                    <span className="text-3xl font-bold text-notion-gray">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  {partner.name}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Partner logos will be added soon. Each cafe offers unique atmospheres 
            perfect for enjoying your well-earned coffee.
          </p>
        </div>
      </div>
    </section>
  );
};
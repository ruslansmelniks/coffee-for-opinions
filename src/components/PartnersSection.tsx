import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import caffeineLogo from "@/assets/caffeine-logo.png";
import rocketbeanLogo from "/lovable-uploads/81dd2234-89ab-48fd-9bb1-ebb9b42301a5.png";
import ezisaLogo from "/lovable-uploads/30c18b87-c532-4acb-a2c0-039db9ff2a38.png";

const partners = [
  {
    name: "Caffeine",
    description: "Modern coffee culture",
    logo: caffeineLogo
  }
];

export const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            {t.partners.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.partners.description}
          </p>
        </div>
        
        <div className="flex justify-center gap-16 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6">
                <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center group-hover:bg-gray-50 transition-colors shadow-sm">
                  <img src={partner.logo} alt={`${partner.name} logo`} className="w-16 h-16 object-contain" />
                </div>
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
          <p className="text-lg text-muted-foreground">
            More partners like RocketBean and Ezīša Kofīšops are coming next!
          </p>
        </div>
      </div>
    </section>
  );
};
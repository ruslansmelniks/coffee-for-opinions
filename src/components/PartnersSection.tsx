import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Coffee Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work with local cafes to make your rewards tasty and real.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8 text-center">
                {/* Placeholder for partner logos */}
                <div className="w-20 h-20 bg-gradient-warm rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {partner.name}
                </h3>
                <p className="text-muted-foreground">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Partner logos will be added soon. Each cafe offers unique atmospheres 
            perfect for enjoying your well-earned coffee.
          </p>
        </div>
      </div>
    </section>
  );
};
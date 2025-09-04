import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageSquare, Mail } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose a survey that interests you",
    description: "Browse our available surveys and pick one that matches your experience or interests."
  },
  {
    icon: MessageSquare,
    title: "Answer a few questions honestly",
    description: "Share your authentic thoughts and experiences in our quick, friendly surveys."
  },
  {
    icon: Mail,
    title: "Get your free coffee code by email",
    description: "Receive your coffee reward code instantly and enjoy it at any of our partner cafes."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to earn your free coffee
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="relative group hover:shadow-warm transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center shadow-soft">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
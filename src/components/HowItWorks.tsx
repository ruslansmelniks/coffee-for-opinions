import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageSquare, Mail } from "lucide-react";
const steps = [{
  icon: Search,
  title: "Choose a survey that interests you",
  description: "Browse our available surveys and pick one that matches your experience or interests."
}, {
  icon: MessageSquare,
  title: "Answer a few questions honestly",
  description: "Share your authentic thoughts and experiences in our quick, friendly surveys."
}, {
  icon: Mail,
  title: "Get your free coffee code by email",
  description: "Receive your coffee reward code instantly and enjoy it at any of our partner cafes."
}];
export const HowItWorks = () => {
  return <section className="py-24 bg-background">
      <div className="container px-4">
        
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
          const IconComponent = step.icon;
          return <div key={index} className="text-center group">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-notion-light-gray rounded-xl flex items-center justify-center mx-auto group-hover:bg-notion-hover transition-colors">
                    <IconComponent className="h-8 w-8 text-notion-gray" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
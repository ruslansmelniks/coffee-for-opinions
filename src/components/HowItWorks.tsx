import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageSquare, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Search, MessageSquare, Mail];

export const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {t.howItWorks.steps.map((step, index) => {
            const IconComponent = icons[index];
            return (
              <div key={index} className="text-center group">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
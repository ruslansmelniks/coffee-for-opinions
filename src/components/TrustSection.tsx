import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Coffee } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const TrustSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-6">
                <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-notion-gray" />
                </div>
                <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-notion-gray" />
                </div>
                <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                  <Coffee className="h-8 w-8 text-notion-gray" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground mb-8">
              {t.trust.title}
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t.trust.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
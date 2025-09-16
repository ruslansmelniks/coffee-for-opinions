import { Button } from "@/components/ui/button";
import { Mail, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SurveySubmissionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-notion-light-gray rounded-2xl flex items-center justify-center">
                <Plus className="h-8 w-8 text-notion-gray" />
              </div>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground mb-8">
              {t.submission.title}
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              {t.submission.description}
            </p>
            
            <Button 
              size="lg" 
              variant="notion"
              onClick={() => window.open('mailto:ruslans@coffeedata.lv', '_blank')}
              className="font-medium"
            >
              <Mail className="mr-2 h-5 w-5" />
              {t.submission.contactButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
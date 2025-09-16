import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const SurveySubmissionSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Have a survey you'd like to feature on CoffeeData?
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.open('mailto:ruslans@coffeedata.lv?subject=Survey Submission Request', '_blank')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
};
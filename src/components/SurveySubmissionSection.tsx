import { Button } from "@/components/ui/button";
import { Mail, Plus } from "lucide-react";

export const SurveySubmissionSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Subtle highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Share Your Survey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in mb-8">
            Have a survey you'd like to feature on CoffeeData? We're always looking for interesting research to share with our community.
          </p>
          <Button 
            variant="black" 
            size="lg"
            className="group animate-scale-in"
            onClick={() => window.open('mailto:ruslans@coffeedata.lv?subject=Survey Submission Request', '_blank')}
          >
            <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Submit Your Survey
            <Mail className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
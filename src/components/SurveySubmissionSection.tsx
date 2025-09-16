import { Button } from "@/components/ui/button";
import { Mail, Plus } from "lucide-react";
export const SurveySubmissionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
      
      <div className="container px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 mb-8">
            <Plus className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Partner With Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Want to feature your survey?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Help us grow our community by sharing your research. We're always looking for quality surveys to feature on our platform.
          </p>
          
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('mailto:ruslans@coffeedata.lv', '_blank')}
          >
            <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
};
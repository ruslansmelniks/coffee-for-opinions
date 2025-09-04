import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const surveys = [
  {
    title: "Quick Loans in Latvia",
    description: "Tell us about your experience with fast loans.",
    category: "Finance",
    estimatedTime: "5 min"
  },
  {
    title: "Banks in Latvia", 
    description: "Share your thoughts about banks and fintech.",
    category: "Banking",
    estimatedTime: "7 min"
  },
  {
    title: "Daily Flow App",
    description: "Help validate a new productivity & notes app idea.",
    category: "Technology",
    estimatedTime: "4 min"
  }
];

export const SurveysSection = () => {
  return (
    <section id="surveys" className="py-20 bg-gradient-coffee">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Available Surveys
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a survey that interests you and start earning your coffee
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {surveys.map((survey, index) => (
            <Card key={index} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-coffee-accent bg-coffee-accent/10 px-3 py-1 rounded-full">
                    {survey.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {survey.estimatedTime}
                  </span>
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-coffee-warm transition-colors">
                  {survey.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {survey.description}
                </p>
                <Button 
                  variant="coffee-outline" 
                  className="w-full"
                  disabled
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Take Survey
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Coming soon - Survey links will be added
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
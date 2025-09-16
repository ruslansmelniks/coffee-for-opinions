import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const surveys = [
  {
    title: "Quick Loans in Latvia",
    description: "Tell us about your experience with fast loans.",
    category: "Finance",
    estimatedTime: "5 min",
    url: "https://tally.so/r/nreZV5"
  },
  {
    title: "Banks in Latvia", 
    description: "Share your thoughts about banks and fintech.",
    category: "Banking",
    estimatedTime: "7 min",
    url: "https://tally.so/r/m6glLN"
  },
  {
    title: "P2P Investments",
    description: "Share your experience with P2P platforms like Mintos, Twino, Nectaro.eu.",
    category: "Finance",
    estimatedTime: "6 min",
    url: "https://tally.so/r/wL8LzJ"
  },
  {
    title: "Gambling & Betting in Latvia",
    description: "Tell us about gambling and betting habits in Latvia.",
    category: "Finance",
    estimatedTime: "5 min",
    url: "https://tally.so/r/mVrOLN"
  },
  {
    title: "Daily Flow App",
    description: "Help validate a new productivity & notes app idea.",
    category: "Technology",
    estimatedTime: "4 min",
    url: "https://tally.so/r/nGZDjZ"
  },
  {
    title: "Wellif.ai - Social Health Sharing",
    description: "Help validate an AI tool for social health sharing.",
    category: "Technology",
    estimatedTime: "5 min",
    url: "https://tally.so/r/mKXr6A"
  }
];

export const SurveysSection = () => {
  const { t } = useLanguage();

  return (
    <section id="surveys" className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Subtle highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      <div className="container px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6 animate-fade-in">
            {t.surveys.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            {t.surveys.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {surveys.map((survey, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border border-border hover:border-primary/20 animate-scale-in hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-notion-gray bg-notion-light-gray px-3 py-1 rounded-md">
                    {survey.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {survey.estimatedTime}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-notion-text transition-colors">
                  {survey.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {survey.description}
                </p>
                <Button 
                  variant="black" 
                  className="w-full"
                  onClick={() => window.open(survey.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.surveys.takeButton}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
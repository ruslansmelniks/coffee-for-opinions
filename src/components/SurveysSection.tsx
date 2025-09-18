import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Mail, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    url: "https://tally.so/r/nGZDjZ",
    disabled: true,
    disabledMessage: "☕ Oops! We're brewing more coffee for this one. Check back soon!"
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
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // You'll need to create a Make scenario with a webhook trigger
      // and replace this URL with your Make webhook URL
      const makeWebhookUrl = "YOUR_MAKE_WEBHOOK_URL_HERE";
      
      const response = await fetch(makeWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: email,
          submitted_on: new Date().toISOString(),
          source: "survey_notifications"
        }),
      });

      toast({
        title: "Success!",
        description: "Thank you! We'll notify you when new surveys are available.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Card key={index} className={`group transition-all duration-300 border animate-scale-in relative ${
              survey.disabled 
                ? 'opacity-60 cursor-not-allowed border-border' 
                : 'hover:shadow-elegant border-border hover:border-primary/20 hover:scale-105'
            }`}>
              {survey.disabled && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                  <div className="text-center p-6">
                    <p className="text-sm text-amber-700 dark:text-amber-400 mb-4 font-semibold">
                      {survey.disabledMessage}
                    </p>
                    <Button 
                      variant="outline" 
                      className="cursor-not-allowed border-muted-foreground/30 text-muted-foreground/70"
                      disabled
                    >
                      Currently Unavailable
                    </Button>
                  </div>
                </div>
              )}
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
                  onClick={() => !survey.disabled && window.open(survey.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.surveys.takeButton}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Subscription Form */}
        <div className="max-w-md mx-auto mt-16">
          <Card className="border-border bg-background/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Get Notified
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Be the first to know when new surveys are available
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="notification-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                  variant="default"
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Notify Me
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const surveys = [
  {
    title: "Quick Loans in Latvia",
    description: "Tell us about your experience with fast loans.",
    category: "Finance",
    estimatedTime: "5 min",
    url: "https://tally.so/r/nreZV5",
    disabled: true,
    disabledMessage: "☕ Oops! We're brewing more coffee for this one. Check back soon!"
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
  const [webhookUrl, setWebhookUrl] = useState("https://hook.eu2.make.com/mtpzavwca2ngap7ag0e9lxn03wy6zl7q");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please configure your webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send to webhook (Make.com or Zapier)
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: "survey_notification_signup",
          page: window.location.href,
          submitted_on: new Date().toISOString()
        }),
      });

      setIsSubmitted(true);
      setEmail("");
      
      toast({
        title: "Success!",
        description: "Thank you! We'll notify you when new surveys are available.",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        
        <div className="relative max-w-6xl mx-auto">
          {/* Survey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {surveys.map((survey, index) => (
              <Card key={index} className={`group transition-all duration-300 border animate-scale-in relative ${
                survey.disabled 
                  ? 'opacity-60 cursor-not-allowed border-border' 
                  : 'hover:shadow-elegant border-border hover:border-primary/20 hover:scale-105'
              }`}>
                {survey.disabled && (
                  <div className="absolute bottom-0 left-0 right-0 top-[40%] bg-background/95 backdrop-blur-sm rounded-b-lg flex items-center justify-center z-10">
                    <div className="text-center p-6">
                      <p className="text-sm text-amber-700 dark:text-amber-400 mb-4 font-semibold">
                        {survey.disabledMessage}
                      </p>
                      <Button 
                        variant="secondary" 
                        className="cursor-not-allowed bg-muted text-muted-foreground border border-border hover:bg-muted"
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

          {/* Big Overlay for First Batch Complete */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
            <div className="text-center p-12 max-w-2xl">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  🎉 First Batch Complete!
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for your amazing participation! We're brewing fresh surveys and will restock soon with new opportunities.
                </p>
              </div>

              {/* Email Signup */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary mr-2" />
                  <h4 className="text-xl font-semibold text-foreground">
                    Get Notified
                  </h4>
                </div>
                <p className="text-muted-foreground mb-6">
                  Be the first to know when new surveys are available!
                </p>
                
                {isSubmitted ? (
                  <div className="text-center">
                    <div className="text-primary font-semibold mb-2">✓ Thank you!</div>
                    <p className="text-sm text-muted-foreground">
                      We'll notify you when new surveys are available.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <Input
                      type="url"
                      placeholder="Webhook URL (Make.com or Zapier)"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      required
                      className="w-full text-sm"
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button type="submit" variant="default" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Notify Me"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
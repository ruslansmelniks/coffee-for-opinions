import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Mail, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const HeaderNavigation = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [publishEmail, setPublishEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToNotifications = () => {
    document.getElementById('surveys')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publishEmail) return;

    setIsSubmitting(true);

    try {
      await fetch("https://hook.eu2.make.com/urdo76dj7lsyigol9fem9ea49otjmog5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: publishEmail,
          timestamp: new Date().toISOString(),
          source: "publish_survey_interest",
          page: window.location.href,
          submitted_on: new Date().toISOString()
        }),
      });

      setPublishEmail("");
      setIsModalOpen(false);
      
      toast({
        title: language === 'en' ? "Thank you!" : "Paldies!",
        description: language === 'en' 
          ? "We'll contact you soon about publishing your survey." 
          : "Mēs ar jums sazināsimies drīzumā par jūsu aptaujas publicēšanu.",
      });
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: language === 'en' ? "Error" : "Kļūda",
        description: language === 'en' 
          ? "Something went wrong. Please try again." 
          : "Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <nav className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Publish Survey Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-medium border-border bg-background/90 backdrop-blur-sm hover:bg-secondary"
          >
            <Plus className="mr-1 h-4 w-4" />
            {language === 'en' ? 'Publish your survey' : 'Publicēt aptauju'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {language === 'en' ? 'Publish Your Survey' : 'Publicēt jūsu aptauju'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {language === 'en' 
                ? "Interested in publishing your survey on our platform? Leave your email and we'll contact you with partnership details."
                : "Vēlaties publicēt savu aptauju mūsu platformā? Atstājiet savu e-pastu, un mēs ar jums sazināsimies ar partnerības detaļām."
              }
            </p>
            <form onSubmit={handlePublishSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder={language === 'en' ? "Your email address" : "Jūsu e-pasta adrese"}
                value={publishEmail}
                onChange={(e) => setPublishEmail(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  {language === 'en' ? 'Cancel' : 'Atcelt'}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isSubmitting 
                    ? (language === 'en' ? 'Sending...' : 'Sūta...')
                    : (language === 'en' ? 'Send' : 'Sūtīt')
                  }
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Get Notified Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={scrollToNotifications}
        className="font-medium border-border bg-background/90 backdrop-blur-sm hover:bg-secondary"
      >
        <Mail className="mr-1 h-4 w-4" />
        {language === 'en' ? 'Get notified about new surveys' : 'Saņemt paziņojumus par jaunām aptaujām'}
      </Button>
    </nav>
  );
};
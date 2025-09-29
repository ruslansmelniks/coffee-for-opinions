import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Plus, Menu, FileText } from "lucide-react";
import gintsRekensPhoto from "@/assets/gints-rekens.png";
import coffeDataLogo from "@/assets/coffeedata-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const HeaderNavigation = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const [publishEmail, setPublishEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    if (!isLandingPage) {
      setShowLogo(true);
      return;
    }

    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowLogo(window.scrollY > heroBottom - 100);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

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
    <>
      {/* Logo - Top Left Corner */}
      {showLogo && (
        <div className="fixed top-4 left-4 z-50">
          <Link to="/">
            <img 
              src={coffeDataLogo} 
              alt="CoffeeData Logo" 
              className="max-h-9 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      )}
      
      <nav className="fixed top-4 right-4 z-50">
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-background/80 backdrop-blur-md rounded-lg border border-border/20 p-2 shadow-lg">
        {/* Free Reports Link */}
        <Link to="/free-reports">
          <Button
            variant="outline"
            size="sm"
            className="font-medium border-border/30 bg-background/50 hover:bg-background/80 transition-all"
          >
            <FileText className="mr-1 h-4 w-4" />
            {language === 'en' ? 'Free Reports' : 'Bezmaksas atskaites'}
          </Button>
        </Link>
        {/* Publish Survey Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="font-medium border-border/30 bg-background/50 hover:bg-background/80 transition-all"
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
              
              {/* Testimonial Section - Full Width */}
              <div className="bg-muted/50 rounded-lg p-4 border">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={gintsRekensPhoto} alt="Gints Rekens" />
                    <AvatarFallback>GR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-foreground italic mb-2">
                      "With CoffeeData I got real feedback on my product in just a day - fast, simple, and actually useful. And best of all, I didn't have to annoy my own network to get it."
                    </p>
                    <div>
                      <p className="text-sm font-medium text-foreground">Gints Rekens</p>
                      <p className="text-xs text-muted-foreground">Founder @ Wellif.ai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Get Notified Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={scrollToNotifications}
          className="font-medium border-border/30 bg-background/50 hover:bg-background/80 transition-all"
        >
          <Mail className="mr-1 h-4 w-4" />
          {language === 'en' ? 'Get notified about new surveys' : 'Saņemt paziņojumus par jaunām aptaujām'}
        </Button>
        
        {/* Vertical Separator */}
        <div className="w-px h-8 bg-border/30"></div>
        
        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>

      {/* Mobile Hamburger Menu - Visible only on mobile */}
      <div className="md:hidden bg-background/80 backdrop-blur-md rounded-lg border border-border/20 p-1 shadow-lg">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="font-medium border-border/30 bg-background/50 hover:bg-background/80 transition-all"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 sm:w-96">
            <div className="space-y-6 pt-6">
              {/* Free Reports Link - Mobile */}
              <div className="space-y-4">
                <Link to="/free-reports" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full font-medium"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Free Reports' : 'Bezmaksas atskaites'}
                  </Button>
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-border"></div>
              {/* Publish Survey Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {language === 'en' ? 'Publish Your Survey' : 'Publicēt jūsu aptauju'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en' 
                    ? "Interested in publishing your survey on our platform? Leave your email and we'll contact you with partnership details."
                    : "Vēlaties publicēt savu aptauju mūsu platformā? Atstājiet savu e-pastu, un mēs ar jums sazināsimies ar partnerības detaļām."
                  }
                </p>
                <form onSubmit={handlePublishSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder={language === 'en' ? "Your email address" : "Jūsu e-pasta adrese"}
                    value={publishEmail}
                    onChange={(e) => setPublishEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {isSubmitting 
                      ? (language === 'en' ? 'Sending...' : 'Sūta...')
                      : (language === 'en' ? 'Send' : 'Sūtīt')
                    }
                  </Button>
                </form>
                
                {/* Testimonial Section - Mobile Full Width */}
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={gintsRekensPhoto} alt="Gints Rekens" />
                      <AvatarFallback>GR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-foreground italic mb-2">
                        "With CoffeeData I got real feedback on my product in just a day - fast, simple, and actually useful. And best of all, I didn't have to annoy my own network to get it."
                      </p>
                      <div>
                        <p className="text-sm font-medium text-foreground">Gints Rekens</p>
                        <p className="text-xs text-muted-foreground">Founder @ Wellif.ai</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border"></div>

              {/* Get Notified Section */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    scrollToNotifications();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full font-medium"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Get notified about new surveys' : 'Saņemt paziņojumus par jaunām aptaujām'}
                </Button>
              </div>

              {/* Divider */}
              <div className="border-t border-border"></div>
              
              {/* Language Switcher */}
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
    </>
  );
};
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, X, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import gintsImage from "@/assets/gints-rekens.png";

interface PublishSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishSurveyModal: React.FC<PublishSurveyModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await fetch("https://hook.eu2.make.com/urdo76dj7lsyigol9fem9ea49otjmog5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: "publish_survey_interest",
          page: window.location.href,
          submitted_on: new Date().toISOString()
        }),
      });

      toast({
        title: language === 'en' ? "Thank you!" : "Paldies!",
        description: language === 'en' 
          ? "We'll contact you soon about publishing your survey." 
          : "Mēs ar jums sazināsimies drīzumā par jūsu aptaujas publicēšanu.",
      });
      
      setEmail('');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {language === 'en' ? 'Publish Your Survey' : 'Publicēt jūsu aptauju'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            {language === 'en' 
              ? "Interested in publishing your survey on our platform? Leave your email and we'll contact you with partnership details."
              : "Vēlaties publicēt savu aptauju mūsu platformā? Atstājiet savu e-pastu, un mēs ar jums sazināsimies ar partnerības detaļām."
            }
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder={language === 'en' ? 'Your email address' : 'Jūsu e-pasta adrese'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                {language === 'en' ? 'Cancel' : 'Atcelt'}
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || !email}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isSubmitting 
                  ? (language === 'en' ? 'Sending...' : 'Sūta...') 
                  : (language === 'en' ? 'Send' : 'Sūtīt')
                }
              </Button>
            </div>
          </form>

          {/* Testimonial Section */}
          <div className="bg-muted/30 rounded-lg p-4 mt-6">
            <div className="flex gap-3">
              <img 
                src={gintsImage} 
                alt="Gints Rekens"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <blockquote className="text-sm text-muted-foreground italic mb-2">
                  {language === 'en'
                    ? '"With CoffeeData I got real feedback on my product in just a day - fast, simple, and actually useful. And best of all, I didn\'t have to annoy my own network to get it."'
                    : '"Ar CoffeeData es saņēmu īstu atgriezenisko saiti par savu produktu tikai vienā dienā - ātri, vienkārši un patiešām noderīgi. Un vislabākais no visa - man nebija jāapgrūtina sava tīkla kontakti, lai to iegūtu."'
                  }
                </blockquote>
                <div className="text-xs">
                  <div className="font-semibold text-foreground">Gints Rekens</div>
                  <div className="text-muted-foreground">
                    {language === 'en' ? 'Founder @ Wellif.ai' : 'Dibinātājs @ Wellif.ai'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { SurveysSection } from "@/components/SurveysSection";
import { PartnersSection } from "@/components/PartnersSection";
import { TrustSection } from "@/components/TrustSection";
import { SurveySubmissionSection } from "@/components/SurveySubmissionSection";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Index = () => {
  const scrollToSurveys = () => {
    document.getElementById('surveys')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen">
      <LanguageSwitcher />
      <HeroSection onStartClick={scrollToSurveys} />
      <HowItWorks />
      <SurveysSection />
      <PartnersSection />
      <TrustSection />
      <SurveySubmissionSection />
      <Footer />
    </div>
  );
};

export default Index;
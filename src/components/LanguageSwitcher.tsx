import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'lv' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 left-4 z-50 font-medium border-border bg-background/90 backdrop-blur-sm hover:bg-secondary"
    >
      {language === 'en' ? 'LV' : 'EN'}
    </Button>
  );
};
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <LanguageSwitcher />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">{t.notFound.title}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          {t.notFound.description}
        </p>
        <Button 
          onClick={() => window.location.href = '/'}
          variant="notion"
          size="lg"
          className="font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t.notFound.backHome}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

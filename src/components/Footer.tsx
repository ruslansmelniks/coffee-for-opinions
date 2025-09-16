import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-16">
      <div className="container px-4">
        <div className="text-center">
          <p className="text-xl text-foreground mb-4">
            Made with ☕ in Riga by CoffeeData
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            {t.footer.description}
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            {t.footer.contact}
          </p>
          <div className="flex justify-center space-x-8">
            <Link 
              to="/privacy-policy" 
              className="text-muted-foreground hover:text-foreground transition-colors text-lg"
            >
              {t.footer.privacy}
            </Link>
            <a 
              href="mailto:ruslans@coffeedata.lv" 
              className="text-muted-foreground hover:text-foreground transition-colors text-lg"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
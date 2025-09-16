import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Home size={20} />
          <span>{t.privacy.backHome}</span>
        </Link>
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t.privacy.title}</h1>
          <p className="text-muted-foreground mb-8">{t.privacy.lastUpdated}</p>
          
          <p className="text-lg text-foreground mb-8">
            {t.privacy.sections.intro.content}
          </p>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. {t.privacy.sections.collection.title}</h2>
            <p className="text-foreground mb-4">{t.privacy.sections.collection.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. {t.privacy.sections.usage.title}</h2>
            <p className="text-foreground mb-4">{t.privacy.sections.usage.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. {t.privacy.sections.sharing.title}</h2>
            <p className="text-foreground mb-4">{t.privacy.sections.sharing.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. {t.privacy.sections.retention.title}</h2>
            <p className="text-foreground mb-4">{t.privacy.sections.retention.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. {t.privacy.sections.rights.title}</h2>
            <p className="text-foreground mb-4">{t.privacy.sections.rights.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. {t.privacy.sections.cookies.title}</h2>
            <p className="text-foreground">{t.privacy.sections.cookies.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. {t.privacy.sections.changes.title}</h2>
            <p className="text-foreground">{t.privacy.sections.changes.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. {t.privacy.sections.contact.title}</h2>
            <p className="text-foreground">{t.privacy.sections.contact.content}</p>
          </section>

          <div className="border-t border-border my-8"></div>

          <div className="text-center mt-12">
            <p className="text-foreground">Made with ☕ in Riga by CoffeeData</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
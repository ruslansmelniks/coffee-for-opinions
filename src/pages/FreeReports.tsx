import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Calendar, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import coffeeLogoUrl from "@/assets/caffeine-logo.png";
const FreeReports = () => {
  const {
    language
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [publishEmail, setPublishEmail] = useState('');

  return <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      {/* Header */}
      <header className="bg-white border-b border-border pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Free Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {language === 'en' ? 'Free Reports' : 'Bezmaksas atskaites'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'en' ? 'Professional market research and consumer insights' : 'Profesionāli tirgus pētījumi un patērētāju ieskati'}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Reports */}
        <section className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">
            {language === 'en' ? 'Available Reports' : 'Pieejamās atskaites'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Banking Report */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <Link to="/latvia-banking-market-research-2025" className="group">
                      <CardTitle className="text-xl mb-2 hover:text-primary transition-colors cursor-pointer">
                        {language === 'en' ? 'Latvia Banking Market Research 2025' : 'Latvijas banku tirgus pētījums 2025'}
                      </CardTitle>
                    </Link>
                    <CardDescription className="text-base mb-4">
                      {language === 'en' ? 'Consumer Banking Preferences & Behavior Analysis' : 'Patērētāju banku preferences un uzvedības analīze'}
                    </CardDescription>
                    <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{language === 'en' ? 'September 2025' : 'Septembris 2025'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{language === 'en' ? 'Consumer Survey' : 'Patērētāju aptauja'}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/latvia-banking-market-research-2025" className="w-full">
                    <Button className="w-full">
                      {language === 'en' ? 'View Report' : 'Skatīt atskaiti'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Loans Report */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <Link to="/quick-loans-latvia-market-research-2025" className="group">
                      <CardTitle className="text-xl mb-2 hover:text-primary transition-colors cursor-pointer">
                        {language === 'en' ? 'Quick Loans in Latvia Market Research 2025' : 'Ātro kredītu Latvijā tirgus pētījums 2025'}
                      </CardTitle>
                    </Link>
                    <CardDescription className="text-base mb-4">
                      {language === 'en' ? 'Consumer Behavior & Market Analysis' : 'Patērētāju uzvedības un tirgus analīze'}
                    </CardDescription>
                    <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{language === 'en' ? 'September 2025' : 'Septembris 2025'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{language === 'en' ? 'Market Research' : 'Tirgus pētījums'}</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/quick-loans-latvia-market-research-2025" className="w-full">
                    <Button className="w-full">
                      {language === 'en' ? 'View Report' : 'Skatīt atskaiti'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Publish Your Survey Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Publish Your Survey' : 'Publicējiet savu aptauju'}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'en' 
                  ? 'Have a survey you want to share? We can help you reach a wider audience and generate professional insights from your data.'
                  : 'Vai jums ir aptauja, ko vēlaties dalīt? Mēs varam palīdzēt jums sasniegt plašāku auditoriju un ģenerēt profesionālus ieskatus no jūsu datiem.'
                }
              </p>
              <Button 
                size="lg" 
                className="font-medium px-8 py-3"
                onClick={() => window.open('mailto:ruslans@coffeedata.lv', '_blank')}
              >
                <Plus className="mr-2 h-5 w-5" />
                {language === 'en' ? 'Publish Your Survey' : 'Publicēt aptauju'}
              </Button>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          
        </section>

        {/* Footer Section */}
        <footer className="text-center">
          
        </footer>
      </main>

      <Footer />
    </div>;
};
export default FreeReports;
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Download, Calendar, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hook.eu2.make.com/urdo76dj7lsyigol9fem9ea49otjmog5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          report: 'Banks in Latvia, Autumn 2025',
          timestamp: new Date().toISOString()
        })
      });
      if (response.ok) {
        toast({
          title: language === 'en' ? "Thank you!" : "Paldies!",
          description: language === 'en' ? "We'll send you the download link shortly." : "Mēs drīzumā nosūtīsim jums lejupielādes saiti."
        });
        setFormData({
          name: '',
          email: '',
          company: ''
        });
      } else {
        toast({
          title: language === 'en' ? "Error" : "Kļūda",
          description: language === 'en' ? "Something went wrong. Please try again." : "Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: language === 'en' ? "Error" : "Kļūda",
        description: language === 'en' ? "Something went wrong. Please try again." : "Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.",
        variant: "destructive"
      });
    }
  };
  return <div className="min-h-screen bg-background">
      <LanguageSwitcher />
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
            {/* Featured Report */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <Link to="/latvia-banking-market-research-2025" className="group">
                      <CardTitle className="text-2xl mb-2 hover:text-primary transition-colors cursor-pointer">
                        {language === 'en' ? 'Latvia Banking Market Research 2025' : 'Latvijas banku tirgus pētījums 2025'}
                      </CardTitle>
                    </Link>
                    <CardDescription className="text-lg">
                      {language === 'en' ? 'Consumer Banking Preferences & Behavior Analysis' : 'Patērētāju banku preferences un uzvedības analīze'}
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4 text-sm text-muted-foreground">
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
                  <Link to="/latvia-banking-market-research-2025" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                      {language === 'en' ? 'View Report' : 'Skatīt atskaiti'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              
            </Card>
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-16">
          
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
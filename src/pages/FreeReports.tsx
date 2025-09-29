import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowRight, Download, Calendar, Users, Home } from "lucide-react";
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
  const [bankingFormData, setBankingFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [loansFormData, setLoansFormData] = useState({
    name: '',
    email: '',
    company: ''
  });

  const handleBankingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankingFormData({
      ...bankingFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoansInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoansFormData({
      ...loansFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleBankingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hook.eu2.make.com/urdo76dj7lsyigol9fem9ea49otjmog5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...bankingFormData,
          report: 'Latvia Banking Market Research 2025',
          timestamp: new Date().toISOString(),
          source: 'free_reports_banking',
          page: window.location.href
        })
      });
      if (response.ok) {
        toast({
          title: language === 'en' ? "Thank you!" : "Paldies!",
          description: language === 'en' ? "We'll send you the download link shortly." : "Mēs drīzumā nosūtīsim jums lejupielādes saiti."
        });
        setBankingFormData({
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
      console.error('Error submitting banking form:', error);
      toast({
        title: language === 'en' ? "Error" : "Kļūda",
        description: language === 'en' ? "Something went wrong. Please try again." : "Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.",
        variant: "destructive"
      });
    }
  };

  const handleLoansSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hook.eu2.make.com/urdo76dj7lsyigol9fem9ea49otjmog5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...loansFormData,
          report: 'Quick Loans in Latvia Market Research 2025',
          timestamp: new Date().toISOString(),
          source: 'free_reports_loans',
          page: window.location.href
        })
      });
      if (response.ok) {
        toast({
          title: language === 'en' ? "Thank you!" : "Paldies!",
          description: language === 'en' ? "We'll send you the download link shortly." : "Mēs drīzumā nosūtīsim jums lejupielādes saiti."
        });
        setLoansFormData({
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
      console.error('Error submitting loans form:', error);
      toast({
        title: language === 'en' ? "Error" : "Kļūda",
        description: language === 'en' ? "Something went wrong. Please try again." : "Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.",
        variant: "destructive"
      });
    }
  };
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
                    <Button className="w-full mb-4">
                      {language === 'en' ? 'View Report' : 'Skatīt atskaiti'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 text-sm">
                    {language === 'en' ? 'Get Free Access' : 'Saņemt bezmaksas piekļuvi'}
                  </h4>
                  <form onSubmit={handleBankingSubmit} className="space-y-3">
                    <div>
                      <Label htmlFor="banking-name" className="text-xs">
                        {language === 'en' ? 'Name' : 'Vārds'}
                      </Label>
                      <Input
                        id="banking-name"
                        name="name"
                        value={bankingFormData.name}
                        onChange={handleBankingInputChange}
                        required
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="banking-email" className="text-xs">
                        {language === 'en' ? 'Email' : 'E-pasts'}
                      </Label>
                      <Input
                        id="banking-email"
                        name="email"
                        type="email"
                        value={bankingFormData.email}
                        onChange={handleBankingInputChange}
                        required
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="banking-company" className="text-xs">
                        {language === 'en' ? 'Company' : 'Uzņēmums'}
                      </Label>
                      <Input
                        id="banking-company"
                        name="company"
                        value={bankingFormData.company}
                        onChange={handleBankingInputChange}
                        className="h-8 text-sm"
                      />
                    </div>
                    <Button type="submit" className="w-full h-8 text-sm">
                      <Download className="w-3 h-3 mr-1" />
                      {language === 'en' ? 'Request Download' : 'Pieprasīt lejupielādi'}
                    </Button>
                  </form>
                </div>
              </CardContent>
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
                    <Button className="w-full mb-4">
                      {language === 'en' ? 'View Report' : 'Skatīt atskaiti'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 text-sm">
                    {language === 'en' ? 'Get Free Access' : 'Saņemt bezmaksas piekļuvi'}
                  </h4>
                  <form onSubmit={handleLoansSubmit} className="space-y-3">
                    <div>
                      <Label htmlFor="loans-name" className="text-xs">
                        {language === 'en' ? 'Name' : 'Vārds'}
                      </Label>
                      <Input
                        id="loans-name"
                        name="name"
                        value={loansFormData.name}
                        onChange={handleLoansInputChange}
                        required
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loans-email" className="text-xs">
                        {language === 'en' ? 'Email' : 'E-pasts'}
                      </Label>
                      <Input
                        id="loans-email"
                        name="email"
                        type="email"
                        value={loansFormData.email}
                        onChange={handleLoansInputChange}
                        required
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loans-company" className="text-xs">
                        {language === 'en' ? 'Company' : 'Uzņēmums'}
                      </Label>
                      <Input
                        id="loans-company"
                        name="company"
                        value={loansFormData.company}
                        onChange={handleLoansInputChange}
                        className="h-8 text-sm"
                      />
                    </div>
                    <Button type="submit" className="w-full h-8 text-sm">
                      <Download className="w-3 h-3 mr-1" />
                      {language === 'en' ? 'Request Download' : 'Pieprasīt lejupielādi'}
                    </Button>
                  </form>
                </div>
              </CardContent>
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
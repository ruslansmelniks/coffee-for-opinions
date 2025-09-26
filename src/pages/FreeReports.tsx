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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">
                      {language === 'en' ? 'Latvian Banking Survey 2025' : 'Latvijas banku aptauja 2025'}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {language === 'en' ? 'Consumer Banking Preferences & Behavior Analysis' : 'Patērētāju banku preferences un uzvedības analīze'}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
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
                  <Link to="/latvian-banking-survey">
                    <Button className="ml-4">
                      {language === 'en' ? 'View Report' : 'Skatīt atskaiti'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {language === 'en' ? 'Comprehensive analysis of consumer banking preferences and digital behavior in Latvia. This report reveals key insights into mobile banking adoption, fintech usage, and trust distribution among major banking institutions.' : 'Visaptverošā patērētāju banku preferenču un digitālās uzvedības analīze Latvijā. Šī atskaite atklāj galvenos ieskatus par mobilo banku pieņemšanu, fintech izmantošanu un uzticības sadali starp galvenajām banku iestādēm.'}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">90%</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Mobile Preference' : 'Mobilās preferences'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">71%</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Fintech Adoption' : 'Fintech pieņemšana'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">43%</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Trust Swedbank' : 'Uzticas Swedbank'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Request Full Report Access' : 'Pieprasīt pilnas atskaites piekļuvi'}
              </CardTitle>
              <CardDescription>
                {language === 'en' ? 'Get the complete banking survey report with detailed methodology and additional insights.' : 'Saņemiet pilnu banku aptaujas atskaiti ar detalizētu metodoloģiju un papildu ieskatu.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      {language === 'en' ? 'Full Name' : 'Pilns vārds'}
                    </Label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required placeholder={language === 'en' ? 'Enter your full name' : 'Ievadiet savu pilno vārdu'} />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {language === 'en' ? 'Email Address' : 'E-pasta adrese'}
                    </Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder={language === 'en' ? 'Enter your email' : 'Ievadiet savu e-pastu'} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">
                    {language === 'en' ? 'Company (Optional)' : 'Uzņēmums (neobligāti)'}
                  </Label>
                  <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder={language === 'en' ? 'Enter your company name' : 'Ievadiet uzņēmuma nosaukumu'} />
                </div>
                <Button type="submit" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Request Download Link' : 'Pieprasīt lejupielādes saiti'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'More Reports Coming Soon' : 'Drīzumā vairāk atskaišu'}
              </CardTitle>
              <CardDescription>
                {language === 'en' ? 'We are continuously conducting research to provide you with the latest market insights.' : 'Mēs nepārtraukti veicam pētījumus, lai nodrošinātu jums jaunākos tirgus ieskatus.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>
                    {language === 'en' ? 'E-commerce Consumer Behavior in the Baltics' : 'E-komercijas patērētāju uzvedība Baltijā'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>
                    {language === 'en' ? 'Cryptocurrency Adoption in Latvia' : 'Kriptovalūtu pieņemšana Latvijā'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>
                    {language === 'en' ? 'Sustainable Consumer Trends 2025' : 'Ilgtspējīgo patērētāju tendences 2025'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Section */}
        <footer className="text-center">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'About Our Research' : 'Par mūsu pētījumiem'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {language === 'en' ? 'Consumer preferences and behavior analysis conducted in Latvia. Data collected through structured questionnaire methodology.' : 'Patērētāju preferenču un uzvedības analīze, kas veikta Latvijā. Dati savākti, izmantojot strukturētu anketu metodoloģiju.'}
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'en' ? 'For more information:' : 'Sīkākai informācijai:'}
                </p>
                <p className="text-muted-foreground">📧 ruslans@coffeedata.lv</p>
              </div>
            </CardContent>
          </Card>
        </footer>
      </main>

      <Footer />
    </div>;
};
export default FreeReports;
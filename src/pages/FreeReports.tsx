import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, Calendar, Users, FileText, Mail, Building2, CreditCard, Smartphone, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import coffeeLogoImg from "@/assets/caffeine-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FreeReports = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const handleDownloadRequest = async (reportTitle: string) => {
    if (!email) {
      toast({
        title: language === 'en' ? "Email Required" : "Nepieciešams e-pasts",
        description: language === 'en' 
          ? "Please enter your email to download the report." 
          : "Lūdzu, ievadiet savu e-pastu, lai lejupielādētu atskaiti.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("https://hook.eu2.make.com/urdo76dj7lsyigol9fem9ea49otjmog5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: "free_report_download",
          report_title: reportTitle,
          page: window.location.href,
          submitted_on: new Date().toISOString()
        }),
      });

      toast({
        title: language === 'en' ? "Thank you!" : "Paldies!",
        description: language === 'en' 
          ? "We'll send you the download link shortly." 
          : "Mēs drīzumā nosūtīsim jums lejupielādes saiti.",
      });
      
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: "overview", label: language === 'en' ? "Overview" : "Pārskats" },
    { id: "demographics", label: language === 'en' ? "Demographics" : "Demogrāfija" },
    { id: "preferences", label: language === 'en' ? "Bank Preferences" : "Banku preferences" },
    { id: "digital", label: language === 'en' ? "Digital Behavior" : "Digitālā uzvedība" },
    { id: "findings", label: language === 'en' ? "Key Findings" : "Galvenie secinājumi" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <LanguageSwitcher />
      <HeaderNavigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-8 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <img src={coffeeLogoImg} alt="CoffeeData.lv" className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold text-primary">CoffeeData.lv</h1>
              <p className="text-muted-foreground italic">Consumer Research & Market Analysis</p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'en' ? 'Latvian Banking Survey Results' : 'Latvijas banku aptaujas rezultāti'}
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              {language === 'en' ? 'Consumer Banking Preferences & Behavior Analysis' : 'Patērētāju banku preferences un uzvedības analīze'}
            </p>
            <p className="text-primary font-medium">
              {language === 'en' ? 'September 2025 • Consumer Survey' : 'Septembris 2025 • Patērētāju aptauja'}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                onClick={() => scrollToSection(section.id)}
                className="whitespace-nowrap"
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        
        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24">
          <div className="grid gap-8">
            {/* Key Statistics Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <Smartphone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-blue-600 mb-2">90%</h3>
                <p className="font-semibold mb-1">
                  {language === 'en' ? 'Mobile Preference' : 'Mobilās preferences'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Use mobile banking apps' : 'Izmanto mobilo banku aplikācijas'}
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-green-600 mb-2">71%</h3>
                <p className="font-semibold mb-1">
                  {language === 'en' ? 'Fintech Adoption' : 'Fintech pieņemšana'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Already using alternatives' : 'Jau izmanto alternatīvas'}
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Building2 className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-amber-600 mb-2">43%</h3>
                <p className="font-semibold mb-1">
                  {language === 'en' ? 'Trust Leader: Swedbank' : 'Uzticamības līderis: Swedbank'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Market trust' : 'Tirgus uzticība'}
                </p>
              </Card>
            </div>

            {/* Key Survey Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  {language === 'en' ? 'Key Survey Insights' : 'Galvenie aptaujas ieskati'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>{language === 'en' 
                      ? '90% of respondents prefer mobile banking applications over traditional internet banking'
                      : '90% respondentu dod priekšroku mobilo banku aplikācijām nevis tradicionālajai internetbankai'
                    }</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>{language === 'en' 
                      ? '71% are already using fintech solutions like Revolut or Wise alongside traditional banks'
                      : '71% jau izmanto fintech risinājumus kā Revolut vai Wise līdzās tradicionālajām bankām'
                    }</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>{language === 'en' 
                      ? 'Rate sensitivity is the primary driver for bank switching (38% of responses)'
                      : 'Likmju jutība ir galvenais bankas maiņas dzinējspēks (38% atbilžu)'
                    }</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>{language === 'en' 
                      ? "Equal perception of banks being both 'fair & transparent' and 'too expensive' (38% each)"
                      : "Vienāda banku uztvere kā 'godīgas un pārredzamas' un 'pārāk dārgas' (38% katrs)"
                    }</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>{language === 'en' 
                      ? 'Swedbank maintains the strongest trust position with 43% of respondents'
                      : 'Swedbank saglabā visrītāko uzticības pozīciju ar 43% respondentu'
                    }</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Demographics Section */}
        <section id="demographics" className="scroll-mt-24">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Demographics' : 'Demogrāfija'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Age Distribution */}
                <div>
                  <h4 className="font-semibold mb-4">{language === 'en' ? 'Age Distribution' : 'Vecuma sadalījums'}</h4>
                  <div className="h-64">
                    <Bar
                      data={{
                        labels: ['25-34', '35-44', '18-24'],
                        datasets: [{
                          label: '%',
                          data: [57, 29, 14],
                          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                        }]
                      }}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Gender Distribution */}
                <div>
                  <h4 className="font-semibold mb-4">{language === 'en' ? 'Gender Distribution' : 'Dzimuma sadalījums'}</h4>
                  <div className="h-64">
                    <Doughnut
                      data={{
                        labels: [language === 'en' ? 'Female' : 'Sievietes', language === 'en' ? 'Male' : 'Vīrieši'],
                        datasets: [{
                          data: [76, 24],
                          backgroundColor: ['#ec4899', '#3b82f6'],
                        }]
                      }}
                      options={pieOptions}
                    />
                  </div>
                </div>

                {/* Income Distribution */}
                <div>
                  <h4 className="font-semibold mb-4">{language === 'en' ? 'Income Distribution' : 'Ienākumu sadalījums'}</h4>
                  <div className="h-64">
                    <Pie
                      data={{
                        labels: ['2000+ €', '1200–2000 €', '700–1200 €'],
                        datasets: [{
                          data: [43, 43, 14],
                          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
                        }]
                      }}
                      options={pieOptions}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bank Preferences Section */}
        <section id="preferences" className="scroll-mt-24">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Most Trusted Banks' : 'Visuzticamākās bankas'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ['Swedbank', 'Citadele', 'SEB', 'Luminor'],
                      datasets: [{
                        label: '%',
                        data: [43, 24, 24, 9],
                        backgroundColor: '#10b981',
                      }]
                    }}
                    options={chartOptions}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Banks with Worst Reputation' : 'Bankas ar sliktāko reputāciju'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Rietumu Banka</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>OP Bank</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '28%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Blue Or</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? 'Regional Banks' : 'Reģionālās bankas'}</span>
                      <span>12%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '12%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Bank Perceptions' : 'Banku uztvere'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? 'Fair and transparent' : 'Godīgas un pārredzamas'}</span>
                      <span>38%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '38%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? 'Too expensive' : 'Pārāk dārgas'}</span>
                      <span>38%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '38%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? 'Innovative and modern' : 'Inovatīvas un mūsdienīgas'}</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '33%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>{language === 'en' ? 'Outdated and slow' : 'Novecojušas un lēnas'}</span>
                      <span>29%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '29%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Digital Behavior Section */}
        <section id="digital" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Banking Channel Preference' : 'Banku kanālu preferences'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut
                    data={{
                      labels: [
                        language === 'en' ? 'Mobile app' : 'Mobilā aplikācija', 
                        language === 'en' ? 'Internet banking' : 'Internetbanka'
                      ],
                      datasets: [{
                        data: [90, 10],
                        backgroundColor: ['#3b82f6', '#64748b'],
                      }]
                    }}
                    options={pieOptions}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Fintech Usage (Revolut, Wise, N26)' : 'Fintech lietošana (Revolut, Wise, N26)'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie
                    data={{
                      labels: [
                        language === 'en' ? 'Already using' : 'Jau izmanto', 
                        language === 'en' ? 'Considering' : 'Apsver', 
                        language === 'en' ? 'Not interested' : 'Neinteresē'
                      ],
                      datasets: [{
                        data: [71, 19, 10],
                        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                      }]
                    }}
                    options={pieOptions}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Findings Section */}
        <section id="findings" className="scroll-mt-24">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Bank Switching Factors' : 'Bankas maiņas faktori'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: [
                        language === 'en' ? 'Higher savings rates' : 'Augstākas uzkrājumu likmes',
                        language === 'en' ? 'Lower fees' : 'Zemākas komisijas',
                        language === 'en' ? 'Better service' : 'Labāks serviss',
                        language === 'en' ? 'Better app' : 'Labāka aplikācija',
                        language === 'en' ? 'More investments' : 'Vairāk investīciju'
                      ],
                      datasets: [{
                        label: '%',
                        data: [38, 29, 19, 14, 10],
                        backgroundColor: '#3b82f6',
                      }]
                    }}
                    options={{
                      ...chartOptions,
                      indexAxis: 'y' as const,
                      scales: {
                        x: {
                          beginAtZero: true,
                          max: 50,
                          ticks: {
                            callback: function(value: any) {
                              return value + '%';
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Common Customer Frustrations' : 'Biežākās klientu frustrācijas'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{language === 'en' 
                        ? 'Lacking functionality in mobile apps (advanced search, payment features)'
                        : 'Trūkst funkcionalitātes mobilajās aplikācijās (izvērstā meklēšana, maksājumu funkcijas)'
                      }</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{language === 'en' 
                        ? 'High fees and expensive services compared to alternatives'
                        : 'Augstas komisijas un dārgi pakalpojumi salīdzinājumā ar alternatīvām'
                      }</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{language === 'en' 
                        ? 'Slow customer service response times'
                        : 'Lēni klientu servisa atbildes laiki'
                      }</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{language === 'en' 
                        ? 'Outdated technology and user interfaces'
                        : 'Novecojusi tehnoloģija un lietotāju saskarnes'
                      }</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{language === 'en' 
                        ? 'Limited investment and savings options with competitive rates'
                        : 'Ierobežotas investīciju un uzkrājumu iespējas ar konkurētspējīgām likmēm'
                      }</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Summary Analysis' : 'Kopsavilkuma analīze'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p>
                    {language === 'en' 
                      ? 'The survey reveals a predominantly digital-first banking preference among respondents, with mobile applications being the overwhelmingly preferred banking channel. This demographic shows significant adoption of fintech alternatives, indicating potential market disruption in traditional banking services.'
                      : 'Aptauja atklāj galvenokārt digitālu banku pakalpojumu preferences respondentu vidū, ar mobilajām aplikācijām kā pārāk dominējošo banku kanālu. Šī demogrāfiskā grupa uzrāda ievērojamu fintech alternatīvu pieņemšanu, norādot uz potenciālu tirgus traucējumu tradicionālajos banku pakalpojumos.'
                    }
                  </p>
                  <p>
                    {language === 'en' 
                      ? 'Trust distribution shows market concentration with Swedbank maintaining leadership position, while perception data reveals polarized views on banking services - customers simultaneously view banks as transparent yet expensive.'
                      : 'Uzticības sadalījums rāda tirgus koncentrāciju ar Swedbank, kas saglabā līdera pozīciju, kamēr uztveres dati atklāj polarizētus viedokļus par banku pakalpojumiem - klienti vienlaikus uzskata bankas par pārredzamām, tomēr dārgām.'
                    }
                  </p>
                  <p>
                    {language === 'en' 
                      ? 'Rate sensitivity emerges as the primary switching motivator, suggesting that competitive pricing strategies could effectively influence customer loyalty and acquisition in this market segment.'
                      : 'Likmju jutība parādās kā galvenais maiņas motivators, norādot, ka konkurētspējīgas cenu stratēģijas varētu efektīvi ietekmēt klientu lojalitāti un piesaisti šajā tirgus segmentā.'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="scroll-mt-24">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    {language === 'en' ? 'Download Full Report' : 'Lejupielādēt pilno atskaiti'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'en' 
                      ? "Get the complete banking survey report with detailed analysis, methodology, and additional insights."
                      : "Iegūstiet pilnu banku aptaujas atskaiti ar detalizētu analīzi, metodoloģiju un papildu ieskaitiem."
                    }
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-background/50 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-sm font-medium">Sept 2025</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-sm font-medium">1,200+</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded-lg">
                      <FileText className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-sm font-medium">45 {language === 'en' ? 'pages' : 'lappuses'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background/50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder={language === 'en' ? "Your email address" : "Jūsu e-pasta adrese"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      onClick={() => handleDownloadRequest(language === 'en' ? "Banks in Latvia - Autumn 2025" : "Bankas Latvijā - Rudens 2025")}
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {isSubmitting 
                        ? (language === 'en' ? 'Sending...' : 'Sūta...')
                        : (language === 'en' ? 'Get Download Link' : 'Saņemt lejupielādes saiti')
                      }
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {language === 'en' 
                        ? "We respect your privacy. No spam, unsubscribe anytime."
                        : "Mēs respektējam jūsu privātumu. Nekāda mēstule, atteikties jebkurā laikā."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer Section */}
      <section className="bg-muted/30 py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{language === 'en' ? 'About This Survey' : 'Par šo aptauju'}</h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' 
                  ? "Consumer banking preferences and behavior analysis conducted in Latvia. Data collected through structured questionnaire methodology."
                  : "Patērētāju banku preferences un uzvedības analīze, kas veikta Latvijā. Dati savākti ar strukturētas anketas metodoloģiju."
                }
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{language === 'en' ? 'Contact Information' : 'Kontaktinformācija'}</h3>
              <p className="text-muted-foreground mb-2">
                {language === 'en' ? 'For more information:' : 'Sīkākai informācijai:'}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                ruslans@coffeedata.lv
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeReports;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, Calendar, Users, FileText, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FreeReports = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const reports = [
    {
      title: language === 'en' ? "Banks in Latvia - Autumn 2025" : "Bankas Latvijā - Rudens 2025",
      description: language === 'en' 
        ? "Comprehensive analysis of the Latvian banking sector including market share, digital transformation trends, and customer satisfaction insights."
        : "Visaptverošs Latvijas banku sektora analīze, ieskaitot tirgus daļas, digitālās transformācijas tendences un klientu apmierinātības ieskatus.",
      releaseDate: "October 2025",
      participants: "1,200+",
      pages: "45",
      category: language === 'en' ? "Financial Services" : "Finanšu pakalpojumi",
      highlights: language === 'en' 
        ? [
            "Market leader analysis",
            "Digital banking adoption rates", 
            "Customer experience benchmarks",
            "Future trends forecast"
          ]
        : [
            "Tirgus līdera analīze",
            "Digitālās banku pakalpojumu pieņemšanas rādītāji",
            "Klientu pieredzes etaloni", 
            "Nākotnes tendenču prognoze"
          ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <LanguageSwitcher />
      <HeaderNavigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            {language === 'en' ? 'Free Industry Reports' : 'Bezmaksas nozares atskaites'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {language === 'en' 
              ? "Get exclusive insights and data-driven analysis from our comprehensive industry research. Download detailed reports for free."
              : "Iegūstiet ekskluzīvus ieskatus un uz datiem balstītu analīzi no mūsu visaptverošajiem nozares pētījumiem. Lejupielādējiet detalizētas atskaites bez maksas."
            }
          </p>
        </div>
      </section>

      {/* Reports Section */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {reports.map((report, index) => (
              <Card key={index} className="overflow-hidden shadow-lg border-2 border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        {report.title}
                      </CardTitle>
                      <CardDescription className="text-base text-muted-foreground">
                        {report.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="self-start">
                      {report.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Report Details */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                          <p className="text-sm font-medium">{report.releaseDate}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Release' : 'Izlaists'}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                          <p className="text-sm font-medium">{report.participants}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Participants' : 'Dalībnieki'}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <FileText className="h-5 w-5 text-primary mx-auto mb-1" />
                          <p className="text-sm font-medium">{report.pages}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Pages' : 'Lappuses'}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          {language === 'en' ? 'Key Highlights:' : 'Galvenie akcenti:'}
                        </h4>
                        <ul className="space-y-2">
                          {report.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Download Form */}
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg border">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Download className="h-5 w-5 text-primary" />
                        {language === 'en' ? 'Download Report' : 'Lejupielādēt atskaiti'}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? "Enter your email address to receive the download link"
                          : "Ievadiet savu e-pasta adresi, lai saņemtu lejupielādes saiti"
                        }
                      </p>
                      <div className="space-y-3">
                        <Input
                          type="email"
                          placeholder={language === 'en' ? "Your email address" : "Jūsu e-pasta adrese"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background/50"
                        />
                        <Button
                          onClick={() => handleDownloadRequest(report.title)}
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          {isSubmitting 
                            ? (language === 'en' ? 'Sending...' : 'Sūta...')
                            : (language === 'en' ? 'Get Download Link' : 'Saņemt lejupielādes saiti')
                          }
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {language === 'en' 
                          ? "We respect your privacy. No spam, unsubscribe anytime."
                          : "Mēs respektējam jūsu privātumu. Nekāda mēstule, atteikties jebkurā laikā."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-muted/50 to-muted/30 border-dashed">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'More Reports Coming Soon' : 'Drīzumā būs pieejamas vairāk atskaites'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'en' 
                    ? "Stay tuned for upcoming industry reports covering technology, retail, healthcare, and more sectors."
                    : "Sekojiet līdzi gaidāmajām nozares atskaitēm, kas aptvers tehnoloģiju, mazumtirdzniecības, veselības aprūpes un citas nozares."
                  }
                </p>
                <Button variant="outline" onClick={() => {
                  document.getElementById('surveys')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  {language === 'en' ? 'Get Notified' : 'Saņemt paziņojumus'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeReports;
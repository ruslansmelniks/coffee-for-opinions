import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import coffeeLogoUrl from "@/assets/caffeine-logo.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const LatvianBankingSurvey = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyStatsData = [
    { title: "Mobile Preference", value: "90%", description: "Use mobile banking apps" },
    { title: "Fintech Adoption", value: "71%", description: "Already using alternatives" },
    { title: "Trust Leader", value: "Swedbank", description: "43% market trust" }
  ];

  const ageDistributionData = {
    labels: ['25-34', '35-44', '18-24'],
    datasets: [{
      data: [57, 29, 14],
      backgroundColor: ['hsl(221, 83%, 53%)', 'hsl(210, 13%, 50%)', 'hsl(142, 76%, 36%)'],
      borderWidth: 0,
    }]
  };

  const incomeDistributionData = {
    labels: ['2000+ €', '1200–2000 €', '700–1200 €'],
    datasets: [{
      data: [43, 43, 14],
      backgroundColor: ['hsl(221, 83%, 53%)', 'hsl(210, 13%, 50%)', 'hsl(142, 76%, 36%)'],
      borderWidth: 0,
    }]
  };

  const bankTrustData = {
    labels: ['Swedbank', 'Citadele', 'SEB', 'Luminor'],
    datasets: [{
      data: [43, 24, 24, 9],
      backgroundColor: ['hsl(221, 83%, 53%)', 'hsl(210, 13%, 50%)', 'hsl(142, 76%, 36%)', 'hsl(45, 93%, 47%)'],
      borderWidth: 0,
    }]
  };

  const fintechUsageData = {
    labels: ['Already using', 'Considering', 'Not interested'],
    datasets: [{
      data: [71, 19, 10],
      backgroundColor: ['hsl(221, 83%, 53%)', 'hsl(45, 93%, 47%)', 'hsl(0, 84%, 60%)'],
      borderWidth: 0,
    }]
  };

  const switchingFactorsData = {
    labels: ['Higher savings interest rates', 'Lower fees', 'Better customer service', 'Better mobile app experience', 'More investment opportunities'],
    datasets: [{
      data: [38, 29, 19, 14, 10],
      backgroundColor: 'hsl(221, 83%, 53%)',
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  };

  const ProgressBar = ({ label, percentage, color = "hsl(221, 83%, 53%)" }: { label: string; percentage: number; color?: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/free-reports" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Free Reports
          </Link>
          <div className="flex items-center gap-4">
            <img src={coffeeLogoUrl} alt="CoffeeData.lv" className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">CoffeeData.lv</h1>
              <p className="text-muted-foreground italic">Consumer Research & Market Analysis</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-foreground">Latvian Banking Survey Results</h2>
            <p className="text-lg text-muted-foreground font-semibold">Consumer Banking Preferences & Behavior Analysis</p>
            <p className="text-sm text-muted-foreground mt-2">September 2025 • Consumer Survey</p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 bg-white border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'demographics', label: 'Demographics' },
              { id: 'bank-preferences', label: 'Bank Preferences' },
              { id: 'digital-behavior', label: 'Digital Behavior' },
              { id: 'key-findings', label: 'Key Findings' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className="whitespace-nowrap py-4 px-6"
                onClick={() => scrollToSection(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Overview</h3>
          
          {/* Key Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {keyStatsData.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-primary">{stat.value}</CardTitle>
                  <CardDescription className="font-semibold">{stat.title}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Survey Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Survey Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-3 mt-0.5">90%</Badge>
                  <span>of respondents prefer mobile banking applications over traditional internet banking</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-3 mt-0.5">71%</Badge>
                  <span>are already using fintech solutions like Revolut or Wise alongside traditional banks</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-3 mt-0.5">38%</Badge>
                  <span>Rate sensitivity is the primary driver for bank switching (38% of responses)</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-3 mt-0.5">38%</Badge>
                  <span>Equal perception of banks being both 'fair & transparent' and 'too expensive' (38% each)</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="secondary" className="mr-3 mt-0.5">43%</Badge>
                  <span>Swedbank maintains the strongest trust position with 43% of respondents</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Demographics Section */}
        <section id="demographics" className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Demographics</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={ageDistributionData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ProgressBar label="Female" percentage={76} />
                  <ProgressBar label="Male" percentage={24} color="hsl(210, 13%, 50%)" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie data={incomeDistributionData} options={pieChartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bank Preferences Section */}
        <section id="bank-preferences" className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Bank Preferences</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Trusted Banks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={bankTrustData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banks with Worst Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ProgressBar label="Rietumu Banka" percentage={35} color="hsl(0, 84%, 60%)" />
                  <ProgressBar label="OP Bank" percentage={28} color="hsl(0, 84%, 60%)" />
                  <ProgressBar label="Blue Or" percentage={25} color="hsl(0, 84%, 60%)" />
                  <ProgressBar label="Regional Banks" percentage={12} color="hsl(0, 84%, 60%)" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bank Perceptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ProgressBar label="Fair and transparent" percentage={38} color="hsl(142, 76%, 36%)" />
                  <ProgressBar label="Too expensive" percentage={38} color="hsl(0, 84%, 60%)" />
                </div>
                <div className="space-y-4">
                  <ProgressBar label="Innovative and modern" percentage={33} color="hsl(221, 83%, 53%)" />
                  <ProgressBar label="Outdated and slow" percentage={29} color="hsl(45, 93%, 47%)" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Digital Behavior Section */}
        <section id="digital-behavior" className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Digital Behavior</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Banking Channel Preference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ProgressBar label="Mobile app" percentage={90} />
                  <ProgressBar label="Internet banking" percentage={10} color="hsl(210, 13%, 50%)" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fintech (Revolut, Wise, N26) Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie data={fintechUsageData} options={pieChartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Findings Section */}
        <section id="key-findings" className="mb-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Key Findings</h3>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bank Switching Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Bar data={switchingFactorsData} options={{
                  ...chartOptions,
                  indexAxis: 'y' as const,
                  scales: {
                    x: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value: any) {
                          return value + '%';
                        }
                      }
                    }
                  }
                }} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Customer Frustrations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Lacking functionality in mobile apps (advanced search, payment features)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>High fees and expensive services compared to alternatives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Slow customer service response times</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Outdated technology and user interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Limited investment and savings options with competitive rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    The survey reveals a predominantly digital-first banking preference among respondents, with mobile applications being the overwhelmingly preferred banking channel. This demographic shows significant adoption of fintech alternatives, indicating potential market disruption in traditional banking services.
                  </p>
                  <p>
                    Trust distribution shows market concentration with Swedbank maintaining leadership position, while perception data reveals polarized views on banking services - customers simultaneously view banks as transparent yet expensive.
                  </p>
                  <p>
                    Rate sensitivity emerges as the primary switching motivator, suggesting that competitive pricing strategies could effectively influence customer loyalty and acquisition in this market segment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Footer Section */}
        <footer className="text-center">
          <Card>
            <CardHeader>
              <CardTitle>About This Survey</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Consumer banking preferences and behavior analysis conducted in Latvia. Data collected through structured questionnaire methodology.
              </p>
              <div>
                <p className="font-semibold text-foreground">For more information:</p>
                <p className="text-muted-foreground">📧 ruslans@coffeedata.lv</p>
              </div>
            </CardContent>
          </Card>
        </footer>
      </main>
    </div>
  );
};

export default LatvianBankingSurvey;
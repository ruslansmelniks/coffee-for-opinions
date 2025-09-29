import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { PublishSurveyModal } from "@/components/PublishSurveyModal";

const QuickLoansLatvia = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Quick Loans in Latvia - Market Research Report 2025 | Consumer Behavior & Market Analysis";
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Pārskats' },
    { id: 'demographics', label: language === 'en' ? 'Demographics' : 'Demogrāfija' },
    { id: 'usage', label: language === 'en' ? 'Usage Patterns' : 'Lietošanas modeļi' },
    { id: 'factors', label: language === 'en' ? 'Decision Factors' : 'Lēmuma faktori' },
    { id: 'findings', label: language === 'en' ? 'Key Findings' : 'Galvenie secinājumi' }
  ];

  return (
    <div className="min-h-screen bg-background">
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
                    {language === 'en' ? 'Home' : 'Sākums'}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/free-reports">
                    {language === 'en' ? 'Free Reports' : 'Bezmaksas atskaites'}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {language === 'en' ? 'Quick Loans Latvia Market Research 2025' : 'Ātro kredītu Latvijā tirgus pētījums 2025'}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-4 sm:mt-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {language === 'en' ? 'Quick Loans in Latvia Market Research 2025' : 'Ātro kredītu Latvijā tirgus pētījums 2025'}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-semibold">
              {language === 'en' ? 'Consumer Behavior & Market Analysis' : 'Patērētāju uzvedības un tirgus analīze'}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {language === 'en' ? 'September 2025 • Market Research' : 'Septembris 2025 • Tirgus pētījums'}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex gap-1 overflow-x-auto border-b border-border">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-foreground border-b-2 border-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div id="overview" className="space-y-12">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
                <div className="text-6xl font-extrabold text-blue-600 mb-2">93%</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  {language === 'en' ? 'Infrequent Users' : 'Reti lietotāji'}
                </div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Once in lifetime or yearly' : 'Reizi dzīvē vai gadā'}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
                <div className="text-6xl font-extrabold text-blue-600 mb-2">64%</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  {language === 'en' ? 'Emergency Expenses' : 'Ārkārtas izdevumi'}
                </div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Primary use case' : 'Galvenais lietošanas gadījums'}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
                <div className="text-5xl font-extrabold text-blue-600 mb-2">SmsCredit</div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  {language === 'en' ? 'Market Leader' : 'Tirgus līderis'}
                </div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? '28.6% market share' : '28,6% tirgus daļa'}
                </div>
              </div>
            </div>

            {/* Key Survey Insights */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === 'en' ? 'Key Survey Insights' : 'Galvenie aptaujas secinājumi'}
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-foreground mt-0.5">93%</span>
                  <span className="text-muted-foreground">
                    {language === 'en' 
                      ? 'of respondents are infrequent users (once in lifetime or yearly)'
                      : 'respondentu ir reti lietotāji (reizi dzīvē vai gadā)'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-foreground mt-0.5">64%</span>
                  <span className="text-muted-foreground">
                    {language === 'en'
                      ? 'use quick loans specifically for emergency and unexpected expenses'
                      : 'izmanto ātros kredītus īpaši ārkārtas un neparedzētiem izdevumiem'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-foreground mt-0.5">91%</span>
                  <span className="text-muted-foreground">
                    {language === 'en'
                      ? 'rate speed of approval as the most important factor'
                      : 'vērtē apstiprināšanas ātrumu kā svarīgāko faktoru'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-foreground mt-0.5">89%</span>
                  <span className="text-muted-foreground">
                    {language === 'en'
                      ? 'equal perception of importance between transparency and interest rates'
                      : 'vienādi vērtē caurspīdīgumu un procentu likmes'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-foreground mt-0.5">29%</span>
                  <span className="text-muted-foreground">
                    {language === 'en'
                      ? 'SmsCredit maintains the strongest market position with 28.6% of respondents'
                      : 'SmsCredit saglabā stiprāko tirgus pozīciju ar 28,6% respondentu'
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Demographics Tab */}
        {activeTab === 'demographics' && (
          <div id="demographics" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {language === 'en' ? 'Demographics' : 'Demogrāfija'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === 'en' ? 'Profile of quick loan users in Latvia' : 'Ātro kredītu lietotāju profils Latvijā'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Age Distribution */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Age Distribution' : 'Vecuma sadalījums'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">25-34</span>
                      <span className="text-sm font-semibold text-foreground">78.6%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '78.6%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">18-24</span>
                      <span className="text-sm font-semibold text-foreground">14.3%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">35-44</span>
                      <span className="text-sm font-semibold text-foreground">7.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender Distribution */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Gender Distribution' : 'Dzimuma sadalījums'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Male' : 'Vīrieši'}
                      </span>
                      <span className="text-sm font-semibold text-foreground">57.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '57.1%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Female' : 'Sievietes'}
                      </span>
                      <span className="text-sm font-semibold text-foreground">42.9%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '42.9%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 md:col-span-2">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Geographic Distribution' : 'Ģeogrāfiskais sadalījums'}
                </h3>
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Rīga</span>
                      <span className="text-sm font-semibold text-foreground">85.7%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '85.7%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Jūrmala</span>
                      <span className="text-sm font-semibold text-foreground">7.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Valmiera</span>
                      <span className="text-sm font-semibold text-foreground">7.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage Patterns Tab */}
        {activeTab === 'usage' && (
          <div id="usage" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {language === 'en' ? 'Usage Patterns' : 'Lietošanas modeļi'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === 'en' ? 'How users interact with quick loan services' : 'Kā lietotāji mijiedarbojas ar ātro kredītu pakalpojumiem'}
              </p>
            </div>

            {/* Most Used Providers */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {language === 'en' ? 'Most Used Providers' : 'Visbiežāk izmantotie pakalpojumu sniedzēji'}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">SmsCredit</span>
                    <span className="text-sm font-semibold text-foreground">28.6%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '28.6%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Vivus</span>
                    <span className="text-sm font-semibold text-foreground">23.8%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '23.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Esto</span>
                    <span className="text-sm font-semibold text-foreground">14.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Credit24</span>
                    <span className="text-sm font-semibold text-foreground">14.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Bino</span>
                    <span className="text-sm font-semibold text-foreground">9.5%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '9.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Other</span>
                    <span className="text-sm font-semibold text-foreground">9.5%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '9.5%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 bg-slate-50 p-3 rounded">
                <strong>{language === 'en' ? 'Note:' : 'Piezīme:'}</strong> {language === 'en' 
                  ? 'Some respondents have used multiple providers, so percentages may total more than 100%.'
                  : 'Daži respondenti ir izmantojuši vairākus pakalpojumu sniedzējus, tāpēc kopējais procents var pārsniegt 100%.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Loan Frequency */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Loan Frequency' : 'Kredīta biežums'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Once in lifetime' : 'Reizi dzīvē'}
                      </span>
                      <span className="text-sm font-semibold text-foreground">57.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{ width: '57.1%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Once a year' : 'Reizi gadā'}
                      </span>
                      <span className="text-sm font-semibold text-foreground">35.7%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{ width: '35.7%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Several times a year' : 'Vairākas reizes gadā'}
                      </span>
                      <span className="text-sm font-semibold text-foreground">7.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typical Loan Amount */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Typical Loan Amount' : 'Tipiskā kredīta summa'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">100–500 €</span>
                      <span className="text-sm font-semibold text-foreground">64.3%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '64.3%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">500–1000 €</span>
                      <span className="text-sm font-semibold text-foreground">14.3%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">&lt;100 €</span>
                      <span className="text-sm font-semibold text-foreground">14.3%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">1000+ €</span>
                      <span className="text-sm font-semibold text-foreground">7.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Reasons */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {language === 'en' ? 'Primary Reasons for Taking Loans' : 'Galvenie iemesli kredītu ņemšanai'}
              </h3>
              <div className="space-y-4 max-w-3xl">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Emergency/Unexpected' : 'Ārkārtas/Neparedzēti'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">64.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '64.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Other' : 'Cits'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">14.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Shopping/Lifestyle' : 'Iepirkšanās/Dzīvesveids'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">7.1%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Education' : 'Izglītība'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">7.1%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Daily spending/Travel' : 'Ikdienas tēriņi/Ceļojumi'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">7.1%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decision Factors Tab */}
        {activeTab === 'factors' && (
          <div id="factors" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {language === 'en' ? 'Decision Factors' : 'Lēmuma faktori'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === 'en' ? 'What influences provider selection and key concerns' : 'Kas ietekmē pakalpojumu sniedzēja izvēli un galvenās bažas'}
              </p>
            </div>

            {/* Decision Factors */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {language === 'en' ? 'Most Important Factors' : 'Svarīgākie faktori'}
              </h3>
              <div className="space-y-4 max-w-3xl">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Speed of approval' : 'Apstiprināšanas ātrums'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">91.4%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '91.4%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Transparency' : 'Caurspīdīgums'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">88.6%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '88.6%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Interest rates' : 'Procentu likmes'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">84.2%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '84.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Friend recommendations' : 'Draugu ieteikumi'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">64.2%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '64.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Concerns */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {language === 'en' ? 'User Concerns' : 'Lietotāju bažas'}
              </h3>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'High interest rates' : 'Augstas procentu likmes'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">28.6%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '28.6%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Hidden fees' : 'Slēptās izmaksas'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">21.4%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '21.4%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Repayment difficulty' : 'Atmaksāšanas grūtības'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">14.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '14.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Too easy access' : 'Pārāk viegla piekļuve'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">7.1%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-red-600 h-3 rounded-full" style={{ width: '7.1%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Findings Tab */}
        {activeTab === 'findings' && (
          <div id="findings" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {language === 'en' ? 'Key Findings' : 'Galvenie secinājumi'}
              </h2>
            </div>

            {/* Main Use Case */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Primary Use Case Analysis' : 'Galvenā lietošanas gadījuma analīze'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'The survey reveals that 64% of quick loan users turn to these services specifically for emergency and unexpected expenses. This dominant use case positions quick loans as a financial safety net rather than a regular financing tool for planned purchases or lifestyle expenses.'
                  : 'Aptauja atklāj, ka 64% ātro kredītu lietotāju izmanto šos pakalpojumus īpaši ārkārtas un neparedzētiem izdevumiem. Šis dominējošais lietošanas gadījums pozicionē ātros kredītus kā finanšu drošības tīklu, nevis regulāru finansēšanas rīku plānotiem pirkumiem vai dzīvesveida izdevumiem.'
                }
              </p>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'This finding has significant implications for provider marketing and product positioning. Users prioritize speed and accessibility over cost optimization during emergencies, which explains why speed of approval (91%) rates higher than interest rates (84%) as a decision factor.'
                  : 'Šim atklājumam ir būtiskas sekas pakalpojumu sniedzēju mārketinga un produktu pozicionēšanas jomā. Lietotāji ārkārtas situācijās prioritāti piešķir ātrumam un pieejamībai, nevis izmaksu optimizācijai, kas izskaidro, kāpēc apstiprināšanas ātrums (91%) tiek vērtēts augstāk nekā procentu likmes (84%) kā lēmuma faktors.'
                }
              </p>
            </div>

            {/* Common Frustrations */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Common Customer Frustrations' : 'Biežākās klientu problēmas'}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">•</span>
                  <span className="text-muted-foreground">
                    <strong>
                      {language === 'en' ? 'Lacking transparency in loan terms:' : 'Trūkst caurspīdīguma kredīta noteikumos:'}
                    </strong> {language === 'en' 
                      ? 'Hidden fees and unclear repayment schedules create confusion and distrust'
                      : 'Slēptās komisijas un neskaidri atmaksas grafiki rada neskaidrības un neuzticēšanos'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">•</span>
                  <span className="text-muted-foreground">
                    <strong>
                      {language === 'en' ? 'High interest rates compared to traditional banks:' : 'Augstas procentu likmes salīdzinājumā ar tradicionālajām bankām:'}
                    </strong> {language === 'en'
                      ? 'Users express concern about the total cost of borrowing'
                      : 'Lietotāji pauž bažas par kopējām aizņemšanās izmaksām'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">•</span>
                  <span className="text-muted-foreground">
                    <strong>
                      {language === 'en' ? 'Concerns about repayment deadlines:' : 'Bažas par atmaksas termiņiem:'}
                    </strong> {language === 'en'
                      ? 'Strict penalties for late payments create anxiety for borrowers'
                      : 'Stingrās soda sankcijas par kavētiem maksājumiem rada trauksmi aizņēmējiem'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 text-xl">•</span>
                  <span className="text-muted-foreground">
                    <strong>
                      {language === 'en' ? 'Limited options for extending payment periods:' : 'Ierobežotas iespējas pagarināt maksājuma termiņus:'}
                    </strong> {language === 'en'
                      ? 'Inflexible repayment structures don\'t accommodate changing circumstances'
                      : 'Neelastīgas atmaksas struktūras neņem vērā mainīgos apstākļus'
                    }
                  </span>
                </li>
              </ul>
            </div>

            {/* Strategic Recommendations */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Strategic Recommendations' : 'Stratēģiskie ieteikumi'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    {language === 'en' ? 'For Loan Providers' : 'Kredītu sniedzējiem'}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === 'en'
                      ? 'Focus marketing efforts on the 25-34 age demographic in Riga, emphasizing speed of approval and transparent pricing. Position services as emergency financial tools rather than lifestyle financing. Given that 93% are infrequent users, acquisition matters more than retention strategies.'
                      : 'Koncentrēt mārketinga pūles uz 25-34 gadu vecuma demogrāfiju Rīgā, uzsverot apstiprināšanas ātrumu un caurspīdīgo cenu politiku. Pozicionēt pakalpojumus kā ārkārtas finanšu rīkus, nevis dzīvesveida finansējumu. Ņemot vērā, ka 93% ir reti lietotāji, ieguve ir svarīgāka par saglabāšanas stratēģijām.'
                    }
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    {language === 'en' ? 'Product Development' : 'Produktu attīstība'}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === 'en'
                      ? 'Optimize loan products for the 100-500€ range, which represents 64% of typical borrowing. Invest in faster approval processes since speed (91%) outweighs interest rates (84%) in importance. Develop clear, simple loan calculators that show total repayment amounts upfront to address transparency concerns.'
                      : 'Optimizēt kredītu produktus 100-500€ diapazonam, kas pārstāv 64% no tipiskajiem aizņēmumiem. Investēt ātrākos apstiprināšanas procesos, jo ātrums (91%) pārsniedz procentu likmes (84%) svarīgumu. Izstrādāt skaidrus, vienkāršus kredītu kalkulatorus, kas iepriekš parāda kopējās atmaksas summas, lai risinātu caurspīdīguma jautājumus.'
                    }
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    {language === 'en' ? 'Market Opportunities' : 'Tirgus iespējas'}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === 'en'
                      ? 'With 86% of users concentrated in Riga, significant growth opportunities exist in regional markets. The 57% one-time user rate suggests potential for differentiation through superior service experience. Consider partnerships with financial education initiatives to address user concerns about responsible borrowing.'
                      : 'Tā kā 86% lietotāju ir koncentrēti Rīgā, reģionālajos tirgos pastāv būtiskas izaugsmes iespējas. 57% vienreizējo lietotāju līmenis liecina par diferenciācijas potenciālu caur augstāku pakalpojumu kvalitāti. Apsvērt partnerību ar finanšu izglītības iniciatīvām, lai risinātu lietotāju bažas par atbildīgu aizņemšanos.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* About Survey */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {language === 'en' ? 'About This Survey' : 'Par šo aptauju'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en'
                  ? 'Consumer quick loan preferences and behavior analysis conducted in Latvia. Data collected through structured questionnaire methodology targeting individuals who have previously used quick loan (ātrie kredīti) services.'
                  : 'Patērētāju ātro kredītu preferences un uzvedības analīze, kas veikta Latvijā. Dati savākti, izmantojot strukturētu anketas metodiku, kas vērsta uz indivīdiem, kuri iepriekš izmantojuši ātro kredītu pakalpojumus.'
                }
              </p>
              <div className="border-t border-slate-300 pt-4 mt-4">
                <p className="text-sm text-slate-600">
                  <strong>{language === 'en' ? 'Sample Size:' : 'Izlases apjoms:'}</strong> {language === 'en' ? '14 respondents who have used quick loans' : '14 respondenti, kas izmantojuši ātros kredītus'}
                  <br />
                  <strong>{language === 'en' ? 'Survey Period:' : 'Aptaujas periods:'}</strong> {language === 'en' ? 'September 2025' : 'Septembris 2025'}
                  <br />
                  <strong>{language === 'en' ? 'Market:' : 'Tirgus:'}</strong> {language === 'en' ? 'Latvia' : 'Latvija'}
                  <br />
                  <strong>{language === 'en' ? 'For more information:' : 'Plašāka informācija:'}</strong> ruslan@milinex.digital
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Publish Your Survey Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {language === 'en' 
                ? 'Want a similar report from your survey?' 
                : 'Vēlaties līdzīgu atskaiti no savas aptaujas?'
              }
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {language === 'en'
                ? 'Up to 100 responses in 24 hours. Professional market research insights from your own survey data.'
                : 'Līdz 100 atbildēm 24 stundās. Profesionāli tirgus pētījumu ieskati no jūsu aptaujas datiem.'
              }
            </p>
            <Button 
              size="lg" 
              className="font-medium px-8 py-3"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Publish Your Survey' : 'Publicēt aptauju'}
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <PublishSurveyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default QuickLoansLatvia;
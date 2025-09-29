import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickLoansLatvia = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { language } = useLanguage();

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

  // Data
  const ageData = [
    { label: '35-44', value: 7.1 },
    { label: '18-24', value: 14.3 },
    { label: '25-34', value: 78.6 }
  ].sort((a, b) => b.value - a.value);

  const genderData = [
    { label: language === 'en' ? 'Female' : 'Sievietes', value: 42.9 },
    { label: language === 'en' ? 'Male' : 'Vīrieši', value: 57.1 }
  ].sort((a, b) => b.value - a.value);

  const locationData = [
    { label: 'Jūrmala', value: 7.1 },
    { label: 'Valmiera', value: 7.1 },
    { label: 'Rīga', value: 85.7 }
  ].sort((a, b) => b.value - a.value);

  const providersData = [
    { label: 'Other', value: 9.5 },
    { label: 'Bino', value: 9.5 },
    { label: 'Esto', value: 14.3 },
    { label: 'Credit24', value: 14.3 },
    { label: 'Vivus', value: 23.8 },
    { label: 'SmsCredit', value: 28.6 }
  ].sort((a, b) => b.value - a.value);

  const frequencyData = [
    { label: language === 'en' ? 'Several times a year' : 'Vairākas reizes gadā', value: 7.1 },
    { label: language === 'en' ? 'Once a year' : 'Reizi gadā', value: 35.7 },
    { label: language === 'en' ? 'Once in lifetime' : 'Reizi dzīvē', value: 57.1 }
  ].sort((a, b) => b.value - a.value);

  const amountsData = [
    { label: '1000+ €', value: 7.1 },
    { label: '<100 €', value: 14.3 },
    { label: '500–1000 €', value: 14.3 },
    { label: '100–500 €', value: 64.3 }
  ].sort((a, b) => b.value - a.value);

  const reasonsData = [
    { label: language === 'en' ? 'Shopping/Lifestyle' : 'Iepirkšanās/Dzīvesveids', value: 7.1 },
    { label: language === 'en' ? 'Education' : 'Izglītība', value: 7.1 },
    { label: language === 'en' ? 'Daily spending/Travel' : 'Ikdienas tēriņi/Ceļojumi', value: 7.1 },
    { label: language === 'en' ? 'Other' : 'Cits', value: 14.3 },
    { label: language === 'en' ? 'Emergency/Unexpected' : 'Ārkārtas/Neparedzēti', value: 64.3 }
  ].sort((a, b) => b.value - a.value);

  const decisionFactorsData = [
    { label: language === 'en' ? 'Friend recommendations' : 'Draugu ieteikumi', value: 64.2 },
    { label: language === 'en' ? 'Interest rates' : 'Procentu likmes', value: 84.2 },
    { label: language === 'en' ? 'Transparency' : 'Caurspīdīgums', value: 88.6 },
    { label: language === 'en' ? 'Speed of approval' : 'Apstiprināšanas ātrums', value: 91.4 }
  ].sort((a, b) => b.value - a.value);

  const concernsData = [
    { label: language === 'en' ? 'Too easy access' : 'Pārāk viegla piekļuve', value: 7.1 },
    { label: language === 'en' ? 'Repayment difficulty' : 'Atmaksāšanas grūtības', value: 14.3 },
    { label: language === 'en' ? 'Hidden fees' : 'Slēptās izmaksas', value: 21.4 },
    { label: language === 'en' ? 'High interest rates' : 'Augstas procentu likmes', value: 28.6 }
  ].sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
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
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={ageData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" domain={[0, 80]} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="label" type="category" width={60} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gender Distribution */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Gender Distribution' : 'Dzimuma sadalījums'}
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={genderData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" domain={[0, 60]} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="label" type="category" width={80} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Location Distribution */}
              <div className="bg-white border border-slate-200 rounded-lg p-6 md:col-span-2">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Geographic Distribution' : 'Ģeogrāfiskais sadalījums'}
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={locationData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" domain={[0, 90]} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="label" type="category" width={80} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={providersData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 30]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis dataKey="label" type="category" width={80} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={frequencyData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" domain={[0, 60]} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="label" type="category" width={140} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Typical Loan Amount */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Typical Loan Amount' : 'Tipiskā kredīta summa'}
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={amountsData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" domain={[0, 70]} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="label" type="category" width={80} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Primary Reasons */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {language === 'en' ? 'Primary Reasons for Taking Loans' : 'Galvenie iemesli kredītu ņemšanai'}
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={reasonsData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 70]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis dataKey="label" type="category" width={160} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={decisionFactorsData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis dataKey="label" type="category" width={160} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* User Concerns */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {language === 'en' ? 'User Concerns' : 'Lietotāju bažas'}
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={concernsData} layout="horizontal" margin={{ left: 0, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 30]} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis dataKey="label" type="category" width={140} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
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

      <Footer />
    </div>
  );
};

export default QuickLoansLatvia;
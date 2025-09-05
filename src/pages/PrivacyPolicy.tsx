import { Home } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </a>
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy — CoffeeData</h1>
          <p className="text-muted-foreground mb-8">Last updated: September 2025</p>
          
          <p className="text-lg text-foreground mb-8">
            At CoffeeData, we value your privacy. This Privacy Policy explains how we handle the information you share with us when participating in our surveys.
          </p>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-foreground mb-4">When you fill out our surveys, we may collect:</p>
            <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
              <li>Your email address (so we can send you your coffee code).</li>
              <li>Your survey responses (all answers are stored anonymously and used for research purposes).</li>
            </ul>
            <p className="text-foreground mt-4">
              We do not collect passwords, payment details, or any sensitive personal data.
            </p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-foreground mb-4">We use your email only to:</p>
            <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
              <li>Send you the coffee code.</li>
              <li>Prevent duplicate participation (so everyone gets one coffee).</li>
            </ul>
            <p className="text-foreground mb-4 mt-6">We use survey responses only to:</p>
            <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
              <li>Generate anonymized research reports.</li>
              <li>Share insights with companies in aggregate (never linked to your personal identity).</li>
            </ul>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Sharing of Data</h2>
            <p className="text-foreground mb-4">We do not sell, trade, or rent your personal data.</p>
            <p className="text-foreground">
              We may share aggregated, anonymous survey results with partner companies (for example: "40% of respondents use Bank X").
            </p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Retention</h2>
            <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
              <li>Emails are stored securely and only for as long as needed to deliver your coffee code and prevent duplicate entries.</li>
              <li>Survey responses may be kept longer for research purposes, but they are always anonymized.</li>
            </ul>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-foreground mb-4">You can contact us anytime to:</p>
            <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
              <li>Request deletion of your email.</li>
              <li>Ask what information we have about you.</li>
            </ul>
            <p className="text-foreground mt-4">
              Contact: <a href="mailto:ruslan@email.com" className="text-primary hover:underline">ruslan@email.com</a>
            </p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
            <p className="text-foreground">
              Our website may use simple analytics tools (like Google Analytics) to understand traffic. These cookies do not collect personally identifiable information.
            </p>
          </section>

          <div className="border-t border-border my-8"></div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes</h2>
            <p className="text-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
            </p>
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
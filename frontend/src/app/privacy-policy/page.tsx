import { Metadata } from "next";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import CookieSettingsTrigger from "@/components/CookieSettingsTrigger";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Saachi Shingranis Dental Clinic",
  description: "Learn about how we protect your data and privacy at Dr. Saachi Shingrani's Dental Clinic. GDPR and India IT Act compliant.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background relative selection:bg-primary/20">
      <AnimatedNavFramer />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-background text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-text mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-text/70 max-w-2xl mx-auto">
          Last updated: April 2026. <br className="hidden sm:block" />
          Transparency and security are foundational to our patient care.
        </p>
      </section>

      {/* Content */}
      <section className="py-12 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto w-full prose prose-purple dark:prose-invert">
        
        <h2 className="text-2xl font-serif text-text font-bold mb-4 mt-8">1. Introduction</h2>
        <p className="text-text/80 mb-4 leading-relaxed">
          Welcome to Dr. Saachi Shingrani's Dental Clinic. We respect your privacy and are committed to protecting your personal data in compliance with the General Data Protection Regulation (GDPR) and the Information Technology Act (India). This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
        </p>

        <h2 className="text-2xl font-serif text-text font-bold mb-4 mt-8">2. The Data We Collect About You</h2>
        <p className="text-text/80 mb-4 leading-relaxed">
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 text-text/80 mb-4 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, operating system.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
        </ul>

        <h2 className="text-2xl font-serif text-text font-bold mb-4 mt-8">3. How We Use Your Data</h2>
        <p className="text-text/80 mb-4 leading-relaxed">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 text-text/80 mb-4 space-y-2">
          <li>To process and manage your appointments.</li>
          <li>To manage our relationship with you.</li>
          <li>To administer and protect our business and this website.</li>
          <li>To use data analytics to improve our website, services, marketing, customer relationships and experiences.</li>
        </ul>

        <h2 className="text-2xl font-serif text-text font-bold mb-4 mt-8">4. Cookie Configuration & Tracking</h2>
        <p className="text-text/80 mb-4 leading-relaxed">
          You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
        </p>

        <div className="bg-surface/50 rounded-xl border border-primary/10 overflow-hidden my-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-primary/5 text-primary text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4 border-b border-primary/10">Category</th>
                  <th className="px-6 py-4 border-b border-primary/10">Purpose</th>
                  <th className="px-6 py-4 border-b border-primary/10">Duration</th>
                  <th className="px-6 py-4 border-b border-primary/10">Optional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 text-text/80">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">Strictly Necessary</td>
                  <td className="px-6 py-4 leading-relaxed">Session management, CSRF protection, and recording your cookie consent preferences.</td>
                  <td className="px-6 py-4 whitespace-nowrap">1 Year (Consent)</td>
                  <td className="px-6 py-4">No</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">Functional</td>
                  <td className="px-6 py-4 leading-relaxed">Remembering site preferences like timezone or selected clinic location.</td>
                  <td className="px-6 py-4 whitespace-nowrap">Session</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">Analytics</td>
                  <td className="px-6 py-4 leading-relaxed">Google Analytics 4 trackers to understand visitor traffic and page performance.</td>
                  <td className="px-6 py-4 whitespace-nowrap">Up to 2 Years</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">Marketing</td>
                  <td className="px-6 py-4 leading-relaxed">Third-party tracking for tailored advertising. (Currently reserved/inactive).</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 mb-8">
          <div>
            <h3 className="font-semibold text-primary mb-1">Manage Your Preferences</h3>
            <p className="text-sm text-text/70">You have full control over optional cookies. You can revoke consent at any time.</p>
          </div>
          <CookieSettingsTrigger className="shrink-0 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg shadow-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Update Cookie Settings
          </CookieSettingsTrigger>
        </div>

        <h2 className="text-2xl font-serif text-text font-bold mb-4 mt-8">5. Data Security</h2>
        <p className="text-text/80 mb-4 leading-relaxed">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-serif text-text font-bold mb-4 mt-8">6. Your Legal Rights</h2>
        <p className="text-text/80 mb-4 leading-relaxed">
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
        </p>

        <p className="text-text/80 mb-12 leading-relaxed">
          If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:srsdentalcare@gmail.com" className="text-primary hover:underline font-medium">srsdentalcare@gmail.com</a>.
        </p>

      </section>
    </main>
  );
}

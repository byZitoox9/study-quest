import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">
              🦉
            </div>
            <span className="font-display font-bold">StudyQuest</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-display font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Responsible Party</h2>
            <p className="text-muted-foreground">
              Alexander Bayer<br />
              Altdorferstr. 22<br />
              88287 Grünkraut, Germany<br />
              Email: kokalolishamer@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Data We Collect</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Authentication Data</h3>
            <p className="text-muted-foreground">
              When you create an account, we collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Email address</li>
              <li>Display name (optional)</li>
              <li>Authentication provider (Google or email)</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">Usage Data</h3>
            <p className="text-muted-foreground">
              To provide our service, we store:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Learning progress and statistics</li>
              <li>Session history</li>
              <li>Book notes and reflections</li>
              <li>XP and level data</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">Payment Data</h3>
            <p className="text-muted-foreground">
              Payments are processed by Stripe. We do not store your complete payment information. 
              Stripe processes your payment data according to PCI-DSS standards. 
              We only receive confirmation of successful payments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Purpose of Data Processing</h2>
            <p className="text-muted-foreground">We use your data to:</p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Provide and improve our service</li>
              <li>Save your learning progress</li>
              <li>Process payments</li>
              <li>Communicate with you (only when necessary)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Legal Basis (GDPR)</h2>
            <p className="text-muted-foreground">
              We process your data based on:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li><strong>Contract fulfillment</strong> (Art. 6 Abs. 1 lit. b GDPR) – to provide our services</li>
              <li><strong>Consent</strong> (Art. 6 Abs. 1 lit. a GDPR) – for analytics cookies</li>
              <li><strong>Legitimate interest</strong> (Art. 6 Abs. 1 lit. f GDPR) – for security and fraud prevention</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Cookies & Local Storage</h2>
            <p className="text-muted-foreground">
              We use:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li><strong>Essential cookies</strong> – for authentication and session management</li>
              <li><strong>Analytics cookies</strong> – only with your consent, to understand app usage</li>
              <li><strong>Local storage</strong> – to save your preferences locally</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              You can manage your cookie preferences at any time via the "Cookie Settings" link in the footer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Third-Party Services</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Hosting & Database</h3>
            <p className="text-muted-foreground">
              Our app is hosted on secure cloud infrastructure. Data is stored in EU-compliant data centers.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Stripe (Payment Processing)</h3>
            <p className="text-muted-foreground">
              Stripe Inc., 510 Townsend Street, San Francisco, CA 94103, USA<br />
              Privacy Policy:{' '}
              <a 
                href="https://stripe.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://stripe.com/privacy
              </a>
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Google (Authentication)</h3>
            <p className="text-muted-foreground">
              If you log in with Google, Google's privacy policy applies:{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground">
              Under GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li><strong>Access</strong> – request information about your stored data</li>
              <li><strong>Rectification</strong> – correct inaccurate data</li>
              <li><strong>Erasure</strong> – request deletion of your data</li>
              <li><strong>Restriction</strong> – limit the processing of your data</li>
              <li><strong>Data portability</strong> – receive your data in a portable format</li>
              <li><strong>Objection</strong> – object to data processing</li>
              <li><strong>Withdraw consent</strong> – at any time for consent-based processing</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise your rights, contact us at: kokalolishamer@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Right to Complain</h2>
            <p className="text-muted-foreground">
              You have the right to file a complaint with a data protection authority. 
              The responsible authority for Baden-Württemberg is:
            </p>
            <p className="text-muted-foreground mt-2">
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
              Lautenschlagerstraße 20<br />
              70173 Stuttgart, Germany<br />
              <a 
                href="https://www.baden-wuerttemberg.datenschutz.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.baden-wuerttemberg.datenschutz.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Data Security</h2>
            <p className="text-muted-foreground">
              We use industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>SSL/TLS encryption for all connections</li>
              <li>Secure authentication methods</li>
              <li>Regular security updates</li>
              <li>Access controls and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. Changes will be posted on this page 
              with an updated revision date. We encourage you to review this policy periodically.
            </p>
            <p className="text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Datenschutz;

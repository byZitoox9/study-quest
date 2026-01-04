import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Impressum = () => {
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
        <h1 className="text-3xl font-display font-bold mb-8">Legal Notice (Impressum)</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Information according to § 5 TMG</h2>
            <p className="text-muted-foreground">
              Alexander Bayer<br />
              Altdorferstr. 22<br />
              88287 Grünkraut<br />
              Germany
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Email: kokalolishamer@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Legal Status</h2>
            <p className="text-muted-foreground">
              Private individual (Privatperson)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Responsible for Content (§ 55 Abs. 2 RStV)</h2>
            <p className="text-muted-foreground">
              Alexander Bayer<br />
              Altdorferstr. 22<br />
              88287 Grünkraut<br />
              Germany
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">EU Dispute Resolution</h2>
            <p className="text-muted-foreground">
              The European Commission provides a platform for online dispute resolution (ODR):{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="text-muted-foreground mt-2">
              Our email address can be found above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Consumer Dispute Resolution</h2>
            <p className="text-muted-foreground">
              We are not willing or obligated to participate in dispute resolution proceedings 
              before a consumer arbitration board.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Liability for Content</h2>
            <p className="text-muted-foreground">
              As a service provider, we are responsible for our own content on these pages according 
              to § 7 Abs.1 TMG under general laws. According to §§ 8 to 10 TMG, however, we are not 
              obligated as a service provider to monitor transmitted or stored third-party information 
              or to investigate circumstances that indicate illegal activity.
            </p>
            <p className="text-muted-foreground mt-2">
              Obligations to remove or block the use of information under general law remain unaffected. 
              However, liability in this regard is only possible from the point in time at which we 
              become aware of a specific legal violation. Upon becoming aware of corresponding legal 
              violations, we will remove this content immediately.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Impressum;

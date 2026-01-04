import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            Zurück
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm">
              🦉
            </div>
            <span className="font-display font-bold">StudyQuest</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <article className="prose prose-invert max-w-none animate-fade-in">
          <h1 className="text-3xl font-display font-bold mb-8">Datenschutzerklärung</h1>

          <p className="text-foreground/80 mb-8">
            Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung 
            von personenbezogenen Daten (nachfolgend kurz „Daten") im Rahmen der Nutzung unserer 
            Webseite und Dienste auf.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Verantwortlicher</h2>
            <p className="text-foreground/80">
              Alexander Bayer<br />
              Altdorferstr. 22<br />
              88287 Grünkraut, Deutschland<br />
              E-Mail: <a href="mailto:kokalolishamer@gmail.com" className="text-primary hover:underline">kokalolishamer@gmail.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Welche Daten werden erhoben?</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Authentifizierung</h3>
            <p className="text-foreground/80">
              Bei der Registrierung und Anmeldung erheben wir:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mt-2">
              <li>E-Mail-Adresse</li>
              <li>Passwort (verschlüsselt gespeichert)</li>
              <li>Bei Google-Anmeldung: Name und E-Mail aus Ihrem Google-Konto</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Nutzungsdaten</h3>
            <p className="text-foreground/80">
              Zur Bereitstellung unserer Lernfunktionen speichern wir:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mt-2">
              <li>Lernfortschritt und XP-Punkte</li>
              <li>Abgeschlossene Sessions</li>
              <li>Erstellte Notizen und Reflexionen</li>
              <li>Einstellungen und Präferenzen</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.3 Zahlungsdaten</h3>
            <p className="text-foreground/80">
              Zahlungen werden über Stripe abgewickelt. Wir speichern keine Kreditkartendaten. 
              Stripe erhält die für die Zahlung notwendigen Daten. Weitere Informationen finden 
              Sie in der <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Datenschutzerklärung von Stripe</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc list-inside text-foreground/80">
              <li>Bereitstellung und Verbesserung unserer Dienste</li>
              <li>Speicherung Ihres Lernfortschritts</li>
              <li>Abwicklung von Zahlungen</li>
              <li>Kommunikation bei Servicefragen</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Rechtsgrundlage</h2>
            <p className="text-foreground/80">
              Die Verarbeitung erfolgt auf Grundlage von:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mt-2">
              <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung (z.B. für Cookies)</li>
              <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertragserfüllung (Nutzung der App)</li>
              <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Berechtigtes Interesse (Sicherheit, Analyse)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Cookies und lokale Speicherung</h2>
            <p className="text-foreground/80">
              Wir verwenden:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mt-2">
              <li><strong>Notwendige Cookies:</strong> Für Authentifizierung und Session-Management</li>
              <li><strong>Lokaler Speicher:</strong> Für temporäre Daten im Demo-Modus</li>
              <li><strong>Einwilligungs-Cookie:</strong> Speicherung Ihrer Cookie-Präferenzen</li>
            </ul>
            <p className="text-foreground/80 mt-2">
              Sie können Ihre Cookie-Einstellungen jederzeit über den Link "Cookie-Einstellungen" 
              im Footer ändern.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Drittanbieter</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">6.1 Supabase (Backend & Auth)</h3>
            <p className="text-foreground/80">
              Wir nutzen Supabase für Datenbankdienste und Authentifizierung. 
              Datenschutz: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com/privacy</a>
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">6.2 Stripe (Zahlungen)</h3>
            <p className="text-foreground/80">
              Zahlungsabwicklung erfolgt über Stripe Inc. 
              Datenschutz: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/de/privacy</a>
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">6.3 Google (OAuth)</h3>
            <p className="text-foreground/80">
              Bei Google-Anmeldung werden Daten an Google übermittelt. 
              Datenschutz: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Ihre Rechte</h2>
            <p className="text-foreground/80">
              Sie haben folgende Rechte:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mt-2">
              <li><strong>Auskunft:</strong> Welche Daten wir über Sie speichern</li>
              <li><strong>Berichtigung:</strong> Korrektur unrichtiger Daten</li>
              <li><strong>Löschung:</strong> Löschung Ihrer Daten ("Recht auf Vergessenwerden")</li>
              <li><strong>Einschränkung:</strong> Einschränkung der Verarbeitung</li>
              <li><strong>Datenübertragbarkeit:</strong> Export Ihrer Daten</li>
              <li><strong>Widerspruch:</strong> Widerspruch gegen die Verarbeitung</li>
              <li><strong>Widerruf:</strong> Widerruf erteilter Einwilligungen</li>
            </ul>
            <p className="text-foreground/80 mt-4">
              Kontaktieren Sie uns: <a href="mailto:kokalolishamer@gmail.com" className="text-primary hover:underline">kokalolishamer@gmail.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Beschwerderecht</h2>
            <p className="text-foreground/80">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. 
              Die zuständige Behörde ist der Landesbeauftragte für den Datenschutz und die 
              Informationsfreiheit Baden-Württemberg.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Datensicherheit</h2>
            <p className="text-foreground/80">
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten 
              gegen Manipulation, Verlust, Zerstörung oder unbefugten Zugriff zu schützen. 
              Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung 
              fortlaufend verbessert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Änderungen</h2>
            <p className="text-foreground/80">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den 
              aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen 
              umzusetzen.
            </p>
            <p className="text-foreground/60 mt-4 text-sm">
              Stand: Januar 2026
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Datenschutz;


import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FadeIn } from '@/components/FadeIn';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <FadeIn>
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-foreground">
              <h1 className="text-3xl font-headline font-bold text-primary sm:text-4xl mb-8">
                Privacybeleid
              </h1>

              <div className="space-y-6 text-muted-foreground">
                <p>
                  Uw privacy is belangrijk voor ons. Dit privacybeleid legt uit hoe Bosz Houses persoonlijke gegevens verzamelt, gebruikt en beschermt die u via onze website verstrekt.
                </p>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    1. Gegevens die we verzamelen
                  </h2>
                  <p>
                    Wij kunnen de volgende informatie verzamelen wanneer u onze website gebruikt:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Contactgegevens:</strong> Wanneer u ons contactformulier invult of een brochure aanvraagt, verzamelen wij uw naam en e-mailadres.
                    </li>
                    <li>
                      <strong className="text-foreground">Gebruiksgegevens:</strong> Wij verzamelen informatie over hoe u de website gebruikt, zoals uw IP-adres, browsertype, bezochte pagina's en de tijd die u op elke pagina doorbrengt. Dit wordt gedaan via diensten zoals Google Analytics.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    2. Hoe we uw gegevens gebruiken
                  </h2>
                  <p>
                    De verzamelde gegevens worden gebruikt voor de volgende doeleinden:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Om te reageren op uw vragen en verzoeken.</li>
                    <li>Om u de aangevraagde brochure en gerelateerde informatie toe te sturen.</li>
                    <li>Om onze website en diensten te analyseren en te verbeteren.</li>
                    <li>Om te voldoen aan wettelijke verplichtingen.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    3. Delen van gegevens
                  </h2>
                  <p>
                    Wij verkopen, verhandelen of verhuren uw persoonlijke gegevens niet aan derden. Uw gegevens worden alleen gedeeld met vertrouwde partners die ons helpen bij het uitvoeren van onze diensten (zoals e-maildiensten), en alleen wanneer dit strikt noodzakelijk is.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    4. Gegevensbeveiliging
                  </h2>
                  <p>
                    We nemen redelijke maatregelen om uw persoonlijke gegevens te beschermen tegen verlies, diefstal en misbruik. Echter, geen enkele methode van overdracht via het internet is 100% veilig.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    5. Cookies
                  </h2>
                  <p>
                    Onze website gebruikt cookies om de gebruikerservaring te verbeteren. Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen. We gebruiken cookies voor functionaliteit en voor analyse (via Google Analytics en Facebook Pixel). U kunt uw browserinstellingen aanpassen om cookies te weigeren.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    6. Uw rechten
                  </h2>
                  <p>
                    U heeft het recht om uw persoonlijke gegevens in te zien, te corrigeren of te laten verwijderen. Neem contact met ons op via de contactgegevens op onze website om van deze rechten gebruik te maken.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    7. Wijzigingen in dit beleid
                  </h2>
                  <p>
                    We kunnen dit privacybeleid van tijd tot tijd bijwerken. Eventuele wijzigingen worden op deze pagina gepubliceerd.
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-semibold text-primary mt-8 mb-4">
                    Contact
                  </h2>
                  <p>
                    Als u vragen heeft over dit privacybeleid, kunt u contact met ons opnemen via de <Link href="/#contact" className="text-accent hover:underline">contactsectie</Link> op onze website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

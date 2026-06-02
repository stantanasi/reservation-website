import { COLORS } from '@/themes/colors';
import { alpha, Box, Card, Container, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Section from '../_components/Section';

export const metadata: Metadata = {
  title: 'Mentions Légales & RGPD',
  description: 'Mentions légales, politique de confidentialité RGPD et conditions générales de vente de Séréna Studio SAS. Dernière mise à jour : janvier 2026.',
};

const SECTIONS = [
  {
    id: 'mentions',
    title: 'Mentions Légales',
    content: [
      {
        subtitle: 'Éditeur du site',
        text: `Séréna Studio SAS\nCapital social : 10 000 €\nSiège social : 12 Rue de la Paix, 75002 Paris, France\nSIRET : 123 456 789 00012\nNuméro de TVA intracommunautaire : FR12 123456789\n\nDirectrice de la publication : Isabelle Moreau\nContact : contact@serena-studio.fr`,
      },
      {
        subtitle: 'Hébergement',
        text: `Ce site est hébergé par Vercel Inc.\n340 Pine Street, Suite 1500, San Francisco, CA 94104, USA\nhttps://vercel.com`,
      },
      {
        subtitle: 'Propriété intellectuelle',
        text: `L'ensemble du contenu de ce site (textes, photographies, illustrations, logos, vidéos) est la propriété exclusive de Séréna Studio SAS ou de ses partenaires, et est protégé par les lois relatives à la propriété intellectuelle.\n\nToute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Séréna Studio SAS.`,
      },
    ],
  },
  {
    id: 'rgpd',
    title: 'Politique de Confidentialité & RGPD',
    content: [
      {
        subtitle: 'Responsable du traitement',
        text: `Séréna Studio SAS est responsable du traitement de vos données personnelles au sens du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (RGPD).\n\nContact DPO : dpo@serena-studio.fr`,
      },
      {
        subtitle: 'Données collectées',
        text: `Dans le cadre de nos services, nous collectons les données suivantes :\n\n• Identité : nom, prénom\n• Coordonnées : adresse email, numéro de téléphone\n• Données de réservation : soins réservés, dates et horaires, praticien sélectionné\n• Données de paiement : traitées directement par Stripe, nous ne stockons aucune donnée bancaire\n• Données de navigation : cookies fonctionnels et analytiques (avec votre consentement)`,
      },
      {
        subtitle: 'Finalités et bases légales',
        text: `Vos données sont collectées et traitées pour les finalités suivantes :\n\n• Gestion des réservations et du compte client (exécution du contrat)\n• Envoi de confirmations et rappels de rendez-vous (exécution du contrat)\n• Communication de notre newsletter (consentement — désinscription possible à tout moment)\n• Amélioration de nos services (intérêt légitime)\n• Respect de nos obligations légales et comptables (obligation légale)`,
      },
      {
        subtitle: 'Durée de conservation',
        text: `Vos données sont conservées pendant la durée nécessaire à la finalité pour laquelle elles ont été collectées :\n\n• Données de compte : jusqu'à la suppression du compte + 3 ans\n• Données de transaction : 10 ans (obligations comptables)\n• Données marketing : 3 ans à compter du dernier contact`,
      },
      {
        subtitle: 'Vos droits',
        text: `Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :\n\n• Droit d'accès et de rectification\n• Droit à l'effacement ("droit à l'oubli")\n• Droit à la limitation du traitement\n• Droit à la portabilité des données\n• Droit d'opposition\n• Droit de retirer votre consentement à tout moment\n\nPour exercer ces droits, contactez-nous à : dpo@serena-studio.fr\nVous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
      },
      {
        subtitle: 'Cookies',
        text: `Notre site utilise des cookies pour assurer son bon fonctionnement et améliorer votre expérience :\n\n• Cookies essentiels : nécessaires au fonctionnement du site (session, panier)\n• Cookies analytiques : mesure d'audience via des outils anonymisés (avec votre consentement)\n• Cookies de préférences : mémorisation de vos choix\n\nVous pouvez gérer vos préférences en matière de cookies à tout moment via le bandeau de consentement.`,
      },
    ],
  },
  {
    id: 'cgv',
    title: 'Conditions Générales de Vente',
    content: [
      {
        subtitle: 'Réservation et paiement',
        text: `Les réservations de soins s'effectuent en ligne sur notre site ou par téléphone. Le paiement est dû au moment de la réservation et est traité de manière sécurisée via Stripe.\n\nLes prix affichés sont en euros TTC et incluent la TVA au taux applicable.`,
      },
      {
        subtitle: 'Politique d\'annulation',
        text: `Toute annulation effectuée plus de 24 heures avant le rendez-vous est gratuite et donne lieu à un remboursement intégral ou à un report sans frais.\n\nEn cas d'annulation dans les 24 heures précédant le rendez-vous, une indemnité égale à 50 % du montant de la prestation pourra être retenue.\n\nEn cas de non-présentation sans annulation, le montant intégral est dû.`,
      },
      {
        subtitle: 'Droit applicable',
        text: `Les présentes conditions sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.`,
      },
    ],
  },
];

export default function LegalPage() {
  return (
    <main>
      <Section
        overline="Informations légales"
        title="Mentions Légales & RGPD"
        subtitle="Dernière mise à jour : 1er janvier 2026"
        align="left"
        mode="dark"
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 0, lg: 10 }}
          sx={{
            alignItems: { xs: 'normal', lg: 'flex-start' },
          }}
        >
          <Card
            sx={{
              width: { lg: 240 },
              position: { lg: 'sticky' },
              top: { lg: 108 },
              marginBottom: { xs: 5, lg: 0 },
              padding: 2.5,
            }}
          >
            <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 2 }}>
              Sommaire
            </Typography>

            {SECTIONS.map((section) => (
              <Box
                key={section.id}
                component="a"
                href={`#${section.id}`}
                sx={{
                  display: 'block',
                  color: COLORS.text.secondary,
                  fontSize: '0.82rem',
                  py: 0.8,
                  borderLeft: `2px solid transparent`,
                  pl: 1.5,
                  transition: 'all 0.2s ease',
                  mb: 1,
                  '&:hover': {
                    color: COLORS.secondary.main,
                    borderLeftColor: COLORS.secondary.main,
                  },
                }}
              >
                {section.title}
              </Box>
            ))}
          </Card>

          <Stack
            direction="column"
            // divider={<Divider sx={{ marginY: 3 }} />}
            sx={{
              flex: 1,
            }}
          >
            {SECTIONS.map((section) => (
              <Box key={section.id} id={section.id} sx={{ mb: 7 }}>
                <Typography
                  variant="h3"
                  sx={{ mb: 4, pb: 2.5, borderBottom: `1px solid ${alpha(COLORS.text.secondary, 0.15)}` }}
                >
                  {section.title}
                </Typography>

                {section.content.map((block, bi) => (
                  <Box key={bi} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontSize: '1rem', color: COLORS.primary.main }}>
                      {block.subtitle}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.text.secondary, lineHeight: 2, whiteSpace: 'pre-line' }}
                    >
                      {block.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
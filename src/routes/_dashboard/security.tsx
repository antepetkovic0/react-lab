import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'
import { getLabsBySection } from '@/content/labs'

export const Route = createFileRoute('/_dashboard/security')({
  component: SecurityPage,
})

const labCards = getLabsBySection('security')

function SecurityPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/security') {
    return <Outlet />
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabSectionPage
        description="Practice the client-side security habits that matter in real React apps."
        eyebrow="Trust Boundaries"
        labs={[
          'Safe rich text rendering',
          'Auth route guard',
          'OAuth 2.0 with PKCE',
          'Token storage comparison',
          'Dependency risk checklist',
        ]}
        title="Security"
        topics={[
          {
            title: 'XSS prevention',
            description:
              'Treat user-controlled content as unsafe and avoid injecting unsanitized markup.',
          },
          {
            title: 'Auth flows',
            description:
              'Model OAuth redirects, login, logout, session refresh, and trust boundaries.',
          },
          {
            title: 'PKCE',
            description:
              'Bind authorization codes to a browser-generated verifier for public clients.',
          },
          {
            title: 'Token handling',
            description:
              'Compare storage options and understand the risks around access and refresh tokens.',
          },
          {
            title: 'Protected routes',
            description:
              'Gate route access while still handling loading, expired sessions, and redirects.',
          },
          {
            title: 'Dependency risk',
            description:
              'Review package updates, transitive dependencies, and vulnerable client libraries.',
          },
          {
            title: 'Safe rendering',
            description:
              'Render rich text, links, and external content with explicit sanitization rules.',
          },
        ]}
      />

      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Lab Cards
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labCards.map((card) => (
            <LabCard
              className="w-full"
              description={card.description}
              href={card.href}
              imageAlt={card.imageAlt}
              imageSrc={card.imageSrc}
              key={card.title}
              level={card.level}
              section={card.section}
              title={card.title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

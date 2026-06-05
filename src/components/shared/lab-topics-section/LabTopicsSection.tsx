import { cn } from '@/lib/utils'

type Topic =
  | string
  | {
      title: string
      description: string
    }

type LabTopicsSectionProps = {
  eyebrow: string
  title: string
  description: string
  topics: Topic[]
  labs?: string[]
}

export function LabTopicsSection({
  eyebrow,
  title,
  description,
  topics,
}: LabTopicsSectionProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="core-topics-heading"
        className="overflow-hidden rounded-lg border bg-background shadow-sm"
      >
        <div className="h-1 bg-primary" aria-hidden="true" />
        <div className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4">
          <div className="space-y-1">
            <h2
              className="font-heading text-lg font-semibold tracking-tight"
              id="core-topics-heading"
            >
              Core Topics
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              The small set of concepts this section should make feel natural.
            </p>
          </div>
          <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            {topics.length} concepts
          </span>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => {
            const topicTitle = typeof topic === 'string' ? topic : topic.title
            const topicDescription =
              typeof topic === 'string' ? undefined : topic.description

            return (
              <article
                className="group flex min-h-22 gap-3 bg-background p-4 transition-colors hover:bg-muted/30"
                key={topicTitle}
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary',
                    index > 2 && 'bg-muted text-muted-foreground',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold leading-5">
                    {topicTitle}
                  </h3>
                  {topicDescription ? (
                    <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {topicDescription}
                    </p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

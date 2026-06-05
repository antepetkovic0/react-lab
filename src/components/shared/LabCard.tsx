import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import type * as React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LabCardBadge, type LabCardSectionValue } from './LabCardBadge'
import { LabCardLevel, type LabCardLevelValue } from './LabCardLevel'

type LabCardProps = Omit<React.ComponentProps<typeof Card>, 'title'> & {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  section: LabCardSectionValue
  level: LabCardLevelValue
  href: string
}

export function LabCard({
  imageSrc,
  imageAlt,
  title,
  description,
  section,
  level,
  href,
  className,
  ...props
}: LabCardProps) {
  return (
    <Link
      className="group/lab-card block h-full w-fit rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      to={href}
    >
      <Card
        className={cn(
          'relative h-full w-3xs gap-0 py-0 transition-shadow group-hover/lab-card:shadow-md',
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="absolute top-3 right-3 z-10 flex size-8 translate-x-1 items-center justify-center rounded-full border bg-background text-foreground opacity-0 shadow-sm transition-all group-hover/lab-card:translate-x-0 group-hover/lab-card:opacity-100 group-focus-visible/lab-card:translate-x-0 group-focus-visible/lab-card:opacity-100"
        >
          <ArrowRightIcon className="size-4" />
        </div>

        <CardContent className="flex flex-1 flex-col items-center px-4 pt-6 pb-4 text-center">
          <div className="mb-5 flex h-24 w-full items-center justify-center">
            <img
              alt={imageAlt}
              className="max-h-24 max-w-28 object-contain transition-transform group-hover/lab-card:scale-105"
              src={imageSrc}
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <h3 className="font-heading text-base font-semibold leading-tight">
              {title}
            </h3>
            <LabCardBadge section={section} />
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="justify-end border-t bg-background px-4 py-3">
          <LabCardLevel level={level} />
        </CardFooter>
      </Card>
    </Link>
  )
}

export type { LabCardLevelValue, LabCardSectionValue }

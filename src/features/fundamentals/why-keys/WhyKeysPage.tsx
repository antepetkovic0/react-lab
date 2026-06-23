import { AlertTriangleIcon, RotateCcwIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  badKeysCode,
  goodKeysCode,
  keyConcepts,
  people,
  rules,
} from './why-keys.data'

type Person = (typeof people)[number]

type PreviewListProps = {
  items: Person[]
  keyStrategy: 'index' | 'id'
}

function PreviewList({ items, keyStrategy }: PreviewListProps) {
  return (
    <ul className="space-y-3">
      {items.map((person, index) => {
        const inputId = `${keyStrategy}-${person.id}-note`

        return (
          <li
            className="rounded-lg border bg-background p-3"
            key={keyStrategy === 'id' ? person.id : index}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.role}</p>
              </div>
              <Badge variant="outline">
                key={keyStrategy === 'id' ? person.id : index}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium text-muted-foreground"
                htmlFor={inputId}
              >
                Uncontrolled note input
              </label>
              <Input
                aria-label={`${person.name} note`}
                defaultValue={person.note}
                id={inputId}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function WhyKeysPage() {
  const [visiblePeople, setVisiblePeople] = useState(people)

  const removeFirstPerson = () => {
    setVisiblePeople((currentPeople) => currentPeople.slice(1))
  }

  const resetPeople = () => {
    setVisiblePeople(people)
  }

  const canRemove = visiblePeople.length > 1

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">Why Keys</h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Fundamentals
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Learn how React uses the key prop to match list items across
            renders, why changing lists need stable IDs, and how index keys can
            attach UI state to the wrong row.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {keyConcepts.map((concept) => {
          const Icon = concept.icon

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={concept.title}
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h2 className="text-sm font-semibold">{concept.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {concept.description}
              </p>
            </article>
          )
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="gap-0 py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Live Preview</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Remove the first row and compare which input value stays with
                each person.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                disabled={!canRemove}
                onClick={removeFirstPerson}
                size="sm"
                variant="destructive"
              >
                <Trash2Icon className="size-3.5" />
                Remove first
              </Button>
              <Button onClick={resetPeople} size="sm" variant="outline">
                <RotateCcwIcon className="size-3.5" />
                Reset
              </Button>
            </div>
          </div>
          <CardContent className="space-y-4 p-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-muted-foreground">
              The inputs below are intentionally uncontrolled. That makes
              React's item matching visible: with index keys, the DOM input at
              position 0 is reused for the next person after a delete.
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="space-y-3 rounded-lg border bg-muted/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Index keys / missing identity
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      React matches rows by position.
                    </p>
                  </div>
                  <Badge variant="destructive">Buggy</Badge>
                </div>
                <PreviewList items={visiblePeople} keyStrategy="index" />
              </section>

              <section className="space-y-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold">Stable ID keys</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      React matches rows by item identity.
                    </p>
                  </div>
                  <Badge>Correct</Badge>
                </div>
                <PreviewList items={visiblePeople} keyStrategy="id" />
              </section>
            </div>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangleIcon className="size-4 text-primary" />
                What changed?
              </CardTitle>
              <CardDescription>
                Keys are not styling and not props for your component.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Without a stable key, React falls back to position. After a row
                is deleted, the next row can inherit DOM state, focus, animation
                state, or component state from the item that used to occupy that
                position.
              </p>
              <p>
                With <code>key=&#123;item.id&#125;</code>, React can tell that
                Linus is still Linus even when Ada disappears from the array.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rules of Thumb</CardTitle>
              <CardDescription>
                Use keys that are unique, stable, and based on data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {rules.map((rule) => (
                  <li className="rounded-md bg-muted/30 p-3" key={rule}>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fragile List</CardTitle>
            <CardDescription>
              Index keys are only safe for lists that never change order,
              insert, or delete.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
              <code>{badKeysCode}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stable List</CardTitle>
            <CardDescription>
              Prefer IDs created with the data, not values generated during
              render.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
              <code>{goodKeysCode}</code>
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export { WhyKeysPage }

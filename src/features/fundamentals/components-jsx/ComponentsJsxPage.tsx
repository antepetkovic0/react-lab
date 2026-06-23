import {
  ArrowRightIcon,
  EyeIcon,
  FileCode2Icon,
  LightbulbIcon,
} from 'lucide-react'
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  classicTransformCode,
  componentExampleCode,
  elementObjectCode,
  focusTopics,
  jsxBeforeCode,
  modernRuntimeCode,
  practiceNotes,
} from './components-jsx.data'

type CodeBlockProps = {
  code: string
  title: string
  eyebrow?: string
}

function CodeBlock({ code, eyebrow, title }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="border-b bg-muted/30 px-4 py-3">
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium text-primary">{eyebrow}</p>
        ) : null}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ComponentsJsxPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Components & JSX
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Fundamentals
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Learn the smallest mental model for React UI: components describe
            pieces of the screen, JSX is the syntax most teams use to write
            those descriptions, and compilers turn JSX into JavaScript objects
            React can read.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {focusTopics.map((topic) => {
          const Icon = topic.icon

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={topic.title}
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h2 className="text-sm font-semibold">{topic.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {topic.description}
              </p>
            </article>
          )
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="gap-0 py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">A component returns JSX</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                This function names a reusable piece of UI and returns the
                element tree it wants React to render.
              </p>
            </div>
            <Badge variant="outline">ProfileCard.tsx</Badge>
          </div>
          <CardContent className="p-4">
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-6">
              <code>{componentExampleCode}</code>
            </pre>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeIcon className="size-4 text-primary" />
                Preview
              </CardTitle>
              <CardDescription>
                The JSX describes this small interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted/20 p-4">
                <article className="flex items-center gap-3 rounded-md border bg-background p-4 shadow-sm">
                  <span className="relative flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    AL
                    <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-background bg-emerald-500" />
                  </span>
                  <div>
                    <h2 className="font-semibold">Ada Lovelace</h2>
                    <p className="text-sm text-muted-foreground">
                      Interface Engineer
                    </p>
                  </div>
                </article>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightbulbIcon className="size-4 text-primary" />
                JSX Practice Notes
              </CardTitle>
              <CardDescription>
                The rules that make JSX feel like JavaScript.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {practiceNotes.map((note) => (
                  <li className="rounded-md bg-muted/30 p-3" key={note}>
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card className="gap-0 py-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold">JSX represents objects</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              JSX is not HTML and not a string. Build tools compile it into
              JavaScript that creates React element objects.
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary" variant="outline">
            Before and after compilation
          </Badge>
        </div>
        <CardContent className="space-y-4 p-4">
          <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <CodeBlock code={jsxBeforeCode} eyebrow="Before" title="JSX" />
            <div className="hidden items-center justify-center text-muted-foreground xl:flex">
              <ArrowRightIcon className="size-5" />
            </div>
            <CodeBlock
              code={classicTransformCode}
              eyebrow="Classic transform"
              title="React.createElement calls"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileCode2Icon className="size-4 text-primary" />
                  Modern tooling note
                </CardTitle>
                <CardDescription>
                  Vite and current React tooling normally use the automatic JSX
                  runtime instead of requiring a visible React import.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-background p-4 text-xs leading-6">
                  <code>{modernRuntimeCode}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle className="text-base">
                  The useful mental model
                </CardTitle>
                <CardDescription>
                  The exact generated code can vary, but the result is still a
                  lightweight object describing the UI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-background p-4 text-xs leading-6">
                  <code>{elementObjectCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
            React reads these element descriptions, calls your components when
            needed, and uses the resulting tree to update the DOM. That is why a
            component can return JSX without manually creating DOM nodes.
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Component Names Matter</CardTitle>
            <CardDescription>
              JSX uses casing to decide whether a tag is built-in or custom.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              <code>&lt;article&gt;</code>, <code>&lt;h2&gt;</code>, and{' '}
              <code>&lt;span&gt;</code> compile with string types because they
              refer to browser elements.
            </p>
            <p>
              <code>&lt;StatusDot /&gt;</code> compiles with the{' '}
              <code>StatusDot</code> function itself because capitalized JSX
              tags refer to React components.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSX Is Still JavaScript</CardTitle>
            <CardDescription>
              Braces let markup and values meet without turning UI into string
              templates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              In <code>&lt;h2&gt;&#123;name&#125;&lt;/h2&gt;</code>, the{' '}
              <code>name</code> value is a JavaScript expression. It can come
              from props, local variables, calculations, or function calls.
            </p>
            <p>
              JSX expressions can be assigned to variables, returned from
              functions, passed as arguments, or used inside conditions just
              like other JavaScript expressions.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export { ComponentsJsxPage }

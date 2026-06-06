import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronRightIcon,
  CopyIcon,
  EyeIcon,
  FileCode2Icon,
  LightbulbIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_dashboard/fundamentals/components-jsx")(
  {
    component: ComponentsJsxPage,
  },
);

const codeLines = [
  { id: "props-open", code: "type ProfileCardProps = {" },
  { id: "props-name", code: "  name: string" },
  { id: "props-role", code: "  role: string" },
  { id: "props-online", code: "  isOnline: boolean" },
  { id: "props-close", code: "}" },
  { id: "blank-after-props", code: "" },
  {
    id: "component-open",
    code: "function ProfileCard(props: ProfileCardProps) {",
  },
  { id: "return-open", code: "  return (" },
  { id: "article-open", code: '    <article className="profile-card">' },
  { id: "status-dot", code: "      <StatusDot active={props.isOnline} />" },
  { id: "content-open", code: "      <div>" },
  { id: "name-heading", code: "        <h2>{props.name}</h2>" },
  { id: "role-text", code: "        <p>{props.role}</p>" },
  { id: "content-close", code: "      </div>" },
  { id: "article-close", code: "    </article>" },
  { id: "return-close", code: "  )" },
  { id: "component-close", code: "}" },
];

const overviewTopics = [
  {
    title: "Components are the unit of React UI",
    description:
      "A component is a JavaScript function that returns a description of what should appear on screen. When you compose components together, a large interface becomes a tree of small named pieces.",
  },
  {
    title: "JSX keeps markup and UI logic close",
    description:
      "JSX is a syntax extension for JavaScript. It looks like markup, but it can use JavaScript expressions inside braces, so data and rendering logic stay in the same component.",
  },
  {
    title: "JSX becomes plain JavaScript",
    description:
      "During the build step, JSX is compiled into JavaScript calls that create React elements. React reads those element objects and updates the DOM to match them.",
  },
];

function ComponentsJsxPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
      >
        <span>Dashboard</span>
        <ChevronRightIcon className="size-3" />
        <span>Fundamentals</span>
        <ChevronRightIcon className="size-3" />
        <span className="font-medium text-foreground">Components & JSX</span>
      </nav>

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
            Practice turning UI into small React components, writing JSX that
            reads like the interface, and passing data through props.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {overviewTopics.map((topic) => (
          <article
            className="rounded-lg border bg-background p-4"
            key={topic.title}
          >
            <h2 className="text-sm font-semibold">{topic.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {topic.description}
            </p>
          </article>
        ))}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="min-h-[520px] gap-0 py-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <FileCode2Icon className="size-4 text-primary" />
              <span className="text-sm font-medium">ProfileCard.tsx</span>
            </div>
            <Button size="sm" variant="outline">
              <CopyIcon className="size-3.5" />
              Copy
            </Button>
          </div>
          <CardContent className="p-0">
            <pre className="overflow-x-auto p-4 text-[13px] leading-7">
              <code>
                {codeLines.map(({ code, id }, index) => (
                  <span className="grid grid-cols-[2rem_1fr]" key={id}>
                    <span className="select-none text-muted-foreground">
                      {index + 1}
                    </span>
                    <span>{code || " "}</span>
                  </span>
                ))}
              </code>
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
                This is the small interface produced by the JSX.
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
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <LightbulbIcon className="size-4 text-primary" />
                <span className="text-sm font-semibold">Small Notes</span>
              </div>
            </div>
            <CardContent className="space-y-3 pt-4 text-sm leading-6 text-muted-foreground">
              <p>
                JSX is not a string and not HTML. It is JavaScript syntax that
                lets a component describe its UI.
              </p>
              <p>
                Values inside braces, like <code>props.name</code>, are regular
                JavaScript expressions.
              </p>
              <p>
                In the classic transform, JSX compiles to{" "}
                <code>React.createElement()</code>. Modern React tooling can use
                a newer automatic runtime, but the result is still JavaScript
                that creates React elements.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

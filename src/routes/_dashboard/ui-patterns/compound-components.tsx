import { createFileRoute } from "@tanstack/react-router";
import {
  BlocksIcon,
  CheckCircle2Icon,
  FileCode2Icon,
  GitBranchIcon,
  InfoIcon,
  Layers3Icon,
  ShieldCheckIcon,
} from "lucide-react";
import {
  LabAccordion,
  LabAccordionContent,
  LabAccordionItem,
  LabAccordionTrigger,
} from "@/components/features/ui-patterns/compound-components/LabAccordion";
import { RouteBreadcrumbs } from "@/components/shared/route-breadcrumbs/RouteBreadcrumbs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/_dashboard/ui-patterns/compound-components",
)({
  component: CompoundComponentsPage,
});

const concepts = [
  {
    title: "Parent owns the behavior",
    icon: BlocksIcon,
    description:
      "The root component stores the internal state and exposes actions through React Context.",
  },
  {
    title: "Children opt into shared state",
    icon: GitBranchIcon,
    description:
      "Trigger and Content do not receive long prop chains. They read the current item and root state from nearby providers.",
  },
  {
    title: "Consumers control the markup",
    icon: Layers3Icon,
    description:
      "The API reads like a small UI language, so app code can arrange the pieces while the component keeps its rules private.",
  },
];

const advantages = [
  "Avoids prop drilling across tightly related child components.",
  "Keeps internal state and event handlers close to the root component.",
  "Creates a flexible API that still guides consumers toward valid structure.",
  "Makes patterns like tabs, menus, accordions, and form fields easier to compose.",
];

const compoundExampleCode = `function FAQPanel() {
  return (
    <Accordion defaultValue="state">
      <AccordionItem value="state">
        <AccordionTrigger>
          Who owns the accordion state?
        </AccordionTrigger>
        <AccordionContent>
          The root Accordion stores the open item value, then shares
          it with every child through context.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="props">
        <AccordionTrigger>
          Why are there so few props?
        </AccordionTrigger>
        <AccordionContent>
          The child components do not need repeated props like{" "}
          <code>openValue</code> or <code>onToggle</code>. They read
          the nearest root and item providers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="a11y">
        <AccordionTrigger>
          What accessibility hooks matter?
        </AccordionTrigger>
        <AccordionContent>
          Use a real button, expose <code>aria-expanded</code>, link
          the trigger and region, and keep keyboard focus on the
          trigger.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

const implementationCode = `interface AccordionContextType {
  openId: string;
  toggleItem: (id: string) => void;
}

const AccordionContext =
  React.createContext<AccordionContextType>(undefined);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be used within a <Accordion>.",
    );
  }
  return context;
};

interface AccordionItemContextType {
  id: string;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext =
  React.createContext<AccordionItemContextType>(undefined);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "<AccordionTrigger> and <AccordionContent> must be used within a <AccordionItem>.",
    );
  }
  return context;
};

function Accordion({ defaultValue, children }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultValue ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openId, toggleItem }}>
      <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ value, children }: AccordionItemProps) {
  const generatedId = useId();
  const contextValue = useMemo<AccordionItemContextType>(
    () => ({
      id: value,
      triggerId: {generatedId}-trigger,
      contentId: {generatedId}-content,
    }),
    [generatedId, value],
  );

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div className="border-b last:border-b-0">{children}</div>
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({ children }: AccordionTriggerProps) {
  const { openId, toggleItem } = useAccordionContext();
  const { id, contentId, triggerId } = useAccordionItemContext();
  const isOpen = openId === id;

  return (
    <h3>
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        id={triggerId}
        onClick={() => toggleItem(id)}
        type="button"
      >
        <span>{children}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180 text-primary",
          )}
        />
      </button>
    </h3>
  );
}

function AccordionContent({ children }: AccordionContentProps) {
  const { openId } = useAccordionContext();
  const { id, triggerId, contentId } = useAccordionItemContext();
  const isOpen = openId === id;

  return (
    <section
      aria-labelledby={triggerId}
      className="px-4 pb-4 text-sm leading-6 text-muted-foreground"
      hidden={!isOpen}
      id={contentId}
    >
      {children}
    </section>
  );
}`;

function CompoundComponentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Compound Components
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              UI Patterns
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Build an accordion where the root component shares internal state
            through React Context, and the child components collaborate without
            a trail of props.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {concepts.map((concept) => {
          const Icon = concept.icon;

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
          );
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <Card className="min-h-[560px] gap-0 py-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <FileCode2Icon className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Example: Context-powered Accordion
              </span>
            </div>
            <Badge variant="outline">Compound API</Badge>
          </div>
          <CardContent className="space-y-5 p-4">
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="rounded-lg border bg-muted/20 p-4">
                <h2 className="text-sm font-semibold">Consumer API</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The outside code names the relationship between pieces. The
                  root still owns which item is open.
                </p>
                <pre className="mt-4 overflow-auto max-h-[400px] rounded-lg bg-background p-3 text-xs leading-6">
                  <code>{compoundExampleCode}</code>
                </pre>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
                    <InfoIcon className="size-4" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold">What it is</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      A compound component is a set of components designed to be
                      used together. They coordinate through shared internal
                      context instead of forcing every detail into public props.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border bg-background p-4">
              <h2 className="text-sm font-semibold">Implementation sketch</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The root provider stores <code>openValue</code>. Each item
                provider stores the item value. Trigger and Content read both
                contexts to decide how to render.
              </p>
              <pre className="mt-4 overflow-auto max-h-[500px] rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{implementationCode}</code>
              </pre>
            </section>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2Icon className="size-4 text-primary" />
                Live Preview
              </CardTitle>
              <CardDescription>
                Click each trigger to see the root state update through Context.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LabAccordion defaultValue="state">
                <LabAccordionItem value="state">
                  <LabAccordionTrigger>
                    Who owns the accordion state?
                  </LabAccordionTrigger>
                  <LabAccordionContent>
                    The root Accordion stores the open item value, then shares
                    it with every child through context.
                  </LabAccordionContent>
                </LabAccordionItem>
                <LabAccordionItem value="props">
                  <LabAccordionTrigger>
                    Why are there so few props?
                  </LabAccordionTrigger>
                  <LabAccordionContent>
                    The child components do not need repeated props like{" "}
                    <code>openValue</code> or <code>onToggle</code>. They read
                    the nearest root and item providers.
                  </LabAccordionContent>
                </LabAccordionItem>
                <LabAccordionItem value="a11y">
                  <LabAccordionTrigger>
                    What accessibility hooks matter?
                  </LabAccordionTrigger>
                  <LabAccordionContent>
                    Use a real button, expose <code>aria-expanded</code>, link
                    the trigger and region, and keep keyboard focus on the
                    trigger.
                  </LabAccordionContent>
                </LabAccordionItem>
              </LabAccordion>

              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Shared state path
                </p>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="flex items-center justify-between rounded-md bg-background px-3 py-2">
                    <span>Accordion root</span>
                    <Badge variant="secondary">openValue</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-background px-3 py-2">
                    <span>Accordion.Item</span>
                    <Badge variant="secondary">value</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-background px-3 py-2">
                    <span>Trigger + Content</span>
                    <Badge variant="secondary">read context</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheckIcon className="size-4 text-primary" />
                Advantages
              </CardTitle>
              <CardDescription>
                Where this pattern earns its keep.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {advantages.map((advantage) => (
                  <li className="flex gap-2" key={advantage}>
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

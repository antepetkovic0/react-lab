import { BlocksIcon, GitBranchIcon, Layers3Icon } from 'lucide-react'

export const concepts = [
  {
    title: 'Parent owns the behavior',
    icon: BlocksIcon,
    description:
      'The root component stores the internal state and exposes actions through React Context.',
  },
  {
    title: 'Children opt into shared state',
    icon: GitBranchIcon,
    description:
      'Trigger and Content do not receive long prop chains. They read the current item and root state from nearby providers.',
  },
  {
    title: 'Consumers control the markup',
    icon: Layers3Icon,
    description:
      'The API reads like a small UI language, so app code can arrange the pieces while the component keeps its rules private.',
  },
]

export const advantages = [
  'Avoids prop drilling across tightly related child components.',
  'Keeps internal state and event handlers close to the root component.',
  'Creates a flexible API that still guides consumers toward valid structure.',
  'Makes patterns like tabs, menus, accordions, and form fields easier to compose.',
]

export const previewCode = `function FAQPanel() {
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
  }`

export const implementationCode = `interface AccordionContextType {
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
  }`

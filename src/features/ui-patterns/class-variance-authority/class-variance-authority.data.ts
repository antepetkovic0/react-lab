import { BoxesIcon, GitBranchIcon, MergeIcon } from 'lucide-react'

export const concepts = [
  {
    title: 'What CVA is',
    icon: BoxesIcon,
    description:
      'Class Variance Authority is a small class recipe helper. You define base classes, variant maps, defaults, and special combinations once, then call the recipe with typed props.',
  },
  {
    title: 'Why it helps',
    icon: GitBranchIcon,
    description:
      'It turns repeated class branching into a design-system API. The component reads by intent, size, or state instead of long conditional class strings.',
  },
  {
    title: 'Where cn fits',
    icon: MergeIcon,
    description:
      'CVA returns the recipe classes. This project uses cn(), a small helper that runs clsx first and tailwind-merge second, so conditional classes stay ergonomic and conflicting Tailwind utilities resolve cleanly.',
  },
]

export const usageNotes = [
  {
    title: 'Use CVA when a component has real style modes',
    description:
      'Buttons, badges, alerts, cards, empty states, pricing tiles, and status panels are good candidates because variants become part of their public API.',
  },
  {
    title: 'Keep simple one-off classes simple',
    description:
      'If a component has only one style and one conditional class, clsx or cn() is enough. CVA earns its keep when combinations start multiplying.',
  },
  {
    title: 'Reach for compoundVariants for design rules',
    description:
      'Compound variants are classes that apply only when multiple variant props match, such as danger + solid or warning + comfortable.',
  },
  {
    title: 'Use tailwind-merge at the edge',
    description:
      'Call cn(recipe({ ...variants }), className) when the component accepts className. Conflicting utilities like p-3 and p-6 resolve predictably.',
  },
]

export const withoutVariantsCode = `type SignalCardProps = {
  intent?: "success" | "warning" | "danger";
  density?: "compact" | "comfortable";
  emphasis?: "soft" | "solid";
  interactive?: boolean;
  className?: string;
};

function SignalCard({
  className,
  density = "comfortable",
  emphasis = "soft",
  intent = "success",
  interactive = true,
}: SignalCardProps) {
  const classNameFromBranches = cn(
    "relative overflow-hidden rounded-lg border transition-all",
    density === "compact" ? "p-3" : "p-4",
    interactive && "cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
    intent === "success" &&
      emphasis === "soft" &&
      "border-emerald-200 bg-emerald-50 text-emerald-950",
    intent === "warning" &&
      emphasis === "soft" &&
      "border-amber-200 bg-amber-50 text-amber-950",
    intent === "danger" &&
      emphasis === "soft" &&
      "border-rose-200 bg-rose-50 text-rose-950",
    intent === "success" &&
      emphasis === "solid" &&
      "border-emerald-600 bg-emerald-600 text-white shadow-sm",
    intent === "warning" &&
      emphasis === "solid" &&
      "border-amber-500 bg-amber-500 text-amber-950 shadow-sm",
    intent === "danger" &&
      emphasis === "solid" &&
      "border-rose-600 bg-rose-600 text-white shadow-sm",
    (intent === "warning" || intent === "danger") &&
      density === "comfortable" &&
      "ring-2 ring-current/10",
    emphasis === "solid" && interactive && "hover:brightness-105",
    className,
  );

  return <article className={classNameFromBranches}>...</article>;
}`

export const withVariantsCode = `import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const signalCardVariants = cva(
  "relative overflow-hidden rounded-lg border transition-all",
  {
    variants: {
      intent: {
        success: "border-emerald-200 bg-emerald-50 text-emerald-950",
        warning: "border-amber-200 bg-amber-50 text-amber-950",
        danger: "border-rose-200 bg-rose-50 text-rose-950",
      },
      density: {
        compact: "p-3",
        comfortable: "p-4",
      },
      emphasis: {
        soft: "shadow-none",
        solid: "text-white shadow-sm",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
        false: null,
      },
    },
    compoundVariants: [
      {
        intent: "success",
        emphasis: "solid",
        class: "border-emerald-600 bg-emerald-600",
      },
      {
        intent: "warning",
        emphasis: "solid",
        class: "border-amber-500 bg-amber-500 text-amber-950",
      },
      {
        intent: "danger",
        emphasis: "solid",
        class: "border-rose-600 bg-rose-600",
      },
      {
        intent: ["warning", "danger"],
        density: "comfortable",
        class: "ring-2 ring-current/10",
      },
      {
        emphasis: "solid",
        interactive: true,
        class: "hover:brightness-105",
      },
    ],
    defaultVariants: {
      density: "comfortable",
      emphasis: "soft",
      intent: "success",
      interactive: true,
    },
  },
);

type SignalCardProps =
  React.ComponentProps<"article"> &
  VariantProps<typeof signalCardVariants> & {
    pulse?: boolean;
  };

function SignalCard({
  className,
  density,
  emphasis,
  intent,
  interactive,
  pulse = true,
  ...props
}: SignalCardProps) {
  return (
    <article
      className={cn(
        signalCardVariants({ density, emphasis, intent, interactive }),
        className,
      )}
      {...props}
    >
      <span className={cn("size-2.5 rounded-full", pulse && "animate-pulse")} />
      ...
    </article>
  );
}`

export const cnCode = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

cn("rounded-lg p-3 bg-card", isLarge && "p-6", className);
// If className contains "p-2", tailwind-merge keeps the last
// conflicting padding utility instead of shipping "p-6 p-2" together.`

export const controlGroups = {
  intent: ['success', 'warning', 'danger'],
  density: ['comfortable', 'compact'],
  emphasis: ['soft', 'solid'],
} as const

export const references = [
  'cva(base, options) returns a class recipe function.',
  'variants describe named prop values and the classes each value adds.',
  'defaultVariants keep component call sites quiet for the common path.',
  'compoundVariants apply classes when multiple variant conditions match.',
  'clsx handles conditional classes; tailwind-merge removes conflicting Tailwind utilities.',
]

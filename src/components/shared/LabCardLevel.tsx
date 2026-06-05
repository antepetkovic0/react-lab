import { cn } from "@/lib/utils";

export type LabCardLevelValue = "beginner" | "intermediate" | "advanced";

type LabCardLevelProps = {
  level: LabCardLevelValue;
  className?: string;
};

const levelMeta: Record<
  LabCardLevelValue,
  {
    label: string;
    bars: number;
    className: string;
  }
> = {
  beginner: {
    label: "Beginner",
    bars: 1,
    className: "bg-emerald-500",
  },
  intermediate: {
    label: "Intermediate",
    bars: 2,
    className: "bg-sky-500",
  },
  advanced: {
    label: "Advanced",
    bars: 3,
    className: "bg-red-500",
  },
};

export function LabCardLevel({ level, className }: LabCardLevelProps) {
  const meta = levelMeta[level];

  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <div className="flex items-end gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((bar) => (
          <span
            className={cn(
              "w-1 rounded-full bg-muted-foreground/25",
              bar === 1 && "h-2",
              bar === 2 && "h-3",
              bar === 3 && "h-4",
              bar <= meta.bars && meta.className,
            )}
            key={bar}
          />
        ))}
      </div>
      <span className="text-xs font-medium">{meta.label}</span>
    </div>
  );
}

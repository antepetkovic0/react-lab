interface ValueBoxProps {
  label: string;
  value: string;
}

function ValueBox({ label, value }: ValueBoxProps) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 min-h-6 break-all font-mono text-xs leading-5">
        {value || "Generating..."}
      </p>
    </div>
  );
}

export { ValueBox };

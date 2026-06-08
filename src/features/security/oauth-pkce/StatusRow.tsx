interface StatusRowProps {
  label: string;
  value: string;
}

function StatusRow({ label, value }: StatusRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border bg-muted/20 p-3">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="max-w-44 break-all text-right font-mono text-xs">
        {value}
      </span>
    </div>
  );
}

export { StatusRow };

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { statusMeta } from "./reducer-state-machine.data";
import type { UploadStatus } from "./reducer-state-machine.types";

function StatusBadge({ status }: { status: UploadStatus }) {
  const meta = statusMeta[status];

  return (
    <Badge className={cn("border", meta.className)} variant="outline">
      {meta.label}
    </Badge>
  );
}

export { StatusBadge };

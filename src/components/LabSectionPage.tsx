import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LabSectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  topics: string[];
  labs: string[];
};

export function LabSectionPage({
  eyebrow,
  title,
  description,
  topics,
  labs,
}: LabSectionPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Core Topics</CardTitle>
            <CardDescription>
              Concepts this section should teach and reinforce.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {topics.map((topic) => (
                <div
                  className="rounded-lg border bg-muted/30 px-3 py-2 text-sm"
                  key={topic}
                >
                  {topic}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Labs</CardTitle>
            <CardDescription>
              Practical exercises to add under this route.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {labs.map((lab) => (
                <li
                  className="rounded-lg border bg-background px-3 py-2 text-sm"
                  key={lab}
                >
                  {lab}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

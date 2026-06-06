import { Link, useRouterState } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { labs } from "@/content/labs";
import { cn } from "@/lib/utils";

export const routeBreadcrumbLabels: Record<string, string> = {
  architecture: "Architecture",
  "components-jsx": "Components & JSX",
  "core-web-vitals": "Core Web Vitals",
  "data-fetching": "Data Fetching",
  "forms-validation": "Forms & Validation",
  fundamentals: "Fundamentals",
  "hooks-effects": "Hooks & Effects",
  performance: "Performance",
  routing: "Routing",
  security: "Security",
  "state-management": "State Management",
  testing: "Testing",
  "ui-patterns": "UI Patterns",
  ...Object.fromEntries(labs.map((lab) => [lab.id, lab.title])),
};

type RouteBreadcrumbsProps = {
  className?: string;
};

type BreadcrumbSegment = {
  href: string;
  label: string;
};

function prettifySegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getRouteBreadcrumbSegments(pathname: string): BreadcrumbSegment[] {
  const routeSegments = pathname.split("/").filter(Boolean);

  return routeSegments.map((segment, index) => ({
    href: `/${routeSegments.slice(0, index + 1).join("/")}`,
    label: routeBreadcrumbLabels[segment] ?? prettifySegment(segment),
  }));
}

export function RouteBreadcrumbs({ className }: RouteBreadcrumbsProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const segments = getRouteBreadcrumbSegments(pathname);

  return (
    <Breadcrumb className={cn("text-xs", className)}>
      <BreadcrumbList className="text-xs">
        <BreadcrumbItem>
          {segments.length === 0 ? (
            <BreadcrumbPage>Home</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isCurrentPage = index === segments.length - 1;

          return (
            <Fragment key={segment.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={segment.href}>{segment.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

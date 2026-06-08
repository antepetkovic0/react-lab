import { getLabsBySection } from "@/content/labs";

export const overview = {
  description:
    "Measure before optimizing, then apply the right React and browser performance patterns.",
  eyebrow: "Speed",
  title: "Performance",
  topics: [
    {
      title: "Profiling",
      description: "Find slow renders before guessing at fixes.",
    },
    {
      title: "Memoization",
      description: "Cache work only when it removes real cost.",
    },
    {
      title: "Code splitting",
      description: "Ship less JavaScript on the first route.",
    },
    {
      title: "Virtualization",
      description: "Render only the visible rows in large lists.",
    },
    {
      title: "Render waterfalls",
      description: "Avoid chains of work that delay interactivity.",
    },
    {
      title: "Bundle size",
      description: "Watch dependency cost and route-level payloads.",
    },
  ],
};

export const labs = getLabsBySection("performance");

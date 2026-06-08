import { getLabsBySection } from "@/content/labs";

export const overview = {
  description:
    "Cover the primitives every React developer needs before reaching for ecosystem libraries.",
  eyebrow: "Core React",
  title: "Fundamentals",
  topics: [
    {
      title: "JSX",
      description: "Write markup-like JavaScript that returns UI.",
    },
    {
      title: "Components",
      description: "Split screens into named, reusable pieces.",
    },
    {
      title: "Props",
      description: "Pass read-only data from parent to child.",
    },
    {
      title: "State",
      description: "Track values a component owns over time.",
    },
    {
      title: "Conditional rendering",
      description: "Choose what appears from the current data.",
    },
    {
      title: "Rendering lists",
      description: "Map arrays into stable UI with keys.",
    },
  ],
};

export const labs = getLabsBySection("fundamentals");

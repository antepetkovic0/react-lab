import { getLabsBySection } from "@/content/labs";

export const overview = {
  description:
    "Compare local, shared, and global state patterns so each problem gets the smallest useful tool.",
  eyebrow: "Client State",
  title: "State Management",
  topics: [
    {
      title: "Local state",
      description:
        "Keep state near the component that owns the interaction whenever possible.",
    },
    {
      title: "Derived state",
      description:
        "Calculate values from existing data instead of duplicating state unnecessarily.",
    },
    {
      title: "Context",
      description:
        "Share values across a subtree without passing props through every layer.",
    },
    {
      title: "Zustand",
      description:
        "Use a small external store for shared client state with minimal setup.",
    },
    {
      title: "Redux Toolkit",
      description:
        "Model larger state transitions with slices, actions, and predictable updates.",
    },
    {
      title: "URL state",
      description:
        "Put shareable filters, tabs, and view options into search params.",
    },
  ],
};

export const labs = getLabsBySection("state-management");

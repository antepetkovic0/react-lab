export const overview = {
  description:
    "Shape a React codebase so features, shared UI, data access, and configuration stay understandable as the app grows.",
  eyebrow: "System Design",
  title: "Architecture",
  topics: [
    {
      title: "Feature modules",
      description:
        "Group screens, components, and feature-specific logic around product capabilities.",
    },
    {
      title: "Shared component boundaries",
      description:
        "Keep reusable UI separate from feature code without turning everything global.",
    },
    {
      title: "Error boundaries",
      description:
        "Contain rendering failures and provide useful recovery points for users.",
    },
    {
      title: "Environment variables",
      description:
        "Separate build-time configuration from app code and avoid leaking secrets.",
    },
    {
      title: "API layers",
      description:
        "Centralize request helpers, response typing, and error handling conventions.",
    },
    {
      title: "Dependency organization",
      description:
        "Make import direction, ownership, and shared utilities easy to reason about.",
    },
  ],
};

import { getLabsBySection } from "@/content/labs";

export const overview = {
  description:
    "Practice the client-side security habits that matter in real React apps.",
  eyebrow: "Trust Boundaries",
  title: "Security",
  topics: [
    {
      title: "XSS prevention",
      description:
        "Treat user-controlled content as unsafe and avoid injecting unsanitized markup.",
    },
    {
      title: "Auth flows",
      description:
        "Model OAuth redirects, login, logout, session refresh, and trust boundaries.",
    },
    {
      title: "Token handling",
      description:
        "Compare storage options and understand the risks around access and refresh tokens.",
    },
    {
      title: "Protected routes",
      description:
        "Gate route access while still handling loading, expired sessions, and redirects.",
    },
    {
      title: "Dependency risk",
      description:
        "Review package updates, transitive dependencies, and vulnerable client libraries.",
    },
    {
      title: "Safe rendering",
      description:
        "Render rich text, links, and external content with explicit sanitization rules.",
    },
  ],
};

export const labs = getLabsBySection("security");

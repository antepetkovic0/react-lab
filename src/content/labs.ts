import type {
  LabCardLevelValue,
  LabCardSectionValue,
} from "@/components/shared/lab-card/LabCard";

export type Lab = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  section: LabCardSectionValue;
  sectionLabel: string;
  level: LabCardLevelValue;
  href: string;
  isPopular?: boolean;
  isSearchable?: boolean;
};

export const labs = [
  {
    id: "components-jsx",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M49 35 26 60l23 25M111 35l23 25-23 25" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Crect x="61" y="30" width="38" height="60" rx="9" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Cpath d="M72 47h16M72 60h16M72 73h10" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M57 24h46M57 96h46" stroke="%230891b2" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 7"/%3E%3Ccircle cx="80" cy="24" r="4" fill="%23059669"/%3E%3Ccircle cx="80" cy="96" r="4" fill="%23059669"/%3E%3C/svg%3E',
    imageAlt: "JSX brackets around a component",
    title: "Components & JSX",
    description:
      "Create small components, write JSX, and compose UI from simple reusable pieces.",
    level: "beginner",
    section: "fundamentals",
    sectionLabel: "Fundamentals",
    href: "/fundamentals/components-jsx",
    isPopular: false,
    isSearchable: true,
  },
  {
    id: "rendering-lifecycle",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M50 64a31 31 0 0 1 57-20" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M110 56a31 31 0 0 1-57 20" fill="none" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="m103 39 8 1 1-8M57 81l-8-1-1 8" fill="none" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M80 38v22l15 10" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="80" cy="60" r="5" fill="%23059669"/%3E%3Cpath d="M35 60h12M113 60h12" stroke="%230f172a" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3C/svg%3E',
    imageAlt: "Circular render lifecycle clock",
    title: "Rendering Lifecycle",
    description:
      "Trace how React renders, commits, and updates UI when state or props change.",
    level: "beginner",
    section: "fundamentals",
    sectionLabel: "Fundamentals",
    href: "/fundamentals/rendering-lifecycle",
    isPopular: false,
    isSearchable: true,
  },
  {
    id: "why-keys",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M55 39h61M55 60h61M55 81h61" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M36 31h18v16H36zM36 52h18v16H36zM36 73h18v16H36z" fill="none" stroke="%23059669" stroke-width="3" stroke-linejoin="round"/%3E%3Cpath d="M42 39h7M42 60h7M42 81h7" stroke="%23059669" stroke-width="3" stroke-linecap="round"/%3E%3Cpath d="M119 39h8M119 60h8M119 81h8" stroke="%230891b2" stroke-width="3" stroke-linecap="round"/%3E%3Ccircle cx="130" cy="39" r="3" fill="%230891b2"/%3E%3Ccircle cx="130" cy="60" r="3" fill="%230891b2"/%3E%3Ccircle cx="130" cy="81" r="3" fill="%230891b2"/%3E%3C/svg%3E',
    imageAlt: "List rows with stable key labels",
    title: "Why Keys",
    description:
      "Learn why keys help React identify list items across inserts, deletes, and reorders.",
    level: "beginner",
    section: "fundamentals",
    sectionLabel: "Fundamentals",
    href: "/fundamentals/why-keys",
    isPopular: false,
    isSearchable: true,
  },
  {
    id: "lifting-state-up",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M80 28v26M80 54H53M80 54h27" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Crect x="57" y="20" width="46" height="24" rx="8" fill="none" stroke="%23059669" stroke-width="4"/%3E%3Crect x="35" y="70" width="36" height="25" rx="9" fill="none" stroke="%230f172a" stroke-width="4"/%3E%3Crect x="89" y="70" width="36" height="25" rx="9" fill="none" stroke="%230f172a" stroke-width="4"/%3E%3Cpath d="M61 65 53 54l-8 11M99 65l8-11 8 11" fill="none" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="80" cy="32" r="5" fill="%23059669"/%3E%3Cpath d="M70 82h20" stroke="%230891b2" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3C/svg%3E',
    imageAlt: "State lifted from child cards into a parent",
    title: "Lifting State Up",
    description:
      "Move shared state to a common parent so sibling components stay in sync.",
    level: "intermediate",
    section: "fundamentals",
    sectionLabel: "Fundamentals",
    href: "/fundamentals/lifting-state-up",
    isPopular: true,
    isSearchable: true,
  },

  {
    id: "debounce-throttle",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M31 85h98" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M42 76V44M74 76V32M106 76V52" stroke="%237c3aed" stroke-width="8" stroke-linecap="round"/%3E%3Cpath d="M38 44h28M70 32h28M102 52h22" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 6"/%3E%3Ccircle cx="42" cy="44" r="7" fill="%237c3aed"/%3E%3Ccircle cx="74" cy="32" r="7" fill="%237c3aed"/%3E%3Ccircle cx="106" cy="52" r="7" fill="%237c3aed"/%3E%3Cpath d="M37 96h18M69 96h18M101 96h18" stroke="%230f172a" stroke-width="3" stroke-linecap="round"/%3E%3Cpath d="M32 24c16 0 16 14 32 14s16-14 32-14 16 14 32 14" fill="none" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3C/svg%3E',
    imageAlt: "Timed updates settling into measured intervals",
    title: "Debounce & Throttle",
    description:
      "Write reusable hooks for delayed and rate-limited updates, then apply them to search and slider examples.",
    level: "intermediate",
    section: "hooks-effects",
    sectionLabel: "Hooks & Effects",
    href: "/hooks-effects/debounce-throttle",
    isPopular: true,
    isSearchable: true,
  },
  {
    id: "effect-dependencies",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Crect x="28" y="25" width="104" height="70" rx="12" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Cpath d="M46 44h26M88 44h26M46 62h18M80 62h34M46 80h34M96 80h18" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M72 44h16M64 62h16M80 80h16" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M39 34v52M121 34v52" stroke="%230891b2" stroke-width="3" stroke-linecap="round"/%3E%3Ccircle cx="72" cy="44" r="5" fill="%23059669"/%3E%3Ccircle cx="80" cy="62" r="5" fill="%230891b2"/%3E%3Ccircle cx="96" cy="80" r="5" fill="%23059669"/%3E%3Cpath d="M24 60h14M122 60h14M31 53l7 7-7 7M129 53l-7 7 7 7" fill="none" stroke="%23059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E',
    imageAlt: "Dependency array values compared between renders",
    title: "Effect Dependencies",
    description:
      "Learn how React compares dependency arrays with Object.is and why references rerun effects.",
    level: "intermediate",
    section: "hooks-effects",
    sectionLabel: "Hooks & Effects",
    href: "/hooks-effects/effect-dependencies",
    isPopular: false,
    isSearchable: true,
  },
  {
    id: "react-hook-form-zod",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Crect x="31" y="24" width="64" height="72" rx="10" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Cpath d="M47 44h28M47 60h21M47 76h34" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M38 44l5 5 9-12M38 75l5 5 9-12" fill="none" stroke="%23e11d48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Crect x="103" y="31" width="32" height="24" rx="8" fill="none" stroke="%23e11d48" stroke-width="3"/%3E%3Crect x="103" y="68" width="32" height="24" rx="8" fill="none" stroke="%230891b2" stroke-width="3"/%3E%3Cpath d="M95 44h8M95 80h8M119 55v13" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3Cpath d="M113 43h12M113 80h12" stroke="%230f172a" stroke-width="3" stroke-linecap="round"/%3E%3Ccircle cx="95" cy="44" r="4" fill="%23e11d48"/%3E%3Ccircle cx="95" cy="80" r="4" fill="%230891b2"/%3E%3Cpath d="M62 101h36" stroke="%230f172a" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 7"/%3E%3C/svg%3E',
    imageAlt: "Validated form fields connected to schema branches",
    title: "React Hook Form + Zod",
    description:
      "Build a type-safe form with schema validation, accessible errors, submit state, and a conditional union.",
    level: "intermediate",
    section: "forms-validation",
    sectionLabel: "Forms & Validation",
    href: "/forms-validation/react-hook-form-zod",
    isPopular: true,
    isSearchable: true,
  },
  {
    id: "reducer-state-machine",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Crect x="25" y="24" width="38" height="24" rx="8" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Crect x="97" y="24" width="38" height="24" rx="8" fill="none" stroke="%23059669" stroke-width="3"/%3E%3Crect x="25" y="72" width="38" height="24" rx="8" fill="none" stroke="%23059669" stroke-width="3"/%3E%3Crect x="97" y="72" width="38" height="24" rx="8" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Cpath d="M63 36h34M116 48v24M97 84H63M44 72V48" fill="none" stroke="%230891b2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="m91 29 8 7-8 7M109 66l7 8 7-8M69 77l-8 7 8 7M37 54l7-8 7 8" fill="none" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="44" cy="36" r="5" fill="%23059669"/%3E%3Ccircle cx="116" cy="36" r="5" fill="%230f172a"/%3E%3Ccircle cx="44" cy="84" r="5" fill="%230f172a"/%3E%3Ccircle cx="116" cy="84" r="5" fill="%23059669"/%3E%3Cpath d="M75 60h10M80 55v10" stroke="%230f172a" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E',
    imageAlt: "Reducer state machine nodes connected by event arrows",
    title: "Reducer State Machine",
    description:
      "Model an upload flow with reducer events, explicit states, valid transitions, and side effects outside the reducer.",
    level: "intermediate",
    section: "state-management",
    sectionLabel: "State Management",
    href: "/state-management/reducer-state-machine",
    isPopular: true,
    isSearchable: true,
  },
  {
    id: "compound-components",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Crect x="35" y="28" width="90" height="22" rx="7" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Crect x="35" y="50" width="90" height="42" rx="8" fill="none" stroke="%23059669" stroke-width="3"/%3E%3Cpath d="M48 39h34M111 36l6 6 6-6M48 65h64M48 78h42" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M24 39h11M125 39h11M80 19v9M80 92v9" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3Ccircle cx="80" cy="19" r="4" fill="%23059669"/%3E%3Ccircle cx="80" cy="101" r="4" fill="%23059669"/%3E%3Cpath d="M60 50v42M100 50v42" stroke="%230891b2" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 6"/%3E%3C/svg%3E',
    imageAlt: "Accordion pieces sharing state through context",
    title: "Compound Components",
    description:
      "Build an accordion API where child components share internal state through React Context.",
    level: "intermediate",
    section: "ui-patterns",
    sectionLabel: "UI Patterns",
    href: "/ui-patterns/compound-components",
    isPopular: true,
    isSearchable: true,
  },
  {
    id: "class-variance-authority",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Crect x="31" y="24" width="98" height="72" rx="11" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Cpath d="M46 43h34M46 59h22M46 75h44" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M99 41h18M99 58h18M99 75h18" stroke="%23059669" stroke-width="5" stroke-linecap="round"/%3E%3Ccircle cx="92" cy="41" r="4" fill="%23059669"/%3E%3Ccircle cx="92" cy="58" r="4" fill="%230891b2"/%3E%3Ccircle cx="92" cy="75" r="4" fill="%23059669"/%3E%3Cpath d="M25 40h6M25 80h6M129 40h6M129 80h6M80 17v7M80 96v7" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3Cpath d="M53 96c8-12 18-12 27 0s19 12 27 0" fill="none" stroke="%23059669" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E',
    imageAlt: "Variant recipe card with connected style options",
    title: "Class Variance Authority",
    description:
      "Build typed Tailwind variant recipes with cva, cx, tailwind-merge, and compound variant rules.",
    level: "intermediate",
    section: "ui-patterns",
    sectionLabel: "UI Patterns",
    href: "/ui-patterns/class-variance-authority",
    isPopular: false,
    isSearchable: true,
  },
  {
    id: "oauth-pkce",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Crect x="45" y="48" width="70" height="45" rx="10" fill="none" stroke="%230f172a" stroke-width="4"/%3E%3Cpath d="M61 48V37c0-12 8-20 19-20s19 8 19 20v11" fill="none" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Ccircle cx="80" cy="70" r="7" fill="%23059669"/%3E%3Cpath d="M80 77v8" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M25 65h20M115 65h20M32 50l13 15-13 15M128 50l-13 15 13 15" fill="none" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M55 102h50" stroke="%230f172a" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 7"/%3E%3C/svg%3E',
    imageAlt: "PKCE lock with authorization flow arrows",
    title: "OAuth 2.0 with PKCE",
    description:
      "Simulate the authorization code flow, generate PKCE values, and break the verifier checks safely in the browser.",
    level: "advanced",
    section: "security",
    sectionLabel: "Security",
    href: "/security/oauth-pkce",
    isPopular: true,
    isSearchable: true,
  },
  {
    id: "core-web-vitals",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M28 86h104" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M40 76V45M80 76V32M120 76V56" stroke="%23059669" stroke-width="8" stroke-linecap="round"/%3E%3Cpath d="M33 46h34M73 33h34M113 56h20" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 6"/%3E%3Ccircle cx="40" cy="44" r="8" fill="%23059669"/%3E%3Ccircle cx="80" cy="32" r="8" fill="%23059669"/%3E%3Ccircle cx="120" cy="56" r="8" fill="%23059669"/%3E%3Cpath d="M36 101h8M76 101h8M116 101h8" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M38 20h84" stroke="%230f172a" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E',
    imageAlt: "Core Web Vitals metric bars",
    title: "Core Web Vitals",
    description:
      "Measure LCP, INP, and CLS, then connect each score to the React and browser work behind it.",
    level: "intermediate",
    section: "performance",
    sectionLabel: "Performance",
    href: "/performance/core-web-vitals",
    isPopular: true,
    isSearchable: true,
  },
] satisfies Lab[];

export const popularLabs = labs.filter((lab) => lab.isPopular);

export const searchableLabs = labs.filter((lab) => lab.isSearchable);

export function getLabsBySection(section: LabCardSectionValue) {
  return labs.filter((lab) => lab.section === section);
}

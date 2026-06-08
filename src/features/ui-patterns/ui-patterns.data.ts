import { getLabsBySection } from '@/content/labs'

export const overview = {
  description:
    'Collect reusable component patterns that make product interfaces easier to build and maintain.',
  eyebrow: 'Interface Design',
  title: 'UI Patterns',
  topics: [
    {
      title: 'Composition patterns',
      description:
        'Shape components around reusable slots, children, and layout primitives.',
    },
    {
      title: 'Compound components',
      description:
        'Coordinate related child components through shared internal context.',
    },
    {
      title: 'Accessibility',
      description:
        'Use semantic structure, keyboard support, and ARIA only where it adds clarity.',
    },
    {
      title: 'Tables',
      description:
        'Design dense data views with sorting, selection, pagination, and responsive states.',
    },
    {
      title: 'Dialogs',
      description:
        'Manage focus, escape behavior, overlays, and confirmation flows safely.',
    },
    {
      title: 'Design system primitives',
      description:
        'Build small reusable foundations that keep product interfaces consistent.',
    },
  ],
}

export const labCards = getLabsBySection('ui-patterns')

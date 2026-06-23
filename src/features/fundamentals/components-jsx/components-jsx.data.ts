import { BlocksIcon, BracesIcon, FileCode2Icon, ShapesIcon } from 'lucide-react'

export const focusTopics = [
  {
    title: 'What are components?',
    icon: BlocksIcon,
    description:
      'Components are named, reusable pieces of UI. In React, a component is usually a JavaScript function that returns React elements describing what should appear on screen.',
  },
  {
    title: 'What is JSX?',
    icon: BracesIcon,
    description:
      'JSX is a syntax extension for JavaScript. It looks like markup, but it can use JavaScript expressions inside braces and lives next to the rendering logic it depends on.',
  },
  {
    title: 'JSX represents objects',
    icon: ShapesIcon,
    description:
      'JSX is compiled before it reaches the browser. The classic transform becomes React.createElement calls, which create lightweight React element objects.',
  },
  {
    title: 'How they work together',
    icon: FileCode2Icon,
    description:
      'Components compose other components with JSX. Lowercase tags describe built-in DOM elements, while capitalized tags describe your own React components.',
  },
]

export const componentExampleCode = `type ProfileCardProps = {
  name: string
  role: string
  isOnline: boolean
}

function StatusDot({ active }: { active: boolean }) {
  return <span className={active ? 'online' : 'offline'} />
}

function ProfileCard({ name, role, isOnline }: ProfileCardProps) {
  return (
    <article className="profile-card">
      <StatusDot active={isOnline} />
      <div>
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
    </article>
  )
}`

export const jsxBeforeCode = `const element = (
  <h1 className="greeting">
    Hello, Ada!
  </h1>
)`

export const classicTransformCode = `const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, Ada!'
)`

export const modernRuntimeCode = `import { jsx as _jsx } from 'react/jsx-runtime'

const element = _jsx('h1', {
  className: 'greeting',
  children: 'Hello, Ada!',
})`

export const elementObjectCode = `const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, Ada!',
  },
}`

export const practiceNotes = [
  'Use braces for JavaScript expressions: values, calculations, function calls, and variables.',
  'Use quotes for literal string attributes and braces for dynamic attributes.',
  'Use className and camelCase DOM props because JSX is closer to JavaScript than HTML.',
  'Treat React elements as descriptions. Creating one does not create a DOM node by itself.',
]

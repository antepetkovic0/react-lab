import { ArrowDownUpIcon, BadgeCheckIcon, FingerprintIcon } from 'lucide-react'

export const keyConcepts = [
  {
    title: 'Keys are item identity',
    icon: FingerprintIcon,
    description:
      'A key is a string or number that tells React which item a rendered child represents among its siblings.',
  },
  {
    title: 'Use them when lists can change',
    icon: ArrowDownUpIcon,
    description:
      'Keys matter most when items can be inserted, deleted, sorted, filtered, or moved while child state or DOM state exists.',
  },
  {
    title: 'Prefer stable data IDs',
    icon: BadgeCheckIcon,
    description:
      'Use IDs from your data. Avoid array indexes for changing lists and avoid generating keys during render.',
  },
]

export const people = [
  {
    id: 'ada',
    name: 'Ada',
    role: 'Writes the first note',
    note: 'Sketch props example',
  },
  {
    id: 'linus',
    name: 'Linus',
    role: 'Reviews the list',
    note: 'Check memo boundary',
  },
  {
    id: 'grace',
    name: 'Grace',
    role: 'Deletes stale rows',
    note: 'Verify diff output',
  },
  {
    id: 'mark',
    name: 'Mark',
    role: 'Ships the route',
    note: 'Run build before merge',
  },
]

export const badKeysCode = `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoRow key={index} todo={todo} />
      ))}
    </ul>
  );
}`

export const goodKeysCode = `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoRow key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}`

export const rules = [
  'Keys only need to be unique among siblings in the same array.',
  'A key should stay the same for the same item across renders.',
  'If a component needs the ID, pass it as a normal prop too. React does not pass key through props.',
]

import {
  AlertTriangleIcon,
  BracesIcon,
  GitCompareArrowsIcon,
  ListChecksIcon,
  Repeat2Icon,
  ShieldCheckIcon,
} from 'lucide-react'

export const mentalModelCards = [
  {
    title: 'Dependencies are reactive reads',
    icon: ListChecksIcon,
    description:
      'Props, state, and variables declared inside the component body are reactive. If an Effect reads them, they belong in the dependency list.',
  },
  {
    title: 'React compares with Object.is',
    icon: GitCompareArrowsIcon,
    description:
      'After a commit, React compares each dependency with the value from the previous render using Object.is.',
  },
  {
    title: 'References compare by identity',
    icon: BracesIcon,
    description:
      'Objects, arrays, and functions can contain the same data but still be different values when recreated during render.',
  },
  {
    title: 'Changed deps rerun the Effect',
    icon: Repeat2Icon,
    description:
      'When at least one dependency changes, React runs cleanup with old values, then setup with new values.',
  },
]

export const objectIsExamples = [
  {
    expression: 'Object.is("chat", "chat")',
    result: 'true',
    explanation: 'Primitive strings compare by value.',
  },
  {
    expression: 'Object.is(NaN, NaN)',
    result: 'true',
    explanation: 'Object.is treats NaN as equal to itself.',
  },
  {
    expression: 'Object.is(0, -0)',
    result: 'false',
    explanation: 'Signed zero is one place where Object.is differs from ===.',
  },
  {
    expression: 'Object.is({}, {})',
    result: 'false',
    explanation: 'Two object literals are two separate references.',
  },
]

export const dependencyPitfalls = [
  {
    title: 'Inline object',
    icon: AlertTriangleIcon,
    problem: 'const options = { roomId } creates a new object every render.',
    fix: 'Create the object inside the Effect, or memoize it only when the object is truly shared.',
  },
  {
    title: 'Inline callback',
    icon: AlertTriangleIcon,
    problem: 'function createOptions() {} has a new identity on every render.',
    fix: 'Move the function inside the Effect or wrap it in useCallback when another API needs a stable function.',
  },
  {
    title: 'Derived collection',
    icon: AlertTriangleIcon,
    problem:
      'items.filter(...) creates a new array even when the filtered values look the same.',
    fix: 'Depend on the primitive inputs, memoize expensive derivations, or keep the derivation in render if no Effect is needed.',
  },
]

export const stabilizationChoices = [
  {
    title: 'Prefer primitive dependencies',
    icon: ShieldCheckIcon,
    description:
      'Depending on roomId is clearer than depending on an options object that only wraps roomId.',
  },
  {
    title: 'Move setup-only values inside the Effect',
    icon: ShieldCheckIcon,
    description:
      'If an object or function is only used by the Effect, define it inside the setup function so it stops being a dependency.',
  },
  {
    title: 'Use memoization as an identity tool',
    icon: ShieldCheckIcon,
    description:
      'useMemo and useCallback help when identity matters to an Effect, memoized child, or external subscription API.',
  },
]

export const dependencyArrayCode = `function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234')

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()

    return () => connection.disconnect()
  }, [serverUrl, roomId])
}`

export const unnecessaryObjectCode = `function ChatRoom({ roomId }) {
  const options = { serverUrl: 'https://localhost:1234', roomId }

  useEffect(() => {
    const connection = createConnection(options)
    connection.connect()

    return () => connection.disconnect()
  }, [options]) // options is new on every render
}`

export const objectInsideEffectCode = `function ChatRoom({ roomId }) {
  useEffect(() => {
    const options = { serverUrl: 'https://localhost:1234', roomId }
    const connection = createConnection(options)
    connection.connect()

    return () => connection.disconnect()
  }, [roomId])
}`

export const readingLinks = [
  {
    title: 'useEffect reference',
    href: 'https://react.dev/reference/react/useEffect',
  },
  {
    title: 'Removing Effect dependencies',
    href: 'https://react.dev/learn/removing-effect-dependencies',
  },
  {
    title: 'useMemo reference',
    href: 'https://react.dev/reference/react/useMemo',
  },
  {
    title: 'useCallback reference',
    href: 'https://react.dev/reference/react/useCallback',
  },
]

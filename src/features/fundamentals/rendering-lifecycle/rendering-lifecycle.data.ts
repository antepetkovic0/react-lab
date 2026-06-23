import {
  ActivityIcon,
  BoxesIcon,
  BrushIcon,
  GitCompareArrowsIcon,
  MousePointerClickIcon,
  Repeat2Icon,
  SparklesIcon,
  WaypointsIcon,
} from 'lucide-react'

export const lifecycleStages = [
  {
    title: 'Trigger',
    label: 'A render is requested',
    icon: MousePointerClickIcon,
    description:
      'The first render starts when the root renders. Later renders are usually requested by state updates in a component or one of its ancestors.',
    output:
      'React marks the affected part of the tree as needing work and decides what update should be processed next.',
  },
  {
    title: 'Render',
    label: 'Components are called',
    icon: ActivityIcon,
    description:
      'React calls component functions to calculate the next JSX snapshot. This phase should stay pure: same props and state should produce the same UI description.',
    output:
      'React builds the next element tree and works out what changed compared with the previous render.',
  },
  {
    title: 'Commit',
    label: 'The host tree is updated',
    icon: GitCompareArrowsIcon,
    description:
      'After render finishes, React applies the necessary changes to the DOM. If the output is the same, React can commit little or no DOM work.',
    output:
      'DOM nodes, attributes, text, refs, and layout effects line up with the latest completed render.',
  },
  {
    title: 'Paint',
    label: 'The browser draws',
    icon: BrushIcon,
    description:
      'After React commits DOM changes, the browser can calculate layout, paint pixels, and composite the final frame.',
    output:
      'The user sees the committed UI. Passive effects run after the browser has had a chance to paint.',
  },
]

export const renderTriggers = [
  {
    title: 'Initial mount',
    icon: SparklesIcon,
    description:
      'The app creates a root and renders its first component tree into an empty DOM container.',
  },
  {
    title: 'State update',
    icon: Repeat2Icon,
    description:
      'Calling a state setter queues a render. The current render keeps its old state snapshot; the next render receives the new value.',
  },
  {
    title: 'Parent update',
    icon: WaypointsIcon,
    description:
      'When a parent renders, React normally evaluates the children it returns so their next output can be compared.',
  },
  {
    title: 'Identity change',
    icon: BoxesIcon,
    description:
      'Changing an element type or unstable key can make React replace a subtree instead of preserving its state.',
  },
]

export const scenarios = [
  {
    id: 'initial',
    title: 'Initial render',
    trigger: 'createRoot(...).render(<App />)',
    render:
      'React calls App and every nested component needed to describe the first screen.',
    commit:
      'React creates and inserts the DOM nodes because there was no previous tree to update.',
    paint: 'The browser draws the first visible frame.',
    insight: 'Mounting is the only time every DOM node on the screen is new.',
  },
  {
    id: 'state',
    title: 'State update',
    trigger: 'setCount(count + 1)',
    render:
      'React calls the component again with the next state snapshot and calculates new JSX.',
    commit:
      'Only the text, attributes, or nodes that differ from the previous output are changed.',
    paint: 'The browser paints the changed pixels.',
    insight:
      'A render can be broad, but the DOM mutation can still be tiny if most output is unchanged.',
  },
  {
    id: 'same-output',
    title: 'Same output',
    trigger: 'setState to a value that keeps the returned JSX equivalent',
    render:
      'React may still call components to verify the next snapshot and compare it with the last one.',
    commit:
      'If the host output is the same, React does not need to touch matching DOM nodes.',
    paint: 'The browser may have nothing visible to repaint.',
    insight:
      'Rendering is calculation. Committing is mutation. They are related, but not the same thing.',
  },
  {
    id: 'replacement',
    title: 'Subtree replacement',
    trigger: 'Switch <Profile /> to <Settings /> at the same position',
    render:
      'React sees a different component type and calculates a different branch of the UI tree.',
    commit:
      'The old subtree is removed, the new subtree is mounted, and local state below that boundary resets.',
    paint: 'The browser draws the new branch.',
    insight:
      'Component type and key are part of identity. Stable identity is what preserves state.',
  },
]

export const fiberNotes = [
  "A fiber is React's internal unit of work for one component or host node in the tree.",
  'The fiber tree lets React keep bookkeeping such as pending work, previous output, effects, and parent-child-sibling relationships.',
  'Because work is represented as fibers, React can prepare a new tree, pause or resume some work, and only commit after a render finishes successfully.',
  'Fiber is an implementation detail. The contract you rely on is still pure rendering, stable identity, and effects after commit.',
]

export const renderPurityCode = `function PriceTag({ price, taxRate }) {
  const total = price * (1 + taxRate)

  return <span>{total.toFixed(2)}</span>
}`

export const impureRenderCode = `let nextId = 0

function TodoRow({ todo }) {
  // Avoid: render changes a value outside the component.
  nextId += 1

  return <li id={\`todo-\${nextId}\`}>{todo.text}</li>
}`

export const updateFlowCode = `function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
    // count is still the snapshot from this render.
  }

  return <button onClick={increment}>{count}</button>
}`

export const readingLinks = [
  {
    title: 'Render and Commit',
    href: 'https://react.dev/learn/render-and-commit',
  },
  {
    title: 'State as a Snapshot',
    href: 'https://react.dev/learn/state-as-a-snapshot',
  },
  {
    title: 'Components and Hooks must be pure',
    href: 'https://react.dev/reference/rules/components-and-hooks-must-be-pure',
  },
  {
    title: 'Reconciliation',
    href: 'https://legacy.reactjs.org/docs/reconciliation.html',
  },
]

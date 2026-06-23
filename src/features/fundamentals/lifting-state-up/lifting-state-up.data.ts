import { BoxesIcon, Layers3Icon, WaypointsIcon } from 'lucide-react'

export const concepts = [
  {
    title: 'Start close',
    icon: BoxesIcon,
    description:
      'Put state in the component that directly owns the interaction while no other component needs it.',
  },
  {
    title: 'Share from a parent',
    icon: WaypointsIcon,
    description:
      'When siblings need the same value, move that state to their closest common parent and pass it down.',
  },
  {
    title: 'Keep one source',
    icon: Layers3Icon,
    description:
      'Avoid duplicated state that can drift. Store the minimal value and derive the rest during render.',
  },
]

export const palettes = [
  {
    id: 'calm',
    label: 'Calm',
    description: 'Muted blue-green workspace',
  },
  {
    id: 'focus',
    label: 'Focus',
    description: 'High contrast planning mode',
  },
  {
    id: 'warm',
    label: 'Warm',
    description: 'Soft review and reflection mode',
  },
] as const

export const localStateCode = `function ThemePicker() {
  const [theme, setTheme] = useState('calm')

  return (
    <ThemeOptions
      selectedTheme={theme}
      onSelectTheme={setTheme}
    />
  )
}`

export const liftedStateCode = `function ThemeSettings() {
  const [theme, setTheme] = useState('calm')

  return (
    <>
      <ThemePicker
        selectedTheme={theme}
        onSelectTheme={setTheme}
      />
      <ThemePreview selectedTheme={theme} />
    </>
  )
}`

export const valueHandlerCode = `function ThemePicker({ selectedTheme, onSelectTheme }) {
  return themes.map((theme) => (
    <button
      aria-pressed={theme.id === selectedTheme}
      key={theme.id}
      onClick={() => onSelectTheme(theme.id)}
      type="button"
    >
      {theme.label}
    </button>
  ))
}`

export const decisionSteps = [
  {
    id: 'start',
    label: 'Start with local state',
    detail:
      'Use useState where the interaction is first built. Do not lift it before another component needs it.',
  },
  {
    id: 'single-owner',
    label: 'Only this component reads it?',
    detail:
      'Leave it there. The component can update without making unrelated siblings recalculate.',
  },
  {
    id: 'one-child',
    label: 'Only one child needs it?',
    detail:
      'Move it down into that child. The parent should not own state it never uses.',
  },
  {
    id: 'siblings',
    label: 'Sibling or parent needs it?',
    detail:
      'Lift it to the closest common parent, then pass the value and change handler to the children.',
  },
  {
    id: 'distance',
    label: 'Passing gets awkward?',
    detail:
      'Try composition first. If a reusable subtree truly needs shared access, put context near that subtree.',
  },
  {
    id: 'ship',
    label: 'Ship and revisit',
    detail:
      'Requirements change. Moving state down or up is normal maintenance, not a failure.',
  },
]

export const rules = [
  'Co-location is the default for state that belongs to one interaction.',
  'Lifting state up is the tool for synchronizing siblings.',
  'Context can help with distance, but the provider should still live as close as practical.',
]

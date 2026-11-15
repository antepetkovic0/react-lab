import type { GenericColumn, Product, User } from './generic-components.types';

export const users: User[] = [
  { id: 'u1', name: 'Ada', role: 'Designer' },
  { id: 'u2', name: 'Lin', role: 'Engineer' },
  { id: 'u3', name: 'Sam', role: 'Researcher' },
];

export const products: Product[] = [
  { sku: 'p1', title: 'Notebook', price: 12 },
  { sku: 'p2', title: 'Pen set', price: 8 },
  { sku: 'p3', title: 'Desk lamp', price: 35 },
];

export const columns = [
  { key: 'name', heading: 'Name' },
  { key: 'role', heading: 'Role' },
] satisfies GenericColumn<User>[];

export const productColumns = [
  { key: 'title', heading: 'Product' },
  { key: 'price', heading: 'Price ($)' },
] satisfies GenericColumn<Product>[];

export const concepts = [
  {
    title: 'One type connects props',
    description:
      'The item type flows from items into getLabel, getKey, and onSelect. A callback cannot quietly switch to another shape.',
  },
  {
    title: 'Inference keeps JSX short',
    description:
      'The array usually gives TypeScript enough information to infer T, so consumers rarely need to write a type argument.',
  },
  {
    title: 'Constraints narrow choices',
    description:
      'keyof T lets a table column refer only to fields that exist on its row type.',
  },
];

export const pickerCode = `type PickerProps<T> = {
  items: readonly T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
};

function Picker<T>(props: PickerProps<T>) {
  return props.items.map((item) => (
    <button
      key={props.getKey(item)}
      onClick={() => props.onSelect(item)}
      type="button"
    >
      {props.getLabel(item)}
    </button>
  ));
}`;

export const usageCode = `<Picker
  items={users}
  getKey={(user) => user.id}
  getLabel={(user) => user.name}
  onSelect={(user) => setSelectedUser(user)}
/>

// T is inferred as User from items.`;

export const tableCode = `type Column<T> = {
  key: keyof T;
  heading: string;
};

const columns: Column<User>[] = [
  { key: 'name', heading: 'Name' },
  { key: 'role', heading: 'Role' },
  { key: 'price', heading: 'Price' }, // Type error: User has no price
];`;

export const checks = [
  {
    id: 'inferred-field',
    title: 'Inferred field',
    code: `items={users}\ngetLabel={(user) => user.name}`,
    compiles: true,
    explanation: 'items makes T equal User, and name is a User field.',
  },
  {
    id: 'missing-field',
    title: 'Missing field',
    code: `items={users}\ngetLabel={(user) => user.price}`,
    compiles: false,
    explanation:
      'User has no price field. TypeScript catches it inside the callback.',
  },
  {
    id: 'explicit-type',
    title: 'Explicit type argument',
    code: `<Picker<Product> items={users} ... />`,
    compiles: false,
    explanation:
      'An array of User cannot be used where Product items are required.',
  },
  {
    id: 'column-key',
    title: 'Constrained column',
    code: `const columns: Column<Product>[] = [\n  { key: 'price', heading: 'Price' },\n];`,
    compiles: true,
    explanation: 'price is a key of Product, so it is a valid column.',
  },
] as const;

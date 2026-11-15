import { GenericPicker } from './GenericPicker';
import { users } from './generic-components.data';
import type { GenericColumn, Product, User } from './generic-components.types';

// These JSX examples are checked by the project's TypeScript build.
export const inferred = (
  <GenericPicker
    getKey={(user) => user.id}
    getLabel={(user) => user.name}
    items={users}
    label="Users"
    onSelect={(user) => {
      const selected: User = user;
      return selected;
    }}
  />
);

export const invalidField = (
  <GenericPicker
    getKey={(user) => user.id}
    getLabel={(user) => {
      // @ts-expect-error Property 'price' does not exist on type 'User'.
      return user.price;
    }}
    items={users}
    label="Users"
    onSelect={() => {}}
  />
);

export const mismatchedType = (
  <GenericPicker<Product>
    getKey={(product) => product.sku}
    getLabel={(product) => product.title}
    // @ts-expect-error Type 'User[]' is not assignable to type 'readonly Product[]'.
    items={users}
    label="Products"
    onSelect={() => {}}
  />
);

export const invalidColumn: GenericColumn<User>[] = [
  { key: 'name', heading: 'Name' },
  // @ts-expect-error Type '"price"' is not assignable to type 'keyof User'
  { key: 'price', heading: 'Price' },
];

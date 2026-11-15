import { Code2Icon, ExternalLinkIcon } from 'lucide-react';
import { useState } from 'react';
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GenericPicker } from './GenericPicker';
import { GenericTable } from './GenericTable';
import {
  checks,
  columns,
  concepts,
  pickerCode,
  productColumns,
  products,
  tableCode,
  usageCode,
  users,
} from './generic-components.data';

const datasets = ['users', 'products'] as const;
type Dataset = (typeof datasets)[number];

function GenericComponentsPage() {
  const [dataset, setDataset] = useState<Dataset>('users');
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [selectedProductSku, setSelectedProductSku] = useState<string>();

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const selectedProduct = products.find(
    (product) => product.sku === selectedProductSku,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Generic React Components
          </h1>
          <Badge className="bg-primary/10 text-primary" variant="outline">
            UI Patterns
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          Build one picker for different data shapes. Watch TypeScript carry the
          item type through its props, then test what the compiler accepts.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {concepts.map((concept) => (
          <article
            className="rounded-lg border bg-background p-4"
            key={concept.title}
          >
            <h2 className="text-sm font-semibold">{concept.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {concept.description}
            </p>
          </article>
        ))}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <Card>
          <CardHeader>
            <CardTitle>Try the generic picker</CardTitle>
            <CardDescription>
              Switch data shapes, then select an item. The same component
              handles both sets while its callbacks retain their specific types.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <fieldset className="space-y-2">
              <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Data set
              </legend>
              <div className="flex flex-wrap gap-2">
                {datasets.map((option) => (
                  <Button
                    aria-pressed={dataset === option}
                    key={option}
                    onClick={() => setDataset(option)}
                    size="sm"
                    type="button"
                    variant={dataset === option ? 'default' : 'outline'}
                  >
                    {option === 'users' ? 'Users' : 'Products'}
                  </Button>
                ))}
              </div>
            </fieldset>

            <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">Pick an item</h2>
                <Badge variant="secondary">
                  T = {dataset === 'users' ? 'User' : 'Product'}
                </Badge>
              </div>
              {dataset === 'users' ? (
                <GenericPicker
                  getKey={(user) => user.id}
                  getLabel={(user) => user.name}
                  items={users}
                  label="Choose a user"
                  onSelect={(user) => setSelectedUserId(user.id)}
                  selectedKey={selectedUserId}
                />
              ) : (
                <GenericPicker
                  getKey={(product) => product.sku}
                  getLabel={(product) => product.title}
                  items={products}
                  label="Choose a product"
                  onSelect={(product) => setSelectedProductSku(product.sku)}
                  selectedKey={selectedProductSku}
                />
              )}
              <p aria-live="polite" className="text-sm text-muted-foreground">
                {dataset === 'users'
                  ? selectedUser
                    ? `${selectedUser.name} is a ${selectedUser.role}.`
                    : 'Select a user to inspect the typed callback result.'
                  : selectedProduct
                    ? `${selectedProduct.title} costs $${selectedProduct.price}.`
                    : 'Select a product to inspect the typed callback result.'}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold">
                The same idea in a table
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Each column key must exist on the current row type.
              </p>
              {dataset === 'users' ? (
                <GenericTable
                  columns={columns}
                  getKey={(user) => user.id}
                  label="Users and their roles"
                  rows={users}
                />
              ) : (
                <GenericTable
                  columns={productColumns}
                  getKey={(product) => product.sku}
                  label="Products and their prices"
                  rows={products}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2Icon className="size-4 text-primary" />
              How the types connect
            </CardTitle>
            <CardDescription>
              One <code>T</code> ties the array to every callback. The array
              usually supplies the type argument automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock code={pickerCode} label="Generic picker definition" />
            <CodeBlock
              code={usageCode}
              label="Picker usage with inferred User"
            />
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <Card>
          <CardHeader>
            <CardTitle>What TypeScript catches</CardTitle>
            <CardDescription>
              The same generic type connects each data set to its callbacks and
              column keys. See which examples compile and where a mismatch
              fails.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {checks.map((check) => {
              return (
                <div className="space-y-3 rounded-lg border p-4" key={check.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{check.title}</h3>
                    <Badge
                      className={
                        check.compiles
                          ? 'border-primary/30 bg-primary/10 text-primary'
                          : undefined
                      }
                      variant={check.compiles ? 'outline' : 'destructive'}
                    >
                      {check.compiles ? 'Compiles' : 'Type error'}
                    </Badge>
                  </div>
                  <CodeBlock code={check.code} label={`${check.title} code`} />
                  <p className="text-sm leading-6 text-muted-foreground">
                    {check.explanation}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Constrain a table column</CardTitle>
              <CardDescription>
                <code>keyof T</code> accepts only keys from the row type.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={tableCode} label="Column key constraint" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>When to reach for generics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Use a type parameter when props must agree on the same data
                shape. A picker or table can serve many item types while keeping
                callbacks precise.
              </p>
              <p>
                For one fixed data shape, ordinary typed props are simpler. A
                generic adds value when consumers really reuse the behavior.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section aria-labelledby="references-title" className="space-y-2 text-sm">
        <h2 className="font-semibold" id="references-title">
          References
        </h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
          <li>
            <a
              className="inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary"
              href="https://www.typescriptlang.org/docs/handbook/2/generics.html"
              rel="noreferrer"
              target="_blank"
            >
              TypeScript generics
              <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary"
              href="https://www.typescriptlang.org/docs/handbook/2/keyof-types.html"
              rel="noreferrer"
              target="_blank"
            >
              TypeScript keyof
              <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary"
              href="https://react.dev/learn/typescript"
              rel="noreferrer"
              target="_blank"
            >
              React with TypeScript
              <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <figure className="min-w-0">
      <figcaption className="sr-only">{label}</figcaption>
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export { GenericComponentsPage };

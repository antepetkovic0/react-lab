import type { GenericColumn } from './generic-components.types';

type GenericTableProps<T extends object> = {
  rows: readonly T[];
  columns: readonly GenericColumn<T>[];
  getKey: (row: T) => string;
  label: string;
};

export function GenericTable<T extends object>({
  rows,
  columns,
  getKey,
  label,
}: GenericTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table aria-label={label} className="w-full min-w-72 text-left text-sm">
        <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
          <tr>
            {columns.map((column) => (
              <th
                className="px-3 py-2 font-semibold"
                key={String(column.key)}
                scope="col"
              >
                {column.heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t" key={getKey(row)}>
              {columns.map((column) => (
                <td className="px-3 py-2" key={String(column.key)}>
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

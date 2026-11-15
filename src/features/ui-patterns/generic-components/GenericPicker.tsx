import { Button } from '@/components/ui/button';

type GenericPickerProps<T> = {
  items: readonly T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
  label: string;
  selectedKey?: string;
};

export function GenericPicker<T>({
  items,
  getKey,
  getLabel,
  onSelect,
  label,
  selectedKey,
}: GenericPickerProps<T>) {
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className="sr-only">{label}</legend>
      {items.map((item) => {
        const key = getKey(item);

        return (
          <Button
            aria-pressed={selectedKey === key}
            key={key}
            onClick={() => onSelect(item)}
            size="sm"
            type="button"
            variant={selectedKey === key ? 'default' : 'outline'}
          >
            {getLabel(item)}
          </Button>
        );
      })}
    </fieldset>
  );
}

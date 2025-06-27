"use client";
import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// Debounced Input (used for global + column text filters)
export function DebouncedInput({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
} & Omit<InputProps, "onChange">) {
  const [value, setValue] = React.useState(initialValue);
  const debounce = 500;

  const prevInitialRef = React.useRef(initialValue);

  // only set state when value actually changes
  React.useEffect(() => {
    if (prevInitialRef.current !== initialValue) {
      prevInitialRef.current = initialValue;
      setValue(initialValue);
    }
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value, onChange]);

  return (
    <Input
      variant="default"
      size="sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="mt-2"
      {...props}
    />
  );
}

export const ColumnFilter = <T extends Record<string, unknown>>({
  column,
}: {
  column: Column<T, unknown>;
}) => {
  const columnFilterValue = column.getFilterValue() as string[] | undefined;
  const filterVariant = column.columnDef.meta?.filterVariant;

  const uniqueOptions = React.useMemo(() => {
    const tempUniqueValues = Array.from(column.getFacetedUniqueValues().keys());
    return tempUniqueValues.filter((v) => typeof v === "string");
  }, [column]);
  const handleGlobalFilterChange = React.useCallback(
    (value: string | number | React.ChangeEventHandler<HTMLInputElement>) =>
      column.setFilterValue(value),
    [column]
  );
  if (filterVariant === "select") {
    const selected = new Set(columnFilterValue ?? []);

    const toggleOption = (val: string) => {
      const next = new Set(selected);
      if (next.has(val)) {
        next.delete(val);
      } else {
        next.add(val);
      }
      column.setFilterValue(Array.from(next));
    };

    const clearAll = () => column.setFilterValue(undefined);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="block py-0 justify-between bg-transparent"
          >
            {selected.size ? `${selected.size} selected` : "Filter..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-2 space-y-2">
          <ScrollArea className="max-h-40 pr-1">
            {uniqueOptions.map((option) => (
              <div key={option} className="flex items-center gap-2 py-1">
                <Checkbox
                  id={option}
                  checked={selected.has(option)}
                  className="border border-primary"
                  onCheckedChange={() => toggleOption(option)}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </ScrollArea>
          {selected.size > 0 && (
            <Button
              variant="ghost"
              size={"sm"}
              className="w-full text-xs"
              onClick={clearAll}
            >
              Clear filter
            </Button>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  // fallback for text filter
  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={handleGlobalFilterChange}
      className="m-0 py-0"
      placeholder="Filter..."
    />
  );
};

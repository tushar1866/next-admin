// components/ui/Table.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  ColumnFiltersState,
  RowSelectionState,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DebouncedInput, ColumnFilter } from "./filters";
import { TableProps } from "./types";
import { PaginationControls } from "./pagination";
import { SortAsc, SortDesc } from "lucide-react";

const createGlobalFilterFn = <T extends Record<string, unknown>>(
  excludeKeys: (keyof T)[] | undefined = []
) => {
  return (row: { original: T }, _columnId: string, filterValue: string) => {
    const search = filterValue.toLowerCase();
    const values = Object.entries(row.original)
      .filter(
        ([key, value]) =>
          !excludeKeys.includes(key) && typeof value === "string"
      )
      .map(([, value]) => (value as string).toLowerCase());

    return values.some((val) => val.includes(search));
  };
};

export function DataTable<T extends Record<string, unknown>, K extends string>(
  dataKey: K
) {
  return function TypedTable({
    columns,
    data,
    onPageChange,
    emptyText = "No data available",
    globalPlaceHolder,
    tableHeader,
    enableGlobalFilter = false,
    enableColumnFilters = false,
    enableRowSelection = false,
    selectionMode = "multiple",
    enableSorting = false,
    globalFilterExcludeKeys,
    onRowSelectionChange,
    onRowCountChange,
    onFilterChange,
  }: TableProps<T, K>) {
    const rows = data[dataKey];

    const [globalFilter, setGlobalFilter] = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const globalFilterFn = createGlobalFilterFn(globalFilterExcludeKeys);

    const table = useReactTable({
      data: rows ?? [],
      columns,
      state: {
        columnFilters,
        globalFilter,
        rowSelection,
        sorting,
      },
      onGlobalFilterChange: setGlobalFilter,
      onColumnFiltersChange: setColumnFilters,
      onSortingChange: setSorting,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      globalFilterFn,
      enableSorting,
      enableRowSelection,
    });

    useEffect(() => {
      if (selectionMode === "single") {
        const keys = Object.keys(rowSelection);
        if (keys?.length > 1) {
          const firstKey = keys[0];
          setRowSelection({ [firstKey]: true });
        }
      }
    }, [rowSelection, selectionMode]);
    useEffect(() => {
      if (onRowSelectionChange) {
        const selected = table
          .getSelectedRowModel()
          .rows.map((r) => r.original);
        onRowSelectionChange(selected);
      }
    }, [onRowSelectionChange, table]);
    useEffect(() => {
      if (onRowCountChange) {
        onRowCountChange(table.getFilteredRowModel);
      }
    }, [table, onRowCountChange]);
    const handleGlobalFilterChange = useCallback(
      (value: string) => {
        if (onFilterChange) {
          onFilterChange({
            globalFilter: value,
            columnFilters,
            sorting,
          });
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [globalFilter]
    );
    const handleColumnFiltersChange = useCallback(
      (filters: ColumnFiltersState) => {
        setColumnFilters(filters);
        if (onFilterChange) {
          onFilterChange({
            globalFilter,
            columnFilters: filters,
            sorting,
          });
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [columnFilters]
    );
    const handleSortingChange = useCallback(
      (newSorting: SortingState) => {
        if (onFilterChange) {
          onFilterChange({
            globalFilter,
            columnFilters,
            sorting: newSorting,
          });
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [sorting]
    );
    useEffect(() => {
      handleColumnFiltersChange(columnFilters);
    }, [columnFilters, handleColumnFiltersChange]);

    useEffect(() => {
      handleGlobalFilterChange(globalFilter);
    }, [globalFilter, handleGlobalFilterChange]);

    useEffect(() => {
      handleSortingChange(sorting);
    }, [sorting, handleSortingChange]);

    return (
      <div className="space-y-4">
        {
          <div className="flex justify-between items-center">
            {enableGlobalFilter && (
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(v) => {
                  setGlobalFilter(v.toString());
                }}
                type="text"
                className="w-64"
                placeholder={globalPlaceHolder ?? "Search..."}
              />
            )}
            {tableHeader}
          </div>
        }

        <div className="rounded-md border overflow-x-auto">
          <ShadcnTable>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-left p-2 align-top"
                    >
                      <div className="max-w-fit flex flex-col items-start gap-1">
                        {header.isPlaceholder ? null : (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="cursor-pointer select-none flex items-center gap-1 text-sm"
                          >
                            {header.column.columnDef.header as React.ReactNode}
                            {header.column.getIsSorted() === "asc" && (
                              <SortAsc size={14} />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <SortDesc size={14} />
                            )}
                          </button>
                        )}
                        {enableColumnFilters &&
                          header.column.getCanFilter() && (
                            <ColumnFilter column={header.column} />
                          )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowCount() === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns?.length} className="text-center">
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </ShadcnTable>
          <PaginationControls
            limit={data.limit}
            skip={data.skip}
            total={data.total}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    );
  };
}
export default DataTable;

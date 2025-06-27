// components/ui/Table.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  ColumnFiltersState,
  RowSelectionState,
  flexRender,
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

    const globalFilterFn = createGlobalFilterFn(globalFilterExcludeKeys);

    const table = useReactTable({
      data: rows ?? [],
      columns,
      state: {
        columnFilters,
        globalFilter,
        rowSelection,
      },
      onGlobalFilterChange: setGlobalFilter,
      onColumnFiltersChange: setColumnFilters,
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

    useEffect(() => {
      if (onFilterChange) {
        onFilterChange({ globalFilter, columnFilters });
      }
    }, [onFilterChange, globalFilter, columnFilters]);

    return (
      <div className="space-y-4">
        {tableHeader && (
          <div className="flex justify-between items-center">
            {enableGlobalFilter && (
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(v) => setGlobalFilter(String(v))}
                type="text"
                className="w-64"
                placeholder={globalPlaceHolder ?? "Search..."}
              />
            )}
            {tableHeader}
          </div>
        )}

        <div className="rounded-md border overflow-x-auto">
          <ShadcnTable className="table-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-left p-2">
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="cursor-pointer select-none"
                        >
                          {header.column.columnDef.header as React.ReactNode}
                          {header.column.getIsSorted() === "asc" && " 🔼"}
                          {header.column.getIsSorted() === "desc" && " 🔽"}
                        </button>
                      )}
                      {enableColumnFilters && header.column.getCanFilter() && (
                        <ColumnFilter column={header.column} />
                      )}
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
        </div>

        {/* Pagination */}
        <PaginationControls
          limit={data.limit}
          skip={data.skip}
          total={data.total}
          onPageChange={onPageChange}
        />
      </div>
    );
  };
}
export default DataTable;

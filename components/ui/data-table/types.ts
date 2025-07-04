import {
  ColumnDef,
  ColumnFiltersState,
  RowModel,
  SortingState,
} from "@tanstack/react-table";
import { JSX } from "react";

declare module "@tanstack/react-table" {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface ColumnMeta<TData, TValue> {
    /* eslint-enable */
    filterVariant?: "text" | "range" | "select";
    autoComplete?: boolean;
    options?: Array<string>;
  }
}

export type PaginationT = {
  total: number;
  skip: number;
  limit: number;
  page: number;
};
export type FilterState = {
  q?: string;
  sortBy?: string;
  select?: string;
  order?: "asc" | "desc";
};
export type TableData<T, K extends string = "results"> = {
  [key in K]: Array<T>;
} & Omit<PaginationT, "page">;

export type TableProps<T, K extends string = "results"> = {
  columns: ColumnDef<T, unknown>[];
  data: TableData<T, K>;
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  enableRowSelection?: boolean;
  selectionMode?: "single" | "multiple";
  globalPlaceHolder?: string;
  tableHeader?: JSX.Element;
  emptyText?: string;
  globalFilterExcludeKeys?: (keyof T)[];
  renderSelection?: ColumnDef<T, unknown>;
  onPageChange: (pagination: Pick<PaginationT, "limit" | "skip">) => void;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  onFilterChange?: (filters: {
    globalFilter: string;
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
  }) => void;
  onRowCountChange?: (row: () => RowModel<T>) => void;
};

export type TableRefProps = {
  globalFilter: string;
};

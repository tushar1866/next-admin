// components/ui/table/pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PaginationT } from "./types";
import { useMemo } from "react";

type PaginationControlsProps = Omit<PaginationT, "page"> & {
  readonly onPageChange: (
    pagination: Pick<PaginationT, "limit" | "skip">
  ) => Promise<void>;
};

export function PaginationControls(props: PaginationControlsProps) {
  const { onPageChange } = props;
  const { total, skip, limit } = useMemo(() => {
    return props;
  }, [props]);
  const page = useMemo(() => Math.floor(skip / limit) + 1, [skip, limit]);
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const handlePageChange = async (newPage: number) => {
    const newSkip = (newPage - 1) * limit;
    await onPageChange({
      skip: newSkip,
      limit: limit,
    });
  };

  const handleRowsPerPageChange = async (newLimit: number) => {
    const newSkip = (page - 1) * newLimit;
    await onPageChange({
      skip: newSkip,
      limit: newLimit,
    });
  };
  return (
    <div className="flex items-center justify-between gap-4 p-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows:</span>
        <Select
          value={String(limit)}
          onValueChange={(val) => handleRowsPerPageChange(Number(val))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

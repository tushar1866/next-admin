"use client";
import { useCallback, useState } from "react";
import { FilterState, PaginationT } from "@/components/ui/data-table/types";

function useQueryParams() {
  const [pagination, setPagination] = useState<
    Omit<PaginationT, "page" | "total">
  >({
    skip: 0,
    limit: 10,
  });
  const [filterState, setFilterState] = useState<FilterState>();
  const paginate = useCallback(
    async (newPagination: Pick<PaginationT, "limit" | "skip">) => {
      setPagination(newPagination);
    },
    []
  );
  const next = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }));
  }, []);

  const reset = useCallback(() => {
    setPagination({ skip: 0, limit: pagination.limit });
  }, [pagination.limit]);
  const filter = useCallback((state: FilterState) => {
    setPagination((prev) => ({ ...prev, skip: 0 }));
    setFilterState(state);
  }, []);
  return { pagination, paginate, filterState, filter, next, reset };
}

export default useQueryParams;

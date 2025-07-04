"use client";
import { useCallback, useState } from "react";
import { FilterState, PaginationT } from "@/components/ui/data-table/types";
type QueryParam = FilterState & Pick<PaginationT, "limit" | "skip">;
function useQueryParams(init?: QueryParam) {
  const [queryParams, setQueryParams] = useState<QueryParam>(
    init ?? {
      limit: 10,
      skip: 0,
    }
  );

  const paginate = useCallback(
    (newPagination: Pick<PaginationT, "limit" | "skip">) => {
      setQueryParams((prev) => ({ ...prev, ...newPagination }));
    },
    []
  );

  const next = useCallback(() => {
    setQueryParams((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }));
  }, []);

  const reset = useCallback(() => {
    setQueryParams({ skip: 0, limit: 10 });
  }, []);

  const filter = useCallback((state: FilterState) => {
    setQueryParams((prev) => ({ ...prev, ...state }));
  }, []);

  return { queryParams, paginate, filter, next, reset, setQueryParams };
}

export default useQueryParams;

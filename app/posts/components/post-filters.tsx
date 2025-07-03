"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FilterState } from "@/components/ui/data-table/types";
import { usePosts } from "./post-hooks";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/components/providers/hooks/use-debounce";

export function PostFilters() {
  const { filter, reset } = usePosts();
  const [state, setState] = useState<FilterState>({
    q: "",
    sortBy: "",
    order: "desc",
  });

  const debouncedQ = useDebounce(state.q, 500);

  useEffect(() => {
    filter({ ...state, q: debouncedQ });
  }, [debouncedQ, state.sortBy, state.order, filter, state]);

  const handleClear = () => {
    setState({ q: "", sortBy: "", order: "desc" });
    filter({});
    reset(); // optional: go to first page
  };

  return (
    <div className="flex flex-wrap items-end gap-4 py-4 bg-background/50">
      <div className="space-y-1">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          placeholder="Search posts..."
          value={state.q}
          onChange={(e) => setState((prev) => ({ ...prev, q: e.target.value }))}
          className="w-[200px]"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={state.sortBy}
          onValueChange={(value) =>
            setState((prev) => ({ ...prev, sortBy: value }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="views">Views</SelectItem>
            <SelectItem value="likes">Likes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="order">Order</Label>
        <Select
          value={state.order}
          onValueChange={(value) =>
            setState((prev) => ({ ...prev, order: value as "asc" | "desc" }))
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="mt-4" onClick={handleClear}>
        <X className="w-4 h-4 mr-2" />
        Clear
      </Button>
    </div>
  );
}

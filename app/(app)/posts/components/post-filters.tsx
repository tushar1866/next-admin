"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FilterState, PaginationT } from "@/components/ui/data-table/types";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DebouncedInput } from "@/components/ui/data-table/filters";
type QueryParam = FilterState & Omit<PaginationT, "page" | "total">;
export function PostFilters({
  queryParams,
  onChange,
}: {
  readonly queryParams: QueryParam;
  readonly onChange: React.Dispatch<React.SetStateAction<QueryParam>>;
}) {
  const handleClear = () => {
    onChange({ limit: 9, skip: 0, order: "asc" });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 py-4 bg-background/50">
      <div className="space-y-1">
        <Label htmlFor="q">Search</Label>
        <DebouncedInput
          id="q"
          placeholder="Search posts..."
          value={queryParams?.q ?? ""}
          onChange={(e) => onChange((prev) => ({ ...prev, q: String(e) }))}
          className="w-[200px]"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={queryParams.sortBy}
          onValueChange={(value) =>
            onChange((prev) => ({ ...prev, sortBy: value }))
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
          value={queryParams.order}
          onValueChange={(value) =>
            onChange((prev) => ({ ...prev, order: value as "asc" | "desc" }))
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

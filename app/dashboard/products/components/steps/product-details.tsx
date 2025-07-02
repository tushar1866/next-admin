"use client";

import { useFormContext } from "react-hook-form";
import { Product } from "@/lib/validations/product";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProductDetailsFormStep() {
  const form = useFormContext<Product>();
  const [tagInput, setTagInput] = useState("");

  const tags = form.watch("tags") ?? [];

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      form.setValue("tags", [...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const updated = tags.filter((t) => t !== tag);
    form.setValue("tags", updated);
  };

  return (
    <div className="space-y-4 grid grid-cols-1">
      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SKU</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Stock keeping unit" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight (kg)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-3 col-span-1 gap-2">
        <FormField
          control={form.control}
          name="dimensions.width"
          render={({ field }) => (
            <FormItem className="grid-cols-1 col-span-1">
              <FormLabel>Width (cm)</FormLabel>
              <FormControl className="col-span-1">
                <Input type="number" step="0.01" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dimensions.height"
          render={({ field }) => (
            <FormItem className="grid-cols-1 col-span-1">
              <FormLabel>Height (cm)</FormLabel>
              <FormControl className="col-span-1">
                <Input type="number" step="0.01" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dimensions.depth"
          render={({ field }) => (
            <FormItem className="grid-cols-1 col-span-1">
              <FormLabel>Depth (cm)</FormLabel>
              <FormControl className="col-span-1">
                <Input type="number" step="0.01" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="availabilityStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Availability Status</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. In Stock, Low Stock, Out of Stock"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minimumOrderQuantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum Order Quantity</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tags */}
      <div className="space-y-2">
        <FormLabel>Tags</FormLabel>
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag}>
            Add
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                className="ml-1 text-xs text-red-500"
                onClick={() => removeTag(tag)}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

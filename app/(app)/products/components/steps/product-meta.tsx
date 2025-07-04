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
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProductMetaFormStep() {
  const form = useFormContext<Product>();
  const [imageInput, setImageInput] = useState("");
  const images = form.watch("images") ?? [];

  const addImage = () => {
    if (imageInput && !images.includes(imageInput)) {
      form.setValue("images", [...images, imageInput]);
      setImageInput("");
    }
  };

  const removeImage = (url: string) => {
    form.setValue(
      "images",
      images.filter((img) => img !== url)
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="meta.barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. 1234567890" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meta.qrCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>QR Code (URL)</FormLabel>
              <FormControl>
                <Input type="url" {...field} placeholder="Optional" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Image list */}
      <div>
        <FormLabel>Images</FormLabel>
        <div className="flex gap-2 mt-1">
          <Input
            placeholder="Add image URL"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImage();
              }
            }}
          />
          <Button type="button" onClick={addImage}>
            Add
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {images.map((url, idx) => (
            <div key={idx + 1} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`${idx + 1}-Image`}
                className="w-20 h-20 object-cover border rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-0 right-0 text-xs text-red-500 bg-white rounded-full px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

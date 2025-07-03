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
import { Textarea } from "@/components/ui/textarea";

export default function ProductPolicyFormStep() {
  const form = useFormContext<Product>();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="warrantyInformation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Warranty Information</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={3}
                placeholder="e.g. 6 months manufacturer warranty"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shippingInformation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipping Information</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={3}
                placeholder="e.g. Ships within 3-5 business days"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="returnPolicy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Return Policy</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={3}
                placeholder="e.g. 30 days return policy"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

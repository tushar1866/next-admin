"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  Product,
  productDefaultValues,
} from "@/lib/validations/product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useCreateProduct, useUpdateProduct } from "./product-hooks";

import ProductBasicFormStep from "./steps/basic-details";
import ProductDetailsFormStep from "./steps/product-details";
import ProductPolicyFormStep from "./steps/policy-details";
import ProductMetaFormStep from "./steps/product-meta";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps = [
  {
    label: "Basic Info",
    Component: ProductBasicFormStep,
  },
  {
    label: "Details",
    Component: ProductDetailsFormStep,
  },
  {
    label: "Policies",
    Component: ProductPolicyFormStep,
  },
  {
    label: "Meta",
    Component: ProductMetaFormStep,
  },
];

interface MultiStepProductFormProps {
  readonly defaultValues?: Product;
  readonly productId?: number;
  readonly onClose: () => void;
}

export default function MultiStepProductForm({
  defaultValues,
  productId,
  onClose,
}: MultiStepProductFormProps) {
  const [step, setStep] = useState(0);
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? productDefaultValues,
    mode: "onBlur",
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;

  useEffect(() => {
    if (defaultValues) form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const onSubmit = async (values: Product) => {
    if (productId) {
      updateProduct.mutate(
        { id: productId, data: values },
        { onSuccess: onClose }
      );
    } else {
      createProduct.mutate(values, { onSuccess: onClose });
    }
  };

  // const onPartialSave = () => {
  //   const values = form.getValues();
  //   if (productId) {
  //     updateProduct.mutate({ id: productId, data: values });
  //   } else {
  //     createProduct.mutate(values);
  //   }
  // };

  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const onNext = async () => {
    if (isLastStep) {
      form.handleSubmit(onSubmit);
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const StepComponent = steps[step].Component;

  const submitlabel = productId ? "Update Product" : "Create Product";
  return (
    <FormProvider {...form}>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl font-semibold">{steps[step].label}</h2>
        <div className="text-sm text-muted-foreground">
          Step {step + 1} of {steps.length}
        </div>
      </div>

      {/* Stepper UI */}
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, idx) => (
          <div
            key={s.label}
            className={`flex-1 text-center text-sm font-semibold border-b-2 pb-1 transition-all duration-200 cursor-pointer ${
              idx === step
                ? "border-primary text-primary"
                : "text-muted-foreground/60 border-muted"
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>
      <ScrollArea className="w-full h-[75vh] px-4 pb-2 pt-1 space-y-6">
        <form
          className="grid grid-cols-1 space-y-6"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <StepComponent />

          <DialogFooter className="sticky bottom-0 bg-background flex justify-between gap-2">
            {!isFirstStep && (
              <Button type="button" variant="outline" onClick={onBack}>
                Previous
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              {isLastStep ? (
                <Button
                  type="submit"
                  disabled={createProduct.isPending || updateProduct.isPending}
                >
                  {submitlabel}
                </Button>
              ) : (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="text-white opacity-30"
                        // onClick={onPartialSave}
                        // disabled={
                        //   createProduct.isPending || updateProduct.isPending
                        // }
                      >
                        Save
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent variant={"info"} side="top">
                      <p className="font-semibold">Coming soon...</p>
                    </TooltipContent>
                  </Tooltip>

                  <Button
                    type="button"
                    onClick={onNext}
                    disabled={
                      createProduct.isPending || updateProduct.isPending
                    }
                  >
                    Next
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </form>
      </ScrollArea>
    </FormProvider>
  );
}

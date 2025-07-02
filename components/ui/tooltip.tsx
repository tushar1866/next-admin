"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Tooltip Provider
function TooltipProvider({
  delayDuration = 0,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Provider>>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

// Root Tooltip
function Tooltip({
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Root>>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root {...props} />
    </TooltipProvider>
  );
}

// Trigger
function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>
) {
  return <TooltipPrimitive.Trigger {...props} />;
}

// Tooltip content variants
const tooltipVariants = cva(
  "text-xs text-balance rounded-md px-3 py-1.5 w-fit z-50 relative animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        success: "bg-green-600 text-white",
        info: "bg-blue-600 text-white",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TooltipContentProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

function TooltipContent({
  className,
  sideOffset = 8,
  children,
  variant,
  side = "top",
  align = "center",
  ...props
}: TooltipContentProps & {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}) {
  const arrowPosition = {
    top: "absolute -bottom-1.5 left-1/2 -translate-x-1/2", // tail below box, pointing up
    bottom: "absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-180", // tail above box, pointing down
    left: "absolute -right-1.5 top-1/2 -translate-y-1/2 -rotate-90", // tail right of box, pointing left
    right: "absolute -left-1.5 top-1/2 -translate-y-1/2 rotate-90", // tail left of box, pointing right
  };

  const sidePadding = {
    top: "pb-2", // arrow on bottom
    bottom: "pt-2", // arrow on top
    left: "pr-2", // arrow on right
    right: "pl-2", // arrow on left
  };

  const arrowFillClass = {
    default: "fill-primary",
    destructive: "fill-destructive",
    success: "fill-green-600",
    info: "fill-blue-600",
    muted: "fill-muted",
  };

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          tooltipVariants({ variant }),
          sidePadding[side],
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          {
            top: "data-[side=top]:slide-in-from-bottom-2",
            bottom: "data-[side=bottom]:slide-in-from-top-2",
            left: "data-[side=left]:slide-in-from-right-2",
            right: "data-[side=right]:slide-in-from-left-2",
          }[side],
          "relative z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {/* Arrow */}
        <svg
          className={cn(
            "z-40",
            arrowPosition[side],
            arrowFillClass[variant ?? "default"]
          )}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0L5 6L10 0H0Z" />
        </svg>

        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

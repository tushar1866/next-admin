import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

const inputVariants = cva(
  "flex items-center rounded-md bg-transparent shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border",
  {
    variants: {
      variant: {
        default:
          "border-input focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        borderless: "border-0 focus-within:ring-0 focus-within:outline-none",
      },
      size: {
        default: "h-9 text-sm px-3",
        sm: "h-8 text-sm px-2",
        lg: "h-11 text-base px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> &
  VariantProps<typeof inputVariants> & {
    prefix?: React.ReactNode;
    postfix?: React.ReactNode;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, postfix, variant, size, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className={cn(inputVariants({ variant, size }), className)}>
        {prefix && (
          <span className="mr-2 flex-shrink-0 text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={show ? "text" : type}
          className="flex-1 bg-transparent outline-none border-0 focus:outline-none"
          {...props}
        />
        {type === "password" ? (
          <Button
            type="button"
            variant={"ghost"}
            className="px-0 has-[>svg]:p-0 h-fit hover:bg-primary"
            onClick={() =>
              setShow((prev) => {
                return !prev;
              })
            }
          >
            {show ? <EyeOff /> : <Eye />}
          </Button>
        ) : (
          <></>
        )}
        {postfix && (
          <span className="ml-2 flex-shrink-0 text-muted-foreground">
            {postfix}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };

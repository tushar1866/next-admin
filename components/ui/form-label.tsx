import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function FormLabel({ children, ...props }: LabelProps) {
  return (
    <label
      className="block text-sm font-medium text-muted-foreground mb-1"
      {...props}
    >
      {children}
    </label>
  );
}

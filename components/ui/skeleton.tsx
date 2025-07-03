import { cn } from "@/lib/utils"; // if you're using `clsx` or `classnames`, adjust accordingly

export function Skeleton({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

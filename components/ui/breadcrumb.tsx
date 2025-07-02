import * as React from "react";
import Link from "next/link";

export function Breadcrumb({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center text-sm" aria-label="Breadcrumb">
      {children}
    </nav>
  );
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center">{children}</div>;
}

export function BreadcrumbLink({
  href,
  isCurrentPage,
  children,
}: {
  href: string;
  isCurrentPage?: boolean;
  children: React.ReactNode;
}) {
  if (isCurrentPage) {
    return <span className="font-semibold text-primary">{children}</span>;
  }
  return (
    <Link href={href} className="text-muted-foreground hover:underline">
      {children}
    </Link>
  );
}

export function BreadcrumbSeparator() {
  return <span className="mx-2 text-muted-foreground">/</span>;
}

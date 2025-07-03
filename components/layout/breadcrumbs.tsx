import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";

function toTitle(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbItem key="home">
        {segments.length > 0 && <HomeIcon size={14} className="mx-2" />}
      </BreadcrumbItem>
      {segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;
        return (
          <BreadcrumbItem key={href}>
            <BreadcrumbLink href={href} isCurrentPage={isLast}>
              {toTitle(seg)}
            </BreadcrumbLink>
            {!isLast && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

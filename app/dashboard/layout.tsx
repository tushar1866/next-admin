import { LayoutProvider } from "@/components/layout/layout-provider";

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function LayoutProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

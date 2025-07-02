import ThemeChanger from "@/components/layout/theme-changer";
import React, { ReactNode } from "react";

function AuthLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {children}
      <div className="absolute top-4 left-4">
        <ThemeChanger />
      </div>
    </div>
  );
}

export default AuthLayout;

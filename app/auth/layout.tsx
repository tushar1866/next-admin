import React, { ReactNode } from "react";

function AuthLayout({ children }: { readonly children: ReactNode }) {
  return <div className="w-screen h-screen overflow-x-hidden">{children}</div>;
}

export default AuthLayout;

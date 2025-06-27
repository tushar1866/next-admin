import React, { ReactNode } from "react";
import useRoute from "./hooks/use-route";
import Loader from "../ui/loader";

function SuspenseProvider({ children }: { readonly children: ReactNode }) {
  const { isPending } = useRoute();
  if (isPending) return <Loader />;
  return children;
}

export default SuspenseProvider;

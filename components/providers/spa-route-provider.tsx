"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { matchRoute } from "@/lib/utils";

export type RouteComponent<TParams extends Record<string, string | number>> =
  React.ComponentType<{
    params: TParams;
    navigate: (to: string) => void;
  }>;

const RouteContext = createContext<{
  params: Record<string, string | number> | null;
  navigate: (to: string) => void;
} | null>(null);

export function useSPARoute() {
  const ctx = useContext(RouteContext);
  if (!ctx)
    throw new Error("useSPARoute must be used inside RouteContext.Provider");
  return ctx;
}

const NotFound = () => <h1>404 Not Found</h1>;

// 🔧 Main HOC
export function withRouteHandler<
  TParams extends Record<string, string | number> = Record<string, string>
>(routes: { path: string; component: RouteComponent<TParams> }[]) {
  return function Wrapper() {
    const [params, setParams] = useState<TParams | null>(null);
    const [MatchedComponent, setMatchedComponent] =
      useState<RouteComponent<TParams> | null>(null);

    const handleRoute = () => {
      const pathname = window.location.pathname;
      for (const route of routes) {
        const match = matchRoute(pathname, route.path);
        if (match) {
          setMatchedComponent(() => route.component);
          setParams(match as TParams);
          return;
        }
      }

      setMatchedComponent(() => NotFound as RouteComponent<TParams>);
      setParams({} as TParams);
    };

    useEffect(() => {
      if (typeof window === "undefined") return;
      handleRoute();
      window.addEventListener("popstate", handleRoute);
      return () => window.removeEventListener("popstate", handleRoute);
    }, []);

    const navigate = useCallback((to: string) => {
      window.history.pushState({}, "", to);
      handleRoute();
    }, []);

    const value = useMemo(() => ({ params, navigate }), [params, navigate]);

    if (!MatchedComponent || params === null) return <p>Loading...</p>;

    return (
      <RouteContext.Provider value={value}>
        <MatchedComponent params={params} navigate={navigate} />
      </RouteContext.Provider>
    );
  };
}

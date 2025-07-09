"use client";

import PostPage from "./page";
import PostByIdPage from "./id/post-by-id";
import { withRouteHandler } from "@/components/providers/spa-route-provider";

const routes = [
  { path: "/posts", component: PostPage },
  { path: "/posts/:id", component: PostByIdPage },
];

const SPAShell = withRouteHandler(routes);

export default function UsersLayout() {
  return <SPAShell />;
}

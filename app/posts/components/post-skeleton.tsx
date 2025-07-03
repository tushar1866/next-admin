import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function PostSkeleton() {
  return (
    <div className="flex flex-col space-y-3 border p-2 rounded overflow-hidden">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
      <div className="flex items-center justify-around border-b pb-4">
        <Skeleton className="h-4 w-10 rounded-xl" />
        <Skeleton className="h-4 w-10 rounded-xl" />
        <Skeleton className="h-4 w-10 rounded-xl" />
      </div>
      <div className="flex items-center justify-start gap-2">
        <Skeleton className="h-6 w-10 rounded-xl" />
        <Skeleton className="h-6 w-10 rounded-xl" />
      </div>
    </div>
  );
}

export default PostSkeleton;

"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollWrapperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isFetching: boolean;
  hasMore?: boolean;
  fetchNext: () => void;
  skeletonCount?: number;
  renderSkeleton?: () => React.ReactNode;
  className?: string;
  gridClassName?: string;
}

export function InfiniteScrollWrapper<T>({
  items,
  renderItem,
  isFetching,
  fetchNext,
  hasMore = true,
  skeletonCount = 6,
  renderSkeleton,
  className = "",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
}: Readonly<InfiniteScrollWrapperProps<T>>) {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      fetchNext();
    }
  }, [inView, hasMore, isFetching, fetchNext]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className={gridClassName}>
        {items.map((item, index) => renderItem(item, index))}
        {isFetching &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <React.Fragment key={`skeleton-${i + 1}`}>
              {renderSkeleton?.()}
            </React.Fragment>
          ))}
      </div>

      <div ref={ref} className="h-10" />
    </div>
  );
}

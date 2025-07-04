"use client";

import React from "react";
import { PostCard } from "./components/post-card";
import { InfiniteScrollWrapper } from "@/components/ui/infinite-scroll-wrapper";
import PostSkeleton from "./components/post-skeleton";
import { PostFilters } from "./components/post-filters";
import { usePosts } from "./components/post-hooks";

export default function PostsPage() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
    queryParams,
    setQueryParams,
  } = usePosts();
  const posts = data?.pages?.flatMap((page) => page.posts) ?? [];
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <PostSkeleton key={i + 1} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error.message}</p>;
  }

  return (
    <>
      <PostFilters {...{ queryParams, onChange: setQueryParams }} />
      <InfiniteScrollWrapper
        items={posts}
        renderItem={(post) => <PostCard key={post.id} post={post} />}
        fetchNext={fetchNextPage}
        isFetching={isFetchingNextPage}
        skeletonCount={4}
        renderSkeleton={PostSkeleton}
      />
    </>
  );
}

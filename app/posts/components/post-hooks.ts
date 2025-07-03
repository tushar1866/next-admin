import { useInfiniteQuery } from "@tanstack/react-query";
import { ListPostsAPI } from "@/lib/apis/services";
import type { Post } from "@/types/post";
import { TableData } from "@/components/ui/data-table/types";
import useQueryParams from "@/components/providers/hooks/use-query-params";

type PostTableData = TableData<Post, "posts">;

export const usePosts = () => {
  const { filter, filterState, pagination, reset } = useQueryParams();

  const queryKey = [
    "posts",
    filterState?.q ?? "",
    filterState?.sortBy ?? "",
    filterState?.order ?? "",
    filterState?.select ?? "",
  ];

  const query = useInfiniteQuery<PostTableData, Error>({
    queryKey,
    queryFn: ({ pageParam = 0 }) =>
      ListPostsAPI({
        skip: pageParam as number,
        limit: pagination.limit,
        ...filterState,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (acc, page) => acc + page.posts.length,
        0
      );
      if (lastPage.posts.length < pagination.limit) return undefined;
      return loadedCount;
    },
  });

  const allPosts = query.data?.pages.flatMap((page) => page.posts) ?? [];

  return {
    ...query,
    posts: allPosts,
    fetchNext: query.fetchNextPage,
    filter,
    reset,
  };
};

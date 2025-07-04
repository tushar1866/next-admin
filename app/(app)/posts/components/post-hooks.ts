import { useInfiniteQuery } from "@tanstack/react-query";
import { ListPostsAPI } from "@/lib/apis/services";
import type { Post } from "@/types/post";
import { TableData } from "@/components/ui/data-table/types";
import useQueryParams from "@/components/providers/hooks/use-query-params";

type PostTableData = TableData<Post, "posts">;

export const usePosts = () => {
  const { setQueryParams, queryParams } = useQueryParams({
    limit: 9,
    skip: 0,
    order: "asc",
  });

  const queryKey = [
    "posts",
    queryParams.q,
    queryParams.order,
    queryParams.sortBy,
  ];

  const query = useInfiniteQuery<PostTableData, Error>({
    queryKey,
    queryFn: ({ pageParam }) =>
      ListPostsAPI({ ...queryParams, skip: pageParam as number }),
    initialData: {
      pageParams: [null],
      pages: [],
    },
    getNextPageParam: (lastPage) => {
      const newSkip = lastPage.skip + lastPage.limit;
      return newSkip;
    },
    initialPageParam: queryParams.skip,
  });

  return {
    ...query,
    queryParams,
    setQueryParams,
  };
};

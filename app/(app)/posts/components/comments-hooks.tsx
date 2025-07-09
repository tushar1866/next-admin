import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { CreateComment, ListCommentsByPost } from "@/lib/apis/services";
import { TableData } from "@/components/ui/data-table/types";
import { Comment } from "@/types/post";
import useQueryParams from "@/components/providers/hooks/use-query-params";

type CommentResponse = TableData<Comment, "comments">;

export function useComments(postId: number) {
  const { setQueryParams, queryParams } = useQueryParams({
    limit: 10,
    skip: 0,
    order: "asc",
  });

  const queryKey = [
    "comments",
    postId,
    queryParams.q,
    queryParams.order,
    queryParams.sortBy,
  ];
  const query = useInfiniteQuery<CommentResponse>({
    queryKey,
    queryFn: ({ pageParam }) =>
      ListCommentsByPost(postId, { ...queryParams, skip: pageParam as number }),
    initialData: {
      pageParams: [0],
      pages: [],
    },
    initialPageParam: queryParams.skip ?? 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.total < lastPage.skip) {
        const newSkip = lastPage.skip + lastPage.limit;
        return newSkip;
      }
      return undefined;
    },
  });

  return { ...query, queryParams, setQueryParams };
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { postId: number; body: string; userId: number }) =>
      CreateComment(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["comments"] as QueryKey,
      });
    },
  });
}

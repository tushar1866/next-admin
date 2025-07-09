"use client";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreatePost,
  DeletePost,
  GetPostAPI,
  ListPostsAPI,
  UpdatePost,
} from "@/lib/apis/services";
import type { Post } from "@/types/post";
import { TableData } from "@/components/ui/data-table/types";
import useQueryParams from "@/components/providers/hooks/use-query-params";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";

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
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
  });

  return {
    ...query,
    queryParams,
    setQueryParams,
  };
};

export function usePost(id: number) {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => GetPostAPI(Number(id)),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Post>) => CreatePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showSuccessToast("Post created!");
    },
    onError: () => {
      showErrorToast("Failed to create post.");
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Post> }) =>
      UpdatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showSuccessToast("Post updated!");
    },
    onError: () => {
      showErrorToast("Failed to update post.");
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => DeletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showSuccessToast("Post deleted!");
    },
    onError: () => {
      showErrorToast("Failed to delete post.");
    },
  });
}

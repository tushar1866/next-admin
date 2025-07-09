"use client";

import { usePost } from "../components/post-hooks";
import { useComments, useAddComment } from "../components/comments-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "@/store/auth";

const CommentSchema = z.object({
  body: z.string().min(1, "Comment is required"),
});

type CommentFormValues = z.infer<typeof CommentSchema>;

export default function PostDetailPage({
  params,
}: {
  readonly params: { id: string };
}) {
  const postId = Number(params.id);
  const { user } = useAuthStore();
  const { data: post } = usePost(postId);
  const { data, fetchNextPage, isFetchingNextPage, refetch, hasNextPage } =
    useComments(postId);

  const comments = useMemo(() => {
    return data?.pages.flatMap((page) => page.comments) ?? [];
  }, [data]);

  const addComment = useAddComment();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: { body: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (!user) return;
    addComment.mutate({ postId, body: values.body, userId: user.id });
    form.reset();
  });

  useEffect(() => {
    refetch();
  }, [postId, refetch]);

  if (!post) {
    return <div className="text-2xl text-center">Post Not Found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Post Header & Content */}
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((t) => (
          <Badge key={t}>#{t}</Badge>
        ))}
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-6 mt-6 text-muted-foreground">
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} className="text-green-500" />{" "}
            {post.reactions.likes}
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown size={16} className="text-red-500" />{" "}
            {post.reactions.dislikes}
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} /> {post.views}
          </div>
        </div>
      </div>
      <div className="border-b my-4" />
      {/* Comments Section */}
      <section className="mt-6 space-y-2">
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Comments</h2>
            <Button type="submit" disabled={addComment.isPending}>
              {addComment.isPending ? "Submitting..." : "Post"}
            </Button>
          </div>
          <Textarea placeholder="Add a comment..." {...form.register("body")} />
          <p className="text-sm text-red-500">
            {form.formState.errors.body?.message}
          </p>
        </form>
        <div className="border-b my-4" />
        {comments.map((c) => (
          <div key={c.id} className="p-1 bg-background rounded">
            <p className="text-base">{c.body}</p>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="font-semibold">
                {c.user.fullName ?? c.user.username}
              </span>
              <span>
                <strong>{c.likes}</strong> likes
              </span>
            </div>
          </div>
        ))}

        {hasNextPage && (
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading…" : "Load more"}
          </Button>
        )}
      </section>
    </div>
  );
}

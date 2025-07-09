"use client";

import { Post } from "@/types/post";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, ThumbsDown, Trash2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useDeletePost } from "./post-hooks";
import { toast } from "sonner";
import useAlert from "@/components/providers/alert-provider";
import { Button } from "@/components/ui/button";
import { useSPARoute } from "@/components/providers/spa-route-provider";

export function PostCard({ post }: { readonly post: Post }) {
  const router = useSPARoute();
  const { confirm } = useAlert();
  const deletePost = useDeletePost();

  const handleDelete = () => {
    confirm({
      title: "Delete Post",
      description: "Are you sure you want to delete this post?",
      action: "Delete",
      async onAction() {
        try {
          await deletePost.mutateAsync(post.id);
        } catch {
          toast.error("Failed to delete post");
        }
      },
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full relative overflow-hidden">
        <CardContent className="flex flex-col justify-between h-full px-4 py-1 space-y-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-base line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-5">
              {post.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge variant="default" key={tag}>
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="w-full flex flex-wrap justify-between items-center text-muted-foreground text-xs pt-2 border-t gap-2">
            <div className="flex items-end justify-between space-x-4 font-semibold w-full">
              <span className="flex flex-col text-center items-center ">
                <ThumbsUp size={18} className="text-green-500" />
                {Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumSignificantDigits: 3,
                }).format(post.reactions.likes)}
              </span>
              <span className="flex flex-col text-center items-center ">
                <ThumbsDown size={18} className="text-red-500" />
                {Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumSignificantDigits: 3,
                }).format(post.reactions.dislikes)}
              </span>
              <span className="flex flex-col text-center items-center ">
                <Eye size={18} />
                {Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumSignificantDigits: 3,
                }).format(post.views)}
              </span>
            </div>

            <div className="flex w-full justify-between items-center gap-2">
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash2 />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.navigate(`/posts/${post.id}`)}
              >
                <ExternalLink size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

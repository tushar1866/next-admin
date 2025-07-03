import { Post } from "@/types/post";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";

export function PostCard({ post }: { readonly post: Post }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="flex flex-col justify-between h-full">
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {post.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge variant="outline" key={tag}>
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center text-muted-foreground text-xs pt-2 border-t">
            <span className="flex items-center gap-2">
              <ThumbsUp size={14} className="text-green-500" />
              {post.reactions.likes}
              <ThumbsDown size={14} className="text-red-500 ml-2" />
              {post.reactions.dislikes}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {post.views}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

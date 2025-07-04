import { create, StateCreator } from "zustand";
import { Post } from "@/types/post";
interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}
const postSlice: StateCreator<PostStore, [], [], PostStore> = (set) => ({
  posts: [],
  setPosts: (posts) =>
    set((state) => {
      return { ...state, posts };
    }),
});

export const usePostStore = create<PostStore>((...a) => ({
  ...postSlice(...a),
}));

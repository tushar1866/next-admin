import { SignInFormValues, SignUpFormValues } from "../validations/auth";
import api from "./axios";
import { UserFormValues } from "../validations/user";
import { Product } from "../validations/product";
import type { Post } from "@/types/post";
import { FilterState, PaginationT } from "@/components/ui/data-table/types";

export const SignInAPI = async (data: SignInFormValues) => {
  const res = await api.post("/auth/login", { ...data, expiresInMins: 60 });
  const { accessToken, refreshToken, ...user } = res.data;
  return { user, accessToken, refreshToken };
};

export const SignUpAPI = async (data: SignUpFormValues) => {
  const res = await api.post("/users/add", data);
  return { user: res.data };
};

export const AuthMeAPI = async () => {
  const res = await api.get("/auth/me");
  return res?.data;
};
export const ListUsersAPI = async (
  params: Pick<PaginationT, "limit" | "skip"> & FilterState
) => {
  const endPoint = params.q ? `/users/search` : `/users`;
  const res = await api.get(endPoint, { params });
  return res.data;
};

export const CreateUserAPI = async (data: UserFormValues) => {
  const res = await api.post("/users/add", data);
  return res.data;
};

export const UpdateUserAPI = async (
  id: number,
  data: Partial<UserFormValues>
) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const DeleteUserAPI = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const ListCategoriesAPI = async () => {
  const res = await api.get("/products/category-list");
  return res.data;
};

export const ListProductsAPI = async (
  params: Pick<PaginationT, "limit" | "skip"> & FilterState
) => {
  const endPoint = params.q ? `/products/search` : `/products`;
  const res = await api.get(endPoint, { params });
  return res.data;
};

export const CreateProductAPI = async (data: Product) => {
  const res = await api.post("/products/add", data);
  return res.data;
};

export const UpdateProductAPI = async (id: number, data: Partial<Product>) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const DeleteProductAPI = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const ListPostsAPI = async (
  params: Pick<PaginationT, "limit" | "skip"> & FilterState
) => {
  const endPoint = params.q ? `/posts/search` : `/posts`;
  const res = await api.get(endPoint, { params });
  return res.data;
};

export const GetPostAPI = async (id: number) => {
  const res = await api.get(`/posts/${id}`);
  return res.data as Post;
};

export const CreatePost = async (data: Partial<Post>) => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const UpdatePost = async (id: number, data: Partial<Post>) => {
  const res = await api.put(`/posts/${id}`, data);
  return res.data;
};

export const DeletePost = async (id: number) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

export const ListCommentsByPost = async (
  postId: number,
  params: Pick<PaginationT, "limit" | "skip"> & FilterState
) => api.get(`/posts/${postId}/comments`, { params }).then((r) => r.data);

export const CreateComment = async (data: {
  postId: number;
  body: string;
  userId: number;
}) => {
  const res = await api.post(`/comments/add`, data);
  return res.data;
};

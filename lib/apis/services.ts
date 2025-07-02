import { SignInFormValues, SignUpFormValues } from "../validations/auth";
import api from "./axios";
import { UserFormValues } from "../validations/user";
import { Product } from "../validations/product";

export const SignInAPI = async (data: SignInFormValues) => {
  const res = await api.post("/auth/login", { ...data, expiresInMins: 60 });
  // The API returns user fields and tokens in the same object
  const { accessToken, refreshToken, ...user } = res.data;
  return { user, accessToken, refreshToken };
};

export const SignUpAPI = async (data: SignUpFormValues) => {
  const res = await api.post("/users/add", data);
  // The API returns the user object only
  return { user: res.data };
};

export const AuthMeAPI = async () => {
  const res = await api.get("/auth/me");
  return await res.data;
};
export const ListUsersAPI = async (params: {
  skip: number;
  limit: number;
  q?: string;
  sortBy?: string;
  select?: string;
  order?: "asc" | "desc";
}) => {
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

export const ListProductsAPI = async (params: {
  skip: number;
  limit: number;
  q?: string;
  sortBy?: string;
  select?: string;
  order?: "asc" | "desc";
}) => {
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

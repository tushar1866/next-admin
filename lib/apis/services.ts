import { SignInFormValues, SignUpFormValues } from "../validations/auth";
import api from "./axios";
import { UserFormValues } from "../validations/user";
import { ProductFormValues } from "../validations/product";

export const SignInAPI = async (data: SignInFormValues) => {
  const res = await api.post("/auth/login", { ...data, expiresInMins: 60 });
  return res.data;
};

export const SignUpAPI = async (data: SignUpFormValues) => {
  const res = await api.post("/users/add", data);
  return res.data;
};

export const AuthMeAPI = async () => {
  const res = await api.get("/auth/me");
  return await res.data;
};
export const ListUsersAPI = async (
  page: number,
  skip: number,
  limit: number
) => {
  const res = await api.get(`/users`, { params: { page, skip, limit } });
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

export const ListProductsAPI = async (
  page: number,
  skip: number,
  limit: number
) => {
  const res = await api.get(`/products`, { params: { page, skip, limit } });
  return res.data;
};

export const CreateProductAPI = async (data: ProductFormValues) => {
  const res = await api.post("/products/add", data);
  return res.data;
};

export const UpdateProductAPI = async (
  id: number,
  data: Partial<ProductFormValues>
) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const DeleteProductAPI = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

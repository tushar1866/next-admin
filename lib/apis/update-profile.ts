import { User } from "@/types/user";
import api from "./axios";

export const UpdateProfileAPI = async (data: Partial<User>) => {
  const res = await api.put("/users/me", data);
  return res.data;
};

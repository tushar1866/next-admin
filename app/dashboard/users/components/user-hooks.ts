import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import { TableData } from "@/components/ui/data-table/types";
import {
  CreateUserAPI,
  DeleteUserAPI,
  ListUsersAPI,
  UpdateUserAPI,
} from "@/lib/apis/services";
import { UserFormValues } from "@/lib/validations/user";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

type UserTableData = TableData<User, "users">;

export const useUsers = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    skip: number;
    limit: number;
  }>({
    page: 1,
    skip: 0,
    limit: 10,
  });
  const paginate = useCallback(
    async (newPagination: { page: number; skip: number; limit: number }) => {
      setPagination(newPagination);
    },
    []
  );
  const query = useQuery<UserTableData, Error>({
    queryKey: ["users", pagination.page, pagination.skip, pagination.limit],
    queryFn: () =>
      ListUsersAPI(pagination.page, pagination.skip, pagination.limit),
    placeholderData: (previousData) => previousData,
  });

  return { paginate, ...query };
};

export const useCreateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: CreateUserAPI,
    onSuccess: () => {
      showSuccessToast("User added");
      client.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => showErrorToast("Failed to create user"),
  });
};

export const useUpdateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserFormValues }) =>
      UpdateUserAPI(id, data),
    onSuccess: () => {
      showSuccessToast("User updated");
      client.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => showErrorToast("Failed to update user"),
  });
};

export const useDeleteUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: DeleteUserAPI,
    onSuccess: () => {
      showSuccessToast("User deleted");
      client.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => showErrorToast("Failed to delete user"),
  });
};

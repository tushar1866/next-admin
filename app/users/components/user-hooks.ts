import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import {
  FilterState,
  PaginationT,
  TableData,
} from "@/components/ui/data-table/types";
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
  const [pagination, setPagination] = useState<
    Pick<PaginationT, "limit" | "skip">
  >({
    skip: 0,
    limit: 10,
  });
  const [filterState, setFilterState] = useState<FilterState>();
  const paginate = useCallback(
    async (newPagination: Pick<PaginationT, "limit" | "skip">) => {
      setPagination(newPagination);
    },

    []
  );
  const filter = useCallback((state: FilterState) => {
    setFilterState(state);
  }, []);
  const query = useQuery<UserTableData, Error>({
    queryKey: [
      "users",
      pagination.skip,
      pagination.limit,
      filterState?.q ?? "",
      filterState?.sortBy ?? "",
      filterState?.order ?? "",
      filterState?.select ?? "",
    ],
    queryFn: () => ListUsersAPI({ ...pagination, ...filterState }),
    placeholderData: (previousData) => previousData,
  });

  return { paginate, filter, ...query };
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

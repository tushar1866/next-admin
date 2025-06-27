import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import { TableData } from "@/components/ui/data-table/types";
import {
  CreateProductAPI,
  DeleteProductAPI,
  ListProductsAPI,
  UpdateProductAPI,
} from "@/lib/apis/services";
import { ProductFormValues } from "@/lib/validations/product";
import { Product } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

type ProductTableData = TableData<Product, "products">;

export const useProducts = () => {
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
  const query = useQuery<ProductTableData, Error>({
    queryKey: ["products", pagination.page, pagination.skip, pagination.limit],
    queryFn: () =>
      ListProductsAPI(pagination.page, pagination.skip, pagination.limit),
    placeholderData: (previousData) => previousData,
  });

  return { paginate, ...query };
};

export const useCreateProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: CreateProductAPI,
    onSuccess: () => {
      showSuccessToast("Product added");
      client.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => showErrorToast("Failed to create product"),
  });
};

export const useUpdateProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormValues }) =>
      UpdateProductAPI(id, data),
    onSuccess: () => {
      showSuccessToast("Product updated");
      client.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => showErrorToast("Failed to update product"),
  });
};

export const useDeleteProduct = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: DeleteProductAPI,
    onSuccess: () => {
      showSuccessToast("Product deleted");
      client.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => showErrorToast("Failed to delete product"),
  });
};

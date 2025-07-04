import useQueryParams from "@/components/providers/hooks/use-query-params";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import { TableData } from "@/components/ui/data-table/types";
import {
  CreateProductAPI,
  DeleteProductAPI,
  ListCategoriesAPI,
  ListProductsAPI,
  UpdateProductAPI,
} from "@/lib/apis/services";
import { Product } from "@/lib/validations/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ProductTableData = TableData<Product, "products">;

export const useCategory = () => {
  return useQuery<string[], Error>({
    queryKey: ["category"],
    queryFn: ListCategoriesAPI,
    placeholderData: (previousData) => previousData,
  });
};

export const useProducts = () => {
  const { filter, queryParams, paginate } = useQueryParams();
  const query = useQuery<ProductTableData, Error>({
    queryKey: [
      "products",
      queryParams.skip,
      queryParams.limit,
      queryParams?.q ?? "",
      queryParams?.sortBy ?? "",
      queryParams?.order ?? "",
      queryParams?.select ?? "",
    ],
    queryFn: () => ListProductsAPI(queryParams),
    placeholderData: (previousData) => previousData,
  });

  return { paginate, filter, ...query };
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
    mutationFn: ({ id, data }: { id: number; data: Product }) =>
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

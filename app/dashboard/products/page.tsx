"use client";
import React, { useState } from "react";
import { useProducts, useDeleteProduct } from "./components/product-hooks";
import ProductForm from "./components/product-form";

import useAlert from "@/components/providers/alert-provider";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import DataTable from "@/components/ui/data-table";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/lib/validations/product";

const ProductTable = DataTable<Product, "products">("products");
const ActionCell = ({
  cellProps: { row },
  handleEdit,
  handleDelete,
}: {
  cellProps: CellContext<Product, unknown>;
  handleEdit: (user: Product) => void;
  handleDelete: (userId: Product["id"]) => void;
}) => {
  const user = row.original;
  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => handleEdit(user)}>
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => handleDelete(user.id)}
      >
        Delete
      </Button>
    </div>
  );
};
export default function ProductsPage() {
  const { data, isLoading, error, paginate, filter } = useProducts();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const deleteProduct = useDeleteProduct();
  const { confirm } = useAlert();

  const openEditModal = (user: Product) => {
    setOpen(true);
    setSelectedProduct(user);
  };
  if (isLoading) return <p>Loading users...</p>;
  if (!data || error)
    return <p className="text-red-500">Error: {error?.message}</p>;

  const productColumns: ColumnDef<Product>[] = [
    { header: "ID", accessorKey: "id", enableColumnFilter: false },
    { header: "Title", accessorKey: "title" },
    { header: "Price", accessorKey: "price", enableColumnFilter: false },
    { header: "Stock", accessorKey: "stock", enableColumnFilter: false },
    { header: "Brand", accessorKey: "brand" },
    { header: "Category", accessorKey: "category" },
    {
      header: "Actions",
      id: "actions",
      cell: (cellProps) =>
        ActionCell({
          cellProps,
          handleEdit: openEditModal,
          handleDelete: (productId: Product["id"]) =>
            confirm({
              title: "Delete Product",
              description: "Are you sure you want to delete this product?",
              action: "Delete",
              onAction: () => {
                try {
                  if (!productId) return;
                  deleteProduct.mutateAsync(productId);
                  showSuccessToast("Product deleted!");
                } catch {
                  showErrorToast("Failed to delete product");
                }
              },
            }),
        }),
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button
          onClick={() => {
            setSelectedProduct(undefined);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <ProductTable
        columns={productColumns}
        data={data}
        enableGlobalFilter
        enableColumnFilters
        enableSorting
        enableRowSelection
        selectionMode="multiple"
        globalFilterExcludeKeys={["id"]}
        onPageChange={paginate}
        onFilterChange={({ globalFilter, sorting }) => {
          filter({
            q: globalFilter,
            sortBy: sorting?.[0]?.id,
            order: sorting?.[0]?.desc ? "desc" : "asc",
          });
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[97vh] max-h-screen gap-0 space-y-0 p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            defaultValues={selectedProduct}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

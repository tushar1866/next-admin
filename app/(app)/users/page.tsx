// app/dashboard/users/page.tsx
"use client";

import DataTable from "@/components/ui/data-table";
import { User } from "@/types/user";
import { useDeleteUser, useUsers } from "./components/user-hooks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { UserForm } from "./components/user-form";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import useAlert from "@/components/providers/alert-provider";

const UserTable = DataTable<User, "users">("users");
const ActionCell = ({
  cellProps: { row },
  handleEdit,
  handleDelete,
}: {
  cellProps: CellContext<User, unknown>;
  handleEdit: (user: User) => void;
  handleDelete: (userId: User["id"]) => void;
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
export default function UserPage() {
  const { confirm } = useAlert();
  const { data, isLoading, error, paginate, filter } = useUsers();
  const deleteUser = useDeleteUser();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const openEditModal = (user: User) => {
    setOpen(true);
    setSelectedUser(user);
  };
  if (isLoading) return <p>Loading users...</p>;
  if (!data || error)
    return <p className="text-red-500">Error: {error?.message}</p>;

  const userColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableColumnFilter: false,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: {
        filterVariant: "text",
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      meta: {
        filterVariant: "select",
        options: ["male", "female"],
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      meta: {
        filterVariant: "select",
        options: ["admin", "editor", "user"],
      },
      cell: ({ row }) => (row.original.role ?? "user").toUpperCase(),
    },
    {
      accessorKey: "company.name",
      header: "Company",
      cell: ({ row }) => row.original.company?.name ?? "-",
    },
    {
      accessorKey: "address.city",
      header: "City",
      cell: ({ row }) => row.original.address?.city ?? "-",
    },
    {
      header: "Actions",
      id: "actions",
      cell: (cellProps) =>
        ActionCell({
          cellProps,
          handleEdit: openEditModal,
          handleDelete: (userId: User["id"]) =>
            confirm({
              action: "Delete",
              title: "Are you sure?",
              description:
                "This action cannot be undone. This will permanently delete user and remove data from our servers.",
              onAction: () => deleteUser.mutate(userId),
            }),
        }),
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </div>
      <UserTable
        columns={userColumns}
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
        <DialogContent className="h-[97vh] max-h-screen p-0">
          <DialogHeader className="p-4">
            <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
          <UserForm user={selectedUser} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

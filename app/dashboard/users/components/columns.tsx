import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 40,
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
];

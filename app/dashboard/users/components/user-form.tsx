"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UserFormSchema, UserFormValues } from "@/lib/validations/user";
import { User } from "@/types/user";
import { useCreateUser, useUpdateUser } from "./user-hooks";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/ui/date-picker";

interface UserFormProps {
  readonly user?: User | null;
  readonly onClose: () => void;
}

export function UserForm({ user, onClose }: UserFormProps) {
  const [previewImage, setPreviewImage] = useState<string>("");

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      maidenName: "",
      username: "",
      email: "",
      phone: { code: "", number: "" },
      gender: undefined,
      role: undefined,
      age: 0,
      birthDate: "",
      image: "",
      address: {
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      company: {
        name: "",
        title: "",
        department: "",
      },
    },
  });

  const { reset, handleSubmit, control, setValue, formState } = form;
  const { isSubmitting } = formState;
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (user) {
      reset({ ...user, phone: parsePhone(user.phone) });

      if (user.image) setPreviewImage(user.image);
    }
  }, [user, reset]);

  function parsePhone(full: string): { code: string; number: string } {
    try {
      const match = new RegExp(/^\+?(\d{1,4})(.*)/).exec(full);
      console.log(match);
      return match
        ? { code: match[1], number: match[2].replace(/\D/g, "") }
        : { code: "91", number: full };
    } catch (error) {
      console.error(error);
      return { code: "", number: "" };
    }
  }

  const onSubmit = (data: UserFormValues) => {
    if (user) {
      updateUser.mutate({ id: user.id, data }, { onSuccess: onClose });
    } else {
      createUser.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <Form {...form}>
      <ScrollArea className="h-[85vh] px-6 pb-2 py-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="maidenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maiden Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image preview (optional) */}
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Profile Image URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://..."
                      value={field.value}
                      onChange={(e) => {
                        setValue("image", e.target.value);
                        setPreviewImage(e.target.value);
                      }}
                    />
                  </FormControl>
                  {previewImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewImage}
                      alt="preview"
                      className="w-24 h-24 mt-2 rounded object-cover border"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <h4 className="col-span-2 font-medium text-sm text-muted-foreground">
              Address
            </h4>
            {(
              ["address", "city", "state", "postalCode", "country"] as const
            ).map((key) => (
              <FormField
                key={key}
                control={control}
                name={`address.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <h4 className="col-span-2 font-medium text-sm text-muted-foreground">
              Company
            </h4>
            {(["name", "title", "department"] as const).map((key) => (
              <FormField
                key={key}
                control={control}
                name={`company.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <DialogFooter className="sticky bottom-0 bg-background">
            <Button type="submit" disabled={isSubmitting}>
              {user ? "Update" : "Create"} User
            </Button>
          </DialogFooter>
        </form>
      </ScrollArea>
    </Form>
  );
}

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UserFormSchema, UserFormValues } from "@/lib/validations/user";
import { useUpdateProfile } from "./profile-hooks";
import { UpdateProfileAPI } from "@/lib/apis/update-profile";
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
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function ProfileForm({
  user,
  onDone,
}: {
  readonly user: UserFormValues;
  readonly onDone: () => void;
}) {
  const [previewImage, setPreviewImage] = useState<string>(user?.image ?? "");
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: user,
  });
  const { handleSubmit, control, setValue, reset } = form;
  const { mutate, isPending } = useUpdateProfile(UpdateProfileAPI);

  useEffect(() => {
    if (user) {
      reset(user);
      setPreviewImage(user.image ?? "");
    }
  }, [user, reset]);

  function onSubmit(data: UserFormValues) {
    mutate(data, { onSuccess: onDone });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto"
      >
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-24 h-24">
            {previewImage ? (
              <AvatarImage src={previewImage} alt="profile" />
            ) : (
              <AvatarFallback>IMG</AvatarFallback>
            )}
          </Avatar>
          <FormField
            control={control}
            name="image"
            render={({ field }) => (
              <FormItem>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <h4 className="col-span-2 font-medium text-sm text-muted-foreground">
            Address
          </h4>
          {(["address", "city", "state", "postalCode", "country"] as const).map(
            (key) => (
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
            )
          )}
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
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}

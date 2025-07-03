"use client";
import { useProfile } from "./components/profile-hooks";
import { useAuthStore } from "@/store/auth/auth-store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileForm } from "./components/profile-form";
import { UserFormValues } from "@/lib/validations/user";

export default function ProfilePage() {
  const { isLoading } = useProfile();
  const { user } = useAuthStore();
  const [editMode, setEditMode] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <div>No user found.</div>;

  // Ensure user is typed as UserFormValues for ProfileForm
  const userFormValues: UserFormValues = {
    ...user,
    phone:
      typeof user.phone === "object" && user.phone !== null
        ? user.phone
        : { code: "", number: String(user.phone ?? "") },
    address: user.address ?? {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    company: user.company ?? { name: "", title: "", department: "" },
    role: user.role ?? "user",
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {editMode ? (
        <ProfileForm user={userFormValues} onDone={() => setEditMode(false)} />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-24 h-24">
              {user.image ? (
                <AvatarImage src={user.image} alt="profile" />
              ) : (
                <AvatarFallback>IMG</AvatarFallback>
              )}
            </Avatar>
            <Button variant="outline" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">First Name</div>
              <div>{user.firstName}</div>
            </div>
            <div>
              <div className="font-semibold">Last Name</div>
              <div>{user.lastName}</div>
            </div>
            <div>
              <div className="font-semibold">Username</div>
              <div>{user.username}</div>
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <div>{user.email}</div>
            </div>
            <div>
              <div className="font-semibold">Phone</div>
              <div>
                {user.phone &&
                typeof user.phone === "object" &&
                user.phone !== null &&
                Object.hasOwn(user.phone, "code") &&
                Object.hasOwn(user.phone, "number")
                  ? `+${
                      (user.phone as { code: string; number: string }).code
                    } ${
                      (user.phone as { code: string; number: string }).number
                    }`
                  : user.phone}
              </div>
            </div>
            <div>
              <div className="font-semibold">Gender</div>
              <div>{user.gender}</div>
            </div>
            <div>
              <div className="font-semibold">Role</div>
              <div>{user.role}</div>
            </div>
            <div>
              <div className="font-semibold">Age</div>
              <div>{user.age}</div>
            </div>
            <div>
              <div className="font-semibold">Birth Date</div>
              <div>{user.birthDate}</div>
            </div>
            <div>
              <div className="font-semibold">Maiden Name</div>
              <div>{user.maidenName}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2">Address</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium">Address:</span>{" "}
                {user.address?.address}
              </div>
              <div>
                <span className="font-medium">City:</span> {user.address?.city}
              </div>
              <div>
                <span className="font-medium">State:</span>{" "}
                {user.address?.state}
              </div>
              <div>
                <span className="font-medium">Postal Code:</span>{" "}
                {user.address?.postalCode}
              </div>
              <div>
                <span className="font-medium">Country:</span>{" "}
                {user.address?.country}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2">Company</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium">Name:</span> {user.company?.name}
              </div>
              <div>
                <span className="font-medium">Title:</span>{" "}
                {user.company?.title}
              </div>
              <div>
                <span className="font-medium">Department:</span>{" "}
                {user.company?.department}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

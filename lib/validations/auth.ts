import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js/mobile";

export const SignInSchema = z.object({
  username: z.string().min(1, "Please enter username"),
  password: z.string().min(1, "Please enter password"),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "First name is required")
      .max(25, "Please use a shorter name"),
    lastname: z
      .string()
      .min(2, "Last name is required")
      .max(25, "Please use a shorter name"),
    username: z.string().min(2, "Please enter username"),
    phone: z
      .object({
        code: z.string(),
        number: z.string(),
      })
      .refine(({ number, code }) => {
        const parsedNumber = parsePhoneNumber(`+${code}${number}`);
        return parsedNumber?.isValid();
      }, "Please enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Please use less than 50 character"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"],
  });

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

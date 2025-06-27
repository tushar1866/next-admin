import { parsePhoneNumber } from "libphonenumber-js/mobile";
import { z } from "zod";

export const UserFormSchema = z.object({
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  username: z.string().min(2),
  email: z.string().email("Invalid email"),
  phone: z
    .object({
      code: z.string().min(1),
      number: z.string().min(1),
    })
    .refine(({ number, code }) => {
      if (code && number) {
        const parsed = parsePhoneNumber(`+${code}${number}`);
        return parsed?.isValid();
      }
      return false;
    }, "Invalid phone number"),
  gender: z.enum(["male", "female"]),
  role: z.enum(["admin", "editor", "user"]),
  companyName: z.string().optional(),
  city: z.string().optional(),
  birthDate: z.string().optional(), // validate as ISO string or use z.coerce.date()
  maidenName: z.string().optional(),
  age: z.coerce.number().min(0).max(150),
  image: z.string().url().optional(),
  address: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  company: z.object({
    name: z.string(),
    title: z.string(),
    department: z.string(),
  }),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;

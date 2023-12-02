import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"];

export const profileUpdateSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not valid email"),
  full_name: z.string().min(1, { message: "Fullname is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  profile_picture: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPE.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export type ProfileUpdateType = z.infer<typeof profileUpdateSchema>;

export interface Profile {
  id: number;
  full_name: string;
  email: string;
  password?: string;
  role: string;
  profile_picture: string;
  address: string;
  phone_number: string;
}

export interface EditProfile {
  full_name: string;
  email: string;
  password?: string;
  address: string;
  phone_number: string;
}

import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().email({ message: "input valid email" }),
  password: z
    .string()
    .min(8, { message: "password must be more than 8 chars" }),
});

export const registerValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "input valid email" }),
  password: z
    .string()
    .min(8, { message: "password must be more than 8 chars" }),
});

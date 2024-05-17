import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "minimum of 2 characters required!",
    })
    .max(20, {
      message: "maximum of 20 characters!",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "minimum of 8 characters required!",
    })
    .max(20, {
      message: "maximum of 20 characters!",
    }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "minimum of 8 characters required!",
    })
    .max(20, {
      message: "maximum of 20 characters!",
    }),
});

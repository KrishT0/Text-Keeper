"use server";
import { sql } from "@/app/utils/db";
import { z, type ZodError } from "zod";
import { createSession } from "../utils/session";
import { AuthFormErrors, AuthFormState } from "./type";

const baseSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = baseSchema
  .extend({
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const formatErrors = (error: ZodError): AuthFormErrors => {
  const fieldErrors: AuthFormErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof AuthFormErrors;
    if (!fieldErrors[field]) fieldErrors[field] = [];
    fieldErrors[field]!.push(issue.message);
  }
  return fieldErrors;
};

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = baseSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: formatErrors(result.error),
      values: {
        username: (formData.get("username") as string) || "",
        password: (formData.get("password") as string) || "",
      },
    };
  }

  const { username, password } = result.data;

  const user = await sql`
    SELECT id FROM users
    WHERE username = ${username} AND password = ${password}
  `;

  if (user.length === 0) {
    return {
      errors: { username: ["Invalid username or password"] },
      values: { username, password },
    };
  }

  await createSession(user[0].id);
  return { user: { id: user[0].id, username } };
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = signUpSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return {
      errors: formatErrors(result.error),
      values: {
        username: (formData.get("username") as string) || "",
        password: (formData.get("password") as string) || "",
        confirmPassword: (formData.get("confirmPassword") as string) || "",
      },
    };
  }

  const { username, password } = result.data;

  const existingUser = await sql`
    SELECT id FROM users WHERE username = ${username}
  `;

  if (existingUser.length > 0) {
    return {
      errors: { username: ["Username already taken"] },
      values: { username, password },
    };
  }

  const user = await sql`
    INSERT INTO users (username, password)
    VALUES (${username}, ${password})
    RETURNING id, username
  `;

  await createSession(user[0].id);
  return { user: { id: user[0].id, username } };
}

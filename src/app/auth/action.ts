"use server";

import { z, type ZodError } from "zod";
import { sql } from "@/app/utils/db";
import { createSession } from "../utils/session";

const authSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),

  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

type prevFormStateType = {
  errors?: { [key: string]: string[] };
  values?: { username: string; password: string };
};

// formatErrors now accepts ZodError
const formatErrors = (errors: ZodError) => {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of errors.issues) {
    const field = issue.path[0] as string;
    if (!fieldErrors[field]) fieldErrors[field] = [];
    fieldErrors[field].push(issue.message);
  }
  return fieldErrors;
};

export async function login(_prevState: prevFormStateType, formData: FormData) {
  const result = authSchema.safeParse({
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
    SELECT id
    FROM users
    WHERE username = ${username} AND password = ${password}
  `;

  if (user.length === 0) {
    return {
      errors: {
        username: ["Invalid username or password"],
      },
      values: { username, password },
    };
  }

  await createSession(user[0].id);

  return {
    user: { id: user[0].id, username },
  };
}

export async function signUp(
  _prevState: prevFormStateType,
  formData: FormData
) {
  const result = authSchema.safeParse({
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

  // Check if username already exists
  const existingUser = await sql`
    SELECT username
    FROM users
    WHERE username = ${username}
  `;

  if (existingUser.length > 0) {
    return {
      errors: {
        username: ["Username already taken"],
      },
      values: { username, password },
    };
  }

  const user = await sql`
    INSERT INTO users (username, password)
    VALUES (${username}, ${password})
    RETURNING id, username
  `;

  await createSession(user[0].id);

  return {
    user: { id: user[0].id, username },
  };
}

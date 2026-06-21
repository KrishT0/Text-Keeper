"use client";

import { login } from "@/app/auth/action";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import type { authFormType } from "../type";

function LoginForm({ toggleAUthForm }: authFormType) {
  const initialState = {
    errors: {},
    values: { username: "", password: "" },
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      router.push("/text");
    }
  }, [state.user, router]);

  const togglePassworrdVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl mt-5 font-semibold text-center">
        Sign in to your account
      </h3>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            defaultValue={state?.values?.username}
            autoComplete="off"
            className="p-2 rounded-md bg-[#1F2121] text-sm outline-none"
          />
          {state?.errors?.username && (
            <p className="text-xs font-semibold text-red-400 mt-1">
              {state.errors.username[0]}
            </p>
          )}
        </div>
        <div className="flex relative flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={isPasswordVisible ? "input" : "password"}
            placeholder="Enter your password"
            defaultValue={state?.values?.password}
            autoComplete="off"
            className="p-2 rounded-md bg-[#1F2121] text-sm outline-none"
          />
          {state?.errors?.password && (
            <p className="text-xs font-semibold text-red-400 mt-1">
              {state.errors.password[0]}
            </p>
          )}
          {isPasswordVisible ? (
            <EyeClosed
              className="absolute h-4 right-1 cursor-pointer bottom-2.25"
              onClick={togglePassworrdVisibility}
            />
          ) : (
            <Eye
              className="absolute h-4 right-1 cursor-pointer bottom-2.25"
              onClick={togglePassworrdVisibility}
            />
          )}
        </div>
        <button
          type="submit"
          className={`cursor-pointer font-medium p-1 text-sm bg-[#EDEDED] text-[#191A1A] rounded-md ${
            isPending && "opacity-50"
          }`}
          disabled={isPending}
        >
          Sign in
        </button>
      </form>
      <p className="text-sm text-[#818181] text-center mt-3">
        Not a member?
        <span
          className=" ml-2 cursor-pointer font-medium text-[#bbbaba]"
          onClick={toggleAUthForm}
        >
          Create an account
        </span>
      </p>
    </div>
  );
}

export default LoginForm;

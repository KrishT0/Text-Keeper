"use client";

import { signUp } from "@/app/auth/action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

type authFormType = {
  toggleAUthForm: () => void;
};

function SignUp({ toggleAUthForm }: authFormType) {
  const initialState = {
    errors: {},
    values: { username: "", password: "" },
  };

  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      router.push("/text");
    }
  }, [state.user, router]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl mt-5 font-semibold text-center">
        Create new account
      </h3>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
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
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={state?.values?.password}
            autoComplete="off"
            className="p-2 rounded-md bg-[#1F2121] text-sm outline-none"
          />
          {state?.errors?.password && (
            <p className="text-xs font-semibold text-red-400 mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`cursor-pointer font-semibold p-1 text-sm bg-[#EDEDED] text-[#191A1A] rounded-md ${
            isPending && "opacity-50"
          }`}
          disabled={isPending}
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-[#818181] text-center mt-3">
        Already a member?
        <span
          className=" ml-2 cursor-pointer font-semibold text-[#bbbaba]"
          onClick={toggleAUthForm}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default SignUp;

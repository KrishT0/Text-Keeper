"use client";

import { useState } from "react";
import LoginForm from "@/app/auth/components/login";
import SignUp from "@/app/auth/components/signup";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAUthForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      {isLogin ? (
        <LoginForm toggleAUthForm={toggleAUthForm} />
      ) : (
        <SignUp toggleAUthForm={toggleAUthForm} />
      )}
    </>
  );
}

export default AuthPage;

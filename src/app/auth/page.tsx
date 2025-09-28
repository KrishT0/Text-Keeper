"use client";

import { useState } from "react";
import LoginForm from "@/components/login";
import SignUp from "@/components/signup";

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

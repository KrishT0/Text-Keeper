"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      richColors
      position="bottom-center"
      duration={3000}
      toastOptions={{
        style: {
          background: "#4A4C4C",
          color: "#C5C8C6",
        },
      }}
    />
  );
}

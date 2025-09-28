"use client";

import { Power } from "lucide-react";

type LogoutBtnProps = {
  logOutHandler: () => void;
};

function LogoutBtn({ logOutHandler }: LogoutBtnProps) {
  return (
    <Power
      onClick={logOutHandler}
      className="cursor-pointer w-8 h-4 hover:text-red-400"
    />
  );
}

export default LogoutBtn;

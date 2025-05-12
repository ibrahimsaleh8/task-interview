import { MainDomain } from "@/lib/domain";
import { axiosErrorType } from "@/lib/types";
import { useUserState } from "@/lib/Zustand";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function LogoutBtn() {
  const { logout } = useUserState();
  const route = useRouter();
  const HandleLogout = async () => {
    axios
      .get(`${MainDomain}/api/auth/logout`)
      .then(() => {
        toast.success("Logged out suceess");
        logout();
        route.refresh();
      })
      .catch((err: axiosErrorType) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <button
      onClick={HandleLogout}
      className="bg-red-600 flex disabled:bg-red-200 disabled:text-zinc-700 px-4 py-2 rounded-md w-fit  cursor-pointer">
      Logout
    </button>
  );
}

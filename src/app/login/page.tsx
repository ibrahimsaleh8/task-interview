"use client";

import { MainDomain } from "@/lib/domain";
import { axiosErrorType, UserLoginDataType } from "@/lib/types";
import { loginValidation } from "@/lib/validation";
import { useUserState } from "@/lib/Zustand";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
export type ReturnedDataApi = {
  userData: {
    name: string;
    email: string;
    userid: number;
  };
};
async function handleLoginApi(
  data: UserLoginDataType
): Promise<ReturnedDataApi> {
  const res = await axios.post(`${MainDomain}/api/auth/login`, data);
  return res.data;
}
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { authentication } = useUserState();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginDataType>({
    resolver: zodResolver(loginValidation),
    mode: "onBlur",
  });

  const HandleLogin: SubmitHandler<UserLoginDataType> = (data) => {
    console.log(data);
    setLoading(true);
    handleLoginApi(data)
      .then((res) => {
        authentication({
          email: res.userData.email,
          isLogedin: true,
          name: res.userData.name,
          userid: res.userData.userid,
        });
        toast.success("user logged in success");
        route.refresh();
      })
      .catch((err: axiosErrorType) => {
        console.log("Error", err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="py-10">
      <p>Login Page</p>
      <form
        onSubmit={handleSubmit(HandleLogin)}
        className="flex flex-col gap-3">
        <input
          required
          {...register("email")}
          className="input"
          type="email"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          required
          {...register("password")}
          className="input"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          disabled={loading}
          className="bg-green-600 disabled:bg-green-200 disabled:text-zinc-700 px-4 py-2 rounded-md w-fit mx-auto cursor-pointer">
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

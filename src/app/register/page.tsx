"use client";

import { MainDomain } from "@/lib/domain";
import { axiosErrorType, UserRegisterDataType } from "@/lib/types";
import { registerValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { ReturnedDataApi } from "../login/page";
import { useUserState } from "@/lib/Zustand";
async function handleRegisterApi(
  data: UserRegisterDataType
): Promise<ReturnedDataApi> {
  const res = await axios.post(`${MainDomain}/api/auth/register`, data);
  return res.data;
}
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { authentication } = useUserState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterDataType>({
    resolver: zodResolver(registerValidation),
    mode: "onBlur",
  });

  const HandleLogin: SubmitHandler<UserRegisterDataType> = (data) => {
    console.log(data);
    setLoading(true);
    handleRegisterApi(data)
      .then((res) => {
        toast.success("Register completed");
        authentication({
          email: res.userData.email,
          isLogedin: true,
          name: res.userData.name,
          userid: res.userData.userid,
        });
      })
      .catch((err: axiosErrorType) => {
        console.log("Error", err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="py-10">
      <p>Register Page</p>
      <form
        onSubmit={handleSubmit(HandleLogin)}
        className="flex flex-col gap-3">
        <input
          required
          {...register("name")}
          className="input"
          type="text"
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
          {loading ? "loading.." : "Register"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

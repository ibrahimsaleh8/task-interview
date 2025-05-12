"use client";

import { UserLoggedData } from "@/app/layout";
import { useUserState } from "@/lib/Zustand";
import { ReactNode, useEffect } from "react";

export default function UserAuthentication({
  children,
  userData,
}: {
  children: ReactNode;
  userData: UserLoggedData;
}) {
  console.log("userData", userData);
  const { authentication } = useUserState();

  useEffect(() => {
    if (userData.userId != 0) {
      authentication({
        email: userData.email,
        isLogedin: true,
        name: userData.name,
        userid: userData.userId,
      });
    }
  }, [authentication, userData.email, userData.name, userData.userId]);
  return <>{children}</>;
}

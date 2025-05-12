"use client";
import { useUserState } from "@/lib/Zustand";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

export default function Navbar() {
  const { user } = useUserState();
  console.log(user);
  return (
    <header className="flex items-center">
      <Link href={"/"}>Home</Link>
      <nav className="flex-1 justify-end">
        <ul className="flex items-center gap-3 justify-end">
          {!user.isLogedin ? (
            <>
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/register"}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <Link href={"/dashboard"}>Dashboard</Link>
              <LogoutBtn />
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

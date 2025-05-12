import prisma from "@/lib/prisma";
import { generatedToken } from "@/lib/tokenGenerator";
import { UserLoginDataType } from "@/lib/types";
import { loginValidation } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as UserLoginDataType;
    const isValidData = loginValidation.safeParse({ email, password });

    if (!isValidData.success) {
      return NextResponse.json(
        { message: isValidData.error.errors[0].message },
        { status: 400 }
      );
    }
    // Check if the user not exist
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "invalid cradentails" },
        { status: 400 }
      );
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return NextResponse.json(
        { message: "invalid cradentails" },
        { status: 400 }
      );
    }
    const token = generatedToken({
      email: user.email,
      name: user.name,
      userId: user.id,
    });
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return NextResponse.json(
      {
        userData: {
          name: user.name,
          email: user.email,
          userid: user.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error ${error}` },
      { status: 500 }
    );
  }
}

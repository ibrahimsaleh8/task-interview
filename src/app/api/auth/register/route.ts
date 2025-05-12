import prisma from "@/lib/prisma";
import { generatedToken } from "@/lib/tokenGenerator";
import { UserRegisterDataType } from "@/lib/types";
import { registerValidation } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } =
      (await request.json()) as UserRegisterDataType;
    const isValidData = registerValidation.safeParse({ name, email, password });

    if (!isValidData.success) {
      return NextResponse.json(
        { message: isValidData.error.errors[0].message },
        { status: 400 }
      );
    }

    // Check if the user not exist
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return NextResponse.json(
        { message: "user Already exist" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = generatedToken({ email, name, userId: userInfo.id });
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return NextResponse.json(
      {
        userData: {
          name: userInfo.name,
          email: userInfo.email,
          userid: userInfo.id,
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

import { userDataFromToken } from "@/lib/tokenVerify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = (await request.headers.get("Authorization")) as string;
    if (!token) {
      return NextResponse.json({ message: "No token Provided" });
    }
    const userData = userDataFromToken(token);
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error ${error}` },
      { status: 500 }
    );
  }
}

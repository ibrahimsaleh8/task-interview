import prisma from "@/lib/prisma";
import { TaskDataType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { description, title } = (await request.json()) as TaskDataType;
    await prisma.task.create({
      data: {
        description,
        title,
      },
    });

    return NextResponse.json(
      { message: "Task Added Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error ${error}` },
      { status: 500 }
    );
  }
}

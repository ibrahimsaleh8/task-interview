import prisma from "@/lib/prisma";
import { TaskDataType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
// Delete Task
export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id: taskId } = await params;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      return NextResponse.json({ message: "Task Not found" }, { status: 404 });
    }
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    return NextResponse.json(
      { meesage: "Task Deleted Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error ${error}` },
      { status: 500 }
    );
  }
}
// Edit Task
export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { description, title } = (await request.json()) as TaskDataType;
    const { id: taskId } = await params;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      return NextResponse.json({ message: "Task Not found" }, { status: 404 });
    }
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(
      { meesage: "Task Updated Success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error ${error}` },
      { status: 500 }
    );
  }
}

// Get Task
export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id: taskId } = await params;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      return NextResponse.json({ message: "Task Not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error ${error}` },
      { status: 500 }
    );
  }
}

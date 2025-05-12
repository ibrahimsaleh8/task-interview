"use client";

import { MainDomain } from "@/lib/domain";
import { axiosErrorType, TaskDataType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
async function AddTaskApi(data: TaskDataType) {
  await axios.post(`${MainDomain}/api/tasks/add`, data);
}
export default function AddTaskPage() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const reactQueryClient = useQueryClient();
  const route = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add_task"],
    mutationFn: (data: TaskDataType) => AddTaskApi(data),
    onSuccess: () => {
      toast.success("task addedd success");
      reactQueryClient.refetchQueries({ queryKey: ["get_all_tasks"] });
      route.push("/dashboard");
    },
    onError: (error: axiosErrorType) => {
      toast.error(error.response.data.message);
    },
  });

  const HandleAddTask = () => {
    if (taskTitle.trim().length == 0 || taskDesc.trim().length == 0) {
      toast.error("Please Check task Title and task Desc");
      return;
    }
    mutate({ description: taskDesc, title: taskTitle });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleAddTask();
      }}
      className="flex flex-col gap-3">
      <input
        onChange={(e) => setTaskTitle(e.target.value)}
        className="input"
        type="text"
        placeholder="Task Title"
      />
      <input
        onChange={(e) => setTaskDesc(e.target.value)}
        className="input"
        type="text"
        placeholder="Task Description"
      />
      <button
        disabled={isPending}
        className="bg-green-600 disabled:bg-green-200 disabled:text-zinc-700 px-4 py-2 rounded-md w-fit mx-auto cursor-pointer">
        {isPending ? "Adding.." : "Add Task"}
      </button>
    </form>
  );
}

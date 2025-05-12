import { MainDomain } from "@/lib/domain";
import { TasksDataInfoType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
async function deleteTaskApi(id: string) {
  await axios.delete(`${MainDomain}/api/tasks/${id}`);
}
export default function TaskCard({
  title,
  created_at,
  description,
  id,
  updated_at,
}: TasksDataInfoType) {
  const reactQueryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (id: string) => deleteTaskApi(id),
    onSuccess: () => {
      reactQueryClient.refetchQueries({ queryKey: ["get_all_tasks"] });
      toast.success("Task Deleted");
    },
  });
  const HandleDeleteTask = () => {
    mutate(id);
  };

  const created_at_Time = `${new Date(created_at).getDate()} / ${
    new Date(created_at).getMonth() + 1
  } / ${new Date(created_at).getFullYear()}`;
  const updated_at_Time = `${new Date(updated_at).getDate()} / ${
    new Date(updated_at).getMonth() + 1
  } / ${new Date(updated_at).getFullYear()}`;
  return (
    <div className="bg-green-700 px-4 py-3 rounded-md flex flex-col gap-2">
      <p>title:{title}</p>
      <p>Description: {description}</p>
      <p>Created At: {created_at_Time}</p>
      <p>Updated At: {updated_at_Time}</p>

      <Link
        className="bg-black text-white px-3 py-1 rounded-sm w-fit"
        href={`/dashboard/${id}`}>
        Edit
      </Link>
      <button
        disabled={isPending}
        onClick={HandleDeleteTask}
        className="bg-red-600 disabled:bg-red-400 text-white px-3 py-1 rounded-sm w-fit cursor-pointer">
        {isPending ? "Deleteing..." : "Delete"}
      </button>
    </div>
  );
}

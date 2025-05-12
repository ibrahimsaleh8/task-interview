"use client";

import { MainDomain } from "@/lib/domain";
import { axiosErrorType, TaskDataType } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
async function get_task_by_id(id: string): Promise<TaskDataType> {
  const task = await axios.get(`${MainDomain}/api/tasks/${id}`);
  return task.data;
}
async function update_task_by_id(
  data: TaskDataType,
  id: string
): Promise<TaskDataType> {
  const task = await axios.put(`${MainDomain}/api/tasks/${id}`, data);
  return task.data;
}
export default function EditTask() {
  const id = usePathname().split("/")[2];
  const reactQueryClient = useQueryClient();
  //   Get Task data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["edit_task", id],
    queryFn: () => get_task_by_id(id),
  });

  //   Update Task
  const { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ["update-task"],
    mutationFn: (paramters: { data: TaskDataType; id: string }) =>
      update_task_by_id(paramters.data, paramters.id),
    onSuccess: () => {
      reactQueryClient.refetchQueries({
        queryKey: ["edit_task", id],
      });
      reactQueryClient.refetchQueries({
        queryKey: ["get_all_tasks"],
      });
    },
    onError: (err: axiosErrorType) => {
      toast.error(err.response.data.message);
    },
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDesc(data.description);
    }
  }, [data]);

  if (isError && error) {
    throw new Error(error.message);
  }
  const HandleUpdate = () => {
    console.log("title", title);
    console.log("desc", desc);
    if (data) {
      if (desc == data.description && title == data.title) {
        toast.warning("title and description did't change");
        return;
      }
      mutate({ data: { description: desc, title }, id });
    }
  };
  return (
    <div>
      {isPending && !data ? (
        <>Loading....</>
      ) : (
        data && (
          <div className="flex flex-col gap-3">
            <Link
              className="bg-white text-black px-4 py-2 rounded-sm w-fit"
              href={"/dashboard"}>
              Tasks
            </Link>
            <label htmlFor="title">title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              className="input"
              type="text"
              placeholder="Title"
              defaultValue={title}
            />
            <label htmlFor="desc">Description:</label>
            <input
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              className="input"
              type="text"
              placeholder="Description"
              defaultValue={desc}
            />
            <button
              disabled={isUpdating}
              onClick={HandleUpdate}
              className="bg-green-600 disabled:bg-green-200 disabled:text-zinc-700 px-4 py-2 rounded-md w-fit mx-auto cursor-pointer">
              {isUpdating ? "Updating...." : "Edit"}
            </button>
          </div>
        )
      )}
    </div>
  );
}

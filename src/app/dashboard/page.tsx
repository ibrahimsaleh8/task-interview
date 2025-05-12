"use client";
import TaskCard from "@/components/TaskCard";
import { MainDomain } from "@/lib/domain";
import { TasksDataInfoType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
async function getAllTasksApi(): Promise<TasksDataInfoType[]> {
  const res = await axios.get(`${MainDomain}/api/tasks/get-tasks`);
  return res.data;
}
export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["get_all_tasks"],
    queryFn: getAllTasksApi,
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p>DashboardPage</p>

        <ul>
          <li>
            <Link
              className="bg-white text-black px-3 py-1"
              href={"/dashboard/add-task"}>
              Add Task
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading && !data ? (
          <>Loading........</>
        ) : (
          data && (
            <>
              {data.map((task) => (
                <TaskCard
                  key={task.id}
                  created_at={task.created_at}
                  description={task.description}
                  id={task.id}
                  title={task.title}
                  updated_at={task.updated_at}
                />
              ))}
            </>
          )
        )}
      </div>
    </div>
  );
}

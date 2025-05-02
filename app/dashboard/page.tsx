"use client";

import { useState } from "react";

import { AddTaskButton } from "@/components/add-task-button";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { StudyProgress } from "@/components/dashboard/study-progress";
import { TaskSummary } from "@/components/dashboard/task-summary";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { mockTasks } from "@/lib/data";
import { Task, TaskStatus } from "@/lib/types";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleEdit = (id: string) => {
    // This would open a modal/form to edit the task
    console.log(`Edit task ${id}`);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your academic progress.
        </p>
      </div>

      <div className="mb-8">
        <TaskSummary tasks={tasks} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <UpcomingTasks
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <div className="space-y-8">
          <StudyProgress tasks={tasks} />
          <CategoryBreakdown tasks={tasks} />
        </div>
      </div>

      <AddTaskButton />
    </div>
  );
}
"use client";

import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { CategoryIcon, getCategoryColor } from "@/components/ui/icons";
import { Task, TaskStatus } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  const dueDate = useMemo(() => {
    return new Date(task.dueDate);
  }, [task.dueDate]);

  const isOverdue = useMemo(() => {
    return new Date() > dueDate && task.status !== "completed";
  }, [dueDate, task.status]);

  const progressPercentage = useMemo(() => {
    if (!task.estimatedHours || !task.completedHours) return 0;
    return Math.min(100, Math.round((task.completedHours / task.estimatedHours) * 100));
  }, [task.completedHours, task.estimatedHours]);

  const statusBadgeClasses = useMemo(() => {
    switch (task.status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "todo":
      default:
        return isOverdue
          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  }, [task.status, isOverdue]);

  const priorityClasses = useMemo(() => {
    switch (task.priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    }
  }, [task.priority]);

  const categoryColor = useMemo(() => {
    return getCategoryColor(task.category);
  }, [task.category]);

  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md group"
      style={{ borderLeft: `4px solid ${categoryColor}` }}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div 
            className="mt-1 p-1 rounded-md"
            style={{ color: categoryColor }}
          >
            <CategoryIcon category={task.category} className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-tight">{task.title}</h3>
            {task.course && (
              <p className="text-xs text-muted-foreground">{task.course}</p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onStatusChange && task.status !== "todo" && (
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "todo")}>
                Mark as To Do
              </DropdownMenuItem>
            )}
            {onStatusChange && task.status !== "in-progress" && (
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "in-progress")}>
                Mark as In Progress
              </DropdownMenuItem>
            )}
            {onStatusChange && task.status !== "completed" && (
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "completed")}>
                Mark as Completed
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(task.id)}>
                Edit
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadgeClasses}`}>
            {task.status === "todo" && isOverdue
              ? "Overdue"
              : task.status === "todo"
              ? "To Do"
              : task.status === "in-progress"
              ? "In Progress"
              : "Completed"}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${priorityClasses}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            Due {format(dueDate, "MMM d, h:mm a")}
          </span>
        </div>
      </CardContent>
      {(task.estimatedHours !== undefined && task.completedHours !== undefined) && (
        <CardFooter className="p-4 pt-0 flex flex-col gap-1">
          <div className="w-full flex items-center justify-between text-xs">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </CardFooter>
      )}
    </Card>
  );
}
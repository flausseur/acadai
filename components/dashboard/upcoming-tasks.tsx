"use client";

import { addDays, format, isBefore, isToday, isTomorrow, startOfToday } from "date-fns";
import { Inbox } from "lucide-react";
import { useMemo } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "@/components/tasks/task-card";
import { Task, TaskStatus } from "@/lib/types";

interface UpcomingTasksProps {
  tasks: Task[];
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function UpcomingTasks({ 
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}: UpcomingTasksProps) {
  const upcomingTasks = useMemo(() => {
    const today = startOfToday();
    const nextWeek = addDays(today, 7);
    
    return tasks
      .filter(
        (task) =>
          task.status !== "completed" &&
          !isBefore(new Date(task.dueDate), today) &&
          isBefore(new Date(task.dueDate), nextWeek)
      )
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [tasks]);

  const groupedTasks = useMemo(() => {
    const grouped: Record<string, Task[]> = {
      today: [],
      tomorrow: [],
      upcoming: [],
    };

    upcomingTasks.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      
      if (isToday(dueDate)) {
        grouped.today.push(task);
      } else if (isTomorrow(dueDate)) {
        grouped.tomorrow.push(task);
      } else {
        grouped.upcoming.push(task);
      }
    });

    return grouped;
  }, [upcomingTasks]);

  if (upcomingTasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Tasks due in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-semibold">No upcoming tasks</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You have no tasks due in the next 7 days.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>Tasks due in the next 7 days</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {groupedTasks.today.length > 0 && (
          <div className="px-6 py-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Today</h3>
            <div className="space-y-3">
              {groupedTasks.today.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
        
        {groupedTasks.tomorrow.length > 0 && (
          <div className="px-6 py-3 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tomorrow</h3>
            <div className="space-y-3">
              {groupedTasks.tomorrow.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
        
        {groupedTasks.upcoming.length > 0 && (
          <div className="px-6 py-3 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Upcoming</h3>
            <div className="space-y-3">
              {groupedTasks.upcoming.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
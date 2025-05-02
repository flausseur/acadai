"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";

interface StudyProgressProps {
  tasks: Task[];
}

export function StudyProgress({ tasks }: StudyProgressProps) {
  // Calculate total estimated and completed hours
  const totalEstimatedHours = tasks.reduce((acc, task) => acc + (task.estimatedHours || 0), 0);
  const totalCompletedHours = tasks.reduce((acc, task) => acc + (task.completedHours || 0), 0);
  
  // Calculate completed percentage
  const completedPercentage = totalEstimatedHours 
    ? Math.min(100, Math.round((totalCompletedHours / totalEstimatedHours) * 100)) 
    : 0;
  
  // Prepare data for pie chart
  const data = [
    { name: "Completed", value: totalCompletedHours, color: "hsl(var(--chart-2))" },
    { name: "Remaining", value: Math.max(0, totalEstimatedHours - totalCompletedHours), color: "hsl(var(--muted))" },
  ];

  // If no tasks have hours, show a message
  if (totalEstimatedHours === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Study Progress</CardTitle>
          <CardDescription>Track your study hours</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center">
          <p className="mt-2 text-sm text-muted-foreground">
            No study hours tracked yet. Add estimated hours to your tasks to see progress.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
        <CardDescription>Track your study hours</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} hours`, ""]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center">
          <div className="text-2xl font-bold">{completedPercentage}%</div>
          <p className="text-sm text-muted-foreground">
            {totalCompletedHours} of {totalEstimatedHours} hours completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryIcon, getCategoryColor } from "@/components/ui/icons";
import { Task, TaskCategory } from "@/lib/types";

interface CategoryBreakdownProps {
  tasks: Task[];
}

export function CategoryBreakdown({ tasks }: CategoryBreakdownProps) {
  // Count tasks by category
  const categoryCounts: Record<string, number> = {};
  
  tasks.forEach(task => {
    if (categoryCounts[task.category]) {
      categoryCounts[task.category]++;
    } else {
      categoryCounts[task.category] = 1;
    }
  });

  // Prepare data for pie chart
  const data = Object.entries(categoryCounts).map(([category, count]) => ({
    name: category,
    value: count,
    color: getCategoryColor(category as TaskCategory),
  }));

  // Sort data by count (descending)
  data.sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Categories</CardTitle>
        <CardDescription>Breakdown of tasks by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} tasks`, ""]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div style={{ color: category.color }}>
                <CategoryIcon
                  category={category.name as TaskCategory}
                  className="h-4 w-4"
                />
              </div>
              <span className="text-xs">
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}: {category.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
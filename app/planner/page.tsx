"use client";

import { format, startOfWeek, addDays, parseISO } from "date-fns";
import { useState } from "react";
import { 
  Bar,
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

import { AddTaskButton } from "@/components/add-task-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryIcon, getCategoryColor } from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStudyPlan, mockTasks } from "@/lib/data";
import { StudySession, Task } from "@/lib/types";

export default function PlannerPage() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [studyPlan] = useState(mockStudyPlan);
  const [activeTab, setActiveTab] = useState<string>("weekly");

  // Get the week days for the current study plan
  const weekStart = parseISO(studyPlan.weekStart);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Transform study sessions for chart data
  const chartData = weekDays.map((day) => {
    const dayStr = format(day, "yyyy-MM-dd");
    const daySessions = studyPlan.sessions.filter(
      (session) => session.date === dayStr
    );

    const totalMinutes = daySessions.reduce(
      (acc, session) => acc + session.durationMinutes,
      0
    );

    return {
      name: format(day, "EEE"),
      date: format(day, "MMM d"),
      hours: Math.round(totalMinutes / 60),
      completed: daySessions
        .filter((session) => session.completed)
        .reduce((acc, session) => acc + session.durationMinutes, 0) / 60,
      planned: daySessions
        .filter((session) => !session.completed)
        .reduce((acc, session) => acc + session.durationMinutes, 0) / 60,
    };
  });

  // Group sessions by day
  const sessionsByDay: Record<string, StudySession[]> = {};
  studyPlan.sessions.forEach((session) => {
    if (!sessionsByDay[session.date]) {
      sessionsByDay[session.date] = [];
    }
    sessionsByDay[session.date].push(session);
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
        <p className="text-muted-foreground">
          AI-powered study schedules to help you prepare effectively for your deadlines.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Weekly Study Hours</CardTitle>
                    <CardDescription>
                      {format(weekStart, "MMMM d")} - {format(addDays(weekStart, 6), "MMMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <Button variant="outline">Generate New Plan</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tickLine={false}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        label={{ 
                          value: "Hours", 
                          angle: -90, 
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                          fill: "hsl(var(--muted-foreground))",
                        }} 
                      />
                      <Tooltip
                        formatter={(value) => [`${value} hours`, ""]}
                        labelFormatter={(label, payload) => payload[0]?.payload.date || ""}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="completed" 
                        name="Completed" 
                        stackId="a" 
                        fill="hsl(var(--chart-2))" 
                      />
                      <Bar 
                        dataKey="planned" 
                        name="Planned" 
                        stackId="a" 
                        fill="hsl(var(--chart-4))" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {weekDays.map((day) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const daySessions = sessionsByDay[dayStr] || [];
              
              return (
                <Card key={dayStr} className={daySessions.length === 0 ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {format(day, "EEEE, MMMM d")}
                    </CardTitle>
                    <CardDescription>
                      {daySessions.length === 0
                        ? "No study sessions scheduled"
                        : `${daySessions.length} study ${
                            daySessions.length === 1 ? "session" : "sessions"
                          }`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    {daySessions.length > 0 ? (
                      <div className="space-y-3">
                        {daySessions.map((session) => {
                          const task = tasks.find((t) => t.id === session.taskId);
                          return (
                            <div 
                              key={session.id} 
                              className="flex items-start gap-3 p-3 rounded-md"
                              style={{ 
                                backgroundColor: task 
                                  ? `${getCategoryColor(task.category)}15` 
                                  : "var(--muted)" 
                              }}
                            >
                              {task && (
                                <div style={{ color: getCategoryColor(task.category) }}>
                                  <CategoryIcon
                                    category={task.category}
                                    className="h-5 w-5 mt-0.5"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {task ? task.title : "Unknown Task"}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {session.startTime} - {session.endTime} (
                                  {session.durationMinutes / 60} hours)
                                </div>
                                {task?.course && (
                                  <div className="text-xs text-muted-foreground">
                                    {task.course}
                                  </div>
                                )}
                              </div>
                              <div>
                                <Button
                                  size="sm"
                                  variant={session.completed ? "outline" : "default"}
                                  className="h-8 px-2 text-xs"
                                >
                                  {session.completed ? "Completed" : "Mark Complete"}
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          No study sessions scheduled for this day.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Add Session
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Study Recommendations</CardTitle>
                <CardDescription>
                  Personalized recommendations based on your upcoming deadlines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold mb-2">Prioritize Statistics Exam</h3>
                  <p className="text-sm text-muted-foreground">
                    Your Statistics exam is coming up in 5 days. Consider allocating at least 2 hours daily for review, focusing on chapters 3 and 5 as noted in your task details.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold mb-2">Balance Work on Research Paper</h3>
                  <p className="text-sm text-muted-foreground">
                    Your Quantum Computing research paper is due in 10 days. You've completed 40% of the estimated work. Try to allocate 1-2 hours daily to stay on track.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold mb-2">Group Project Preparation</h3>
                  <p className="text-sm text-muted-foreground">
                    Your Marketing group presentation is in 3 days. Schedule a meeting with team members soon to coordinate slide preparation.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/30">
                  <h3 className="font-semibold mb-2">Study Break Recommendation</h3>
                  <p className="text-sm text-muted-foreground">
                    You've been studying consistently for 4 days. Consider taking a short break tomorrow to prevent burnout, then resume with fresh energy.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Optimized Study Schedule</CardTitle>
                <CardDescription>
                  AI-generated schedule based on your productivity patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Your Peak Productivity Times</h3>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        Based on your completed sessions, you appear to be most productive between <span className="font-semibold">9:00 AM - 12:00 PM</span> and <span className="font-semibold">3:00 PM - 6:00 PM</span>.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recommended Focus Blocks</h3>
                    <ul className="space-y-2">
                      <li className="p-2 border rounded flex justify-between items-center">
                        <span className="text-sm">Morning Focus: 9:00 AM - 11:00 AM</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          High Priority Tasks
                        </span>
                      </li>
                      <li className="p-2 border rounded flex justify-between items-center">
                        <span className="text-sm">Afternoon Focus: 2:00 PM - 4:00 PM</span>
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                          Medium Priority Tasks
                        </span>
                      </li>
                      <li className="p-2 border rounded flex justify-between items-center">
                        <span className="text-sm">Evening Review: 7:00 PM - 8:00 PM</span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                          Review & Planning
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Subject Distribution</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Optimal distribution of your study time across subjects this week:
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Statistics</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-chart-1 w-[35%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Quantum Computing</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-chart-2 w-[25%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Marketing</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-chart-3 w-[20%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Chemistry</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-chart-4 w-[20%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddTaskButton />
    </div>
  );
}
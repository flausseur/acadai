"use client";

import { format, isToday, startOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { AddTaskButton } from "@/components/add-task-button";
import { Button } from "@/components/ui/button";
import { CategoryIcon, getCategoryColor } from "@/components/ui/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEvents } from "@/lib/data";
import { CalendarEvent, TaskCategory } from "@/lib/types";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>(mockEvents);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [view, setView] = useState<"month" | "week">("month");

  const filteredEvents = events.filter((event) => 
    categoryFilter ? event.category === categoryFilter : true
  );

  const handlePreviousPeriod = () => {
    if (view === "month") {
      const previousMonth = new Date(currentDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      setCurrentDate(previousMonth);
    } else {
      const previousWeek = new Date(currentDate);
      previousWeek.setDate(previousWeek.getDate() - 7);
      setCurrentDate(previousWeek);
    }
  };

  const handleNextPeriod = () => {
    if (view === "month") {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setCurrentDate(nextMonth);
    } else {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentDate(nextWeek);
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthStartDate = startOfWeek(monthStart);
    const days = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Create calendar days
    for (let i = 0; i < 42; i++) {
      const day = addDays(monthStartDate, i);
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isCurrentDay = isToday(day);
      
      // Find events for this day
      const dayEvents = filteredEvents.filter(
        (event) => format(new Date(event.start), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      );

      days.push(
        <div
          key={i}
          className={`relative h-32 border p-1 ${
            !isCurrentMonth 
              ? "bg-muted/30 text-muted-foreground" 
              : "bg-background"
          } ${
            isCurrentDay 
              ? "border-primary" 
              : ""
          }`}
        >
          <div className={`text-xs font-medium mb-1 ${isCurrentDay ? "text-primary" : ""}`}>
            {format(day, "d")}
          </div>
          <div className="overflow-y-auto max-h-24">
            {dayEvents.map((event) => (
              <div 
                key={event.id}
                className="text-xs p-1 mb-1 rounded truncate flex items-center"
                style={{ backgroundColor: `${getCategoryColor(event.category)}20` }}
              >
                <span 
                  className="mr-1"
                  style={{ color: getCategoryColor(event.category) }}
                >
                  <CategoryIcon category={event.category} className="h-3 w-3" />
                </span>
                <span className="truncate">{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-[1px] text-center mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="font-medium text-sm py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[1px] auto-rows-fr">{days}</div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = [];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Create week days
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const isCurrentDay = isToday(day);
      
      // Find events for this day
      const dayEvents = filteredEvents.filter(
        (event) => format(new Date(event.start), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      );

      days.push(
        <div key={i} className="flex flex-col">
          <div 
            className={`text-center py-2 border-b ${
              isCurrentDay 
                ? "bg-primary/10 font-semibold" 
                : ""
            }`}
          >
            <div className="text-sm">{daysOfWeek[i]}</div>
            <div className={`text-xl ${isCurrentDay ? "text-primary" : ""}`}>
              {format(day, "d")}
            </div>
          </div>
          <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[500px]">
            {dayEvents.map((event) => (
              <div 
                key={event.id}
                className="p-2 rounded text-sm flex items-start gap-2"
                style={{ backgroundColor: `${getCategoryColor(event.category)}20` }}
              >
                <span 
                  className="mt-0.5"
                  style={{ color: getCategoryColor(event.category) }}
                >
                  <CategoryIcon category={event.category} className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(event.start), "h:mm a")}
                    {event.end !== event.start && ` - ${format(new Date(event.end), "h:mm a")}`}
                  </div>
                </div>
              </div>
            ))}
            {dayEvents.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">
                No events
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-[1px] border rounded-lg overflow-hidden min-h-[600px]">
        {days}
      </div>
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          View and manage all your deadlines in a calendar format.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold ml-2">
            {view === "month" 
              ? format(currentDate, "MMMM yyyy")
              : `${format(startOfWeek(currentDate), "MMM d")} - ${format(endOfWeek(currentDate), "MMM d, yyyy")}`
            }
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="assignment">Assignment</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="reading">Reading</SelectItem>
              <SelectItem value="thesis">Thesis</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week")}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
        <Tabs value={view}>
          <TabsContent value="month">
            <div className="p-4">
              {renderMonthView()}
            </div>
          </TabsContent>
          <TabsContent value="week">
            {renderWeekView()}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Category Legend</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7">
          {(["assignment", "exam", "project", "reading", "thesis", "meeting", "other"] as TaskCategory[]).map((category) => (
            <div 
              key={category}
              className="flex items-center gap-2 p-2 rounded"
              style={{ backgroundColor: `${getCategoryColor(category)}20` }}
            >
              <span style={{ color: getCategoryColor(category) }}>
                <CategoryIcon category={category} className="h-4 w-4" />
              </span>
              <span className="text-sm capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>

      <AddTaskButton />
    </div>
  );
}
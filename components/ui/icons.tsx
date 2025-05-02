"use client";

import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  Flame, 
  GraduationCap, 
  Library, 
  PencilLine, 
  ScrollText, 
  Users 
} from "lucide-react";
import { TaskCategory } from "@/lib/types";

interface CategoryIconProps {
  category: TaskCategory;
  className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  switch (category) {
    case "assignment":
      return <FileText className={className} />;
    case "exam":
      return <ScrollText className={className} />;
    case "project":
      return <Users className={className} />;
    case "reading":
      return <BookOpen className={className} />;
    case "thesis":
      return <GraduationCap className={className} />;
    case "meeting":
      return <Calendar className={className} />;
    case "other":
    default:
      return <PencilLine className={className} />;
  }
}

export function getCategoryColor(category: TaskCategory): string {
  switch (category) {
    case "assignment":
      return "hsl(var(--chart-1))";
    case "exam":
      return "hsl(var(--chart-2))";
    case "project":
      return "hsl(var(--chart-3))";
    case "reading":
      return "hsl(var(--chart-4))";
    case "thesis":
      return "hsl(var(--chart-5))";
    case "meeting":
      return "hsl(var(--primary))";
    case "other":
    default:
      return "hsl(var(--muted-foreground))";
  }
}

export const dashboardIcons = {
  upcoming: Clock,
  overdue: Flame,
  completed: CheckCircle,
  resources: Library,
};
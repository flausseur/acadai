export type TaskCategory = 
  | "assignment"
  | "exam"
  | "project"
  | "reading"
  | "thesis"
  | "meeting"
  | "other";

export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  course?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedHours?: number;
  completedHours?: number;
  attachments?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  category: TaskCategory;
  taskId?: string;
}

export interface StudySession {
  id: string;
  taskId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  userId: string;
  weekStart: string;
  weekEnd: string;
  sessions: StudySession[];
  createdAt: string;
}

export interface AcademicResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  createdAt: string;
}
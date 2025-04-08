export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  text: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  addTask: (text: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTaskPriority: (id: string, priority: Priority) => void;
} 
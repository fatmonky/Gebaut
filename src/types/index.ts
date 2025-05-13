export type Priority = 'high' | 'medium' | 'low';
export type ImpactPriority = 'high' | 'medium' | 'low';
export type UrgencyPriority = 'very_urgent' | 'medium_urgent' | 'not_urgent';

export interface Task {
  id: string;
  text: string;
  priority: Priority;
  impactPriority: ImpactPriority;
  urgencyPriority: UrgencyPriority;
  dueDate?: Date;
  delegatedTo?: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
} 
export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface Checklist {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}
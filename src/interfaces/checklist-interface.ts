import type { Task } from './task-interface';

export interface Checklist {
    id: number;
    name: string;
    description: string;
    tasks: Task[];
}
   
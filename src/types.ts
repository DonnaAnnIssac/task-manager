export type TaskStatus = "IN_PROGRESS" | "DONE";

export interface TaskContent {
  title: string;
  description: string;
}

export interface Task extends TaskContent {
  id: number;
  status: TaskStatus;
}

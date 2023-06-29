export interface TodoItem {
  id: string | number;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt?: Date | null;
  completedAt?: Date | null;
}

export interface Todo {
  id: string | number;
  title: string;
  order: number;
  items: TodoItem[];
  createdAt: Date;
  updatedAt: Date;
}

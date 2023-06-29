import { Todo, TodoItem } from "~/types";

export interface TodoAPI {
  getTodos: () => Promise<Todo[]>;
  getTodo: (id: Todo["id"]) => Promise<Todo>;
  createTodo: (data: Partial<Todo>) => Promise<Todo>;
  updateTodo: (id: Todo["id"], data: Todo) => Promise<Todo>;
  deleteTodo: <T extends string | number>(id: T) => Promise<T>;
}

class TodoWeb2 implements TodoAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Request failed: ${response.status} - ${error}`);
    }
    return response.json();
  }

  private buildUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  public async getTodos(): Promise<Todo[]> {
    const response = await fetch(
      this.buildUrl("/todos?_sort=order,createdAt&_order=asc,desc")
    );
    return await this.handleResponse(response);
  }

  public async getTodo(id: Todo["id"]): Promise<Todo> {
    const response = await fetch(this.buildUrl(`/todos/${id}`));
    const todo = (await this.handleResponse(response)) as Todo;

    todo.items = todo.items.sort((a, b) => {
      if (a.completedAt === null && b.completedAt !== null) {
        return -1;
      } else if (a.completedAt !== null && b.completedAt === null) {
        return 1;
      } else {
        return 0;
      }
    });

    return todo;
  }

  public async createTodo(data: Partial<Todo>): Promise<Todo> {
    const payload = {
      items: [],
      ...data,
      createdAt: new Date(),
    };

    const response = await fetch(this.buildUrl("/todos"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return this.handleResponse(response);
  }

  public async updateTodo(id: Todo["id"], data: Todo): Promise<Todo> {
    const response = await fetch(this.buildUrl(`/todos/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, updatedAt: new Date() }),
    });
    return this.handleResponse(response);
  }

  public async deleteTodo<T extends string | number>(id: T): Promise<T> {
    await fetch(this.buildUrl(`/todos/${id}`), { method: "DELETE" });

    return id;
  }

  // public async createItem(listId: string | number, todoItem: TodoItem) {
  //   const response = await fetch(this.buildUrl(`/todos/${listId}/todoItems`), {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(todoItem),
  //   });
  //   return this.handleResponse(response);
  // }

  // public async updateItem(
  //   listId: string | number,
  //   todoItemId: string | number,
  //   todoItem: TodoItem
  // ) {
  //   const response = await fetch(
  //     this.buildUrl(`/todos/${listId}/todoItems/${todoItemId}`),
  //     {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(todoItem),
  //     }
  //   );
  //   return this.handleResponse(response);
  // }

  // public async deleteItem(
  //   listId: string | number,
  //   todoItemId: string | number
  // ) {
  //   await fetch(this.buildUrl(`/todos/${listId}/todoItems/${todoItemId}`), {
  //     method: "DELETE",
  //   });
  // }
}

export default new TodoWeb2("http://localhost:3000");

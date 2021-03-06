import { makeAutoObservable, runInAction } from "mobx";
import { ITodo, TodoDTO } from "../../interfaces";
import { AppStore } from "../appstore";
import { config } from "../../config";
export class Todos {
  todos: ITodo[] = [];
  message: string = "";
  todosState: string = "pending";
  constructor(private rootStore: AppStore) {
    this.getAllTodos = this.getAllTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    makeAutoObservable(this);
  }
  async getAllTodos() {
    const fetchTodos = await fetch(`${config.serverUrl}/todos`, {
      headers: {
        authorization: "Bearer " + this.rootStore.auth.token,
      },
    });
    this.todosState = "pending";
    try {
      const res = await fetchTodos.json();
      runInAction(() => {
        if (res.stauts >= 400) {
          this.todosState = "failed";
          this.message = res.message;
        } else {
          this.todosState = "success";
          this.todos = res.todos;
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        this.todosState = "failed";
        this.message = error.message;
      }
    }
  }
  async createTodo(todo: TodoDTO) {
    const postTodo = await fetch(`${config.serverUrl}/todos`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.rootStore.auth.token,
      },
      body: JSON.stringify(todo),
    });
    try {
      const res = await postTodo.json();
      runInAction(() => {
        this.message = res.message;
      });
    } catch (error) {
      if (error instanceof Error) {
        this.message = error.message;
      }
    }
  }

  async updateTodo(id: string, todo: TodoDTO) {
    const fetchUpdateTodo = await fetch(`${config.serverUrl}/todos/${id}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.rootStore.auth.token,
      },
      body: JSON.stringify(todo),
    });
    try {
      const res = await fetchUpdateTodo.json();
      runInAction(() => {
        this.getAllTodos();
        this.message = res.message;
      });
    } catch (error) {
      if (error instanceof Error) {
        this.message = error.message;
      }
    }
  }
  async deleteTodo(id: string) {
    const fetchDelteTodo = await fetch(`${config.serverUrl}/todos/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.rootStore.auth.token,
      },
    });
    try {
      const res = await fetchDelteTodo.json();
      runInAction(() => {
        this.getAllTodos();
        this.message = res.message;
      });
    } catch (error) {
      if (error instanceof Error) {
        this.message = error.message;
      }
    }
  }
}

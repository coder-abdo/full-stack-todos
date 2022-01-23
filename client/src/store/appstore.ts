import { makeAutoObservable } from "mobx";
import { Auth } from "./auth/auth";
import { Todos } from "./todos/todos";

export class AppStore {
  auth: Auth;
  todos: Todos;
  constructor() {
    this.auth = new Auth();
    this.todos = new Todos(this);
    makeAutoObservable(this);
  }
}

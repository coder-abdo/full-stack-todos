export interface ITodo {
  _id: string;
  createdAt?: string;
  title: string;
  completed: boolean;
}
export interface IUser {
  username: string;
  email: string;
  password: string;
  todos: ITodo[];
}
export interface userDTO {
  username: string;
  email: string;
  password: string;
}
export interface loginDTO {
  email: string;
  password: string;
}
export interface TodoDTO {
  title: string;
  completed: boolean;
}

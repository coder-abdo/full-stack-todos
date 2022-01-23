import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { ITodo } from "../interfaces";
import { useStore } from "../store/store";

export const Todos = observer(() => {
  const {
    todos: { getAllTodos, todos },
  } = useStore();
  React.useEffect(() => {
    getAllTodos();
  }, [todos]);
  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo: ITodo) => (
            <li
              key={todo._id}
              style={{
                textDecoration: `${todo.completed ? "line-through" : "none"}`,
              }}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>no todos yet, create one</p>
      )}

      <Link to="/create-todos">go create todo</Link>
    </>
  );
});

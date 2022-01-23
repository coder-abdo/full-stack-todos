import React from "react";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TodoDTO } from "../interfaces";
import { useStore } from "../store/store";
import { Navigate } from "react-router-dom";
const schema = yup
  .object({
    title: yup.string().required(),
    completed: yup.boolean().required(),
  })
  .required();
export const AddTodo = observer(() => {
  const {
    todos: { createTodo, todosState },
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      completed: false,
    },
  });
  const addTodo: SubmitHandler<TodoDTO> = (data: TodoDTO) => {
    console.log(errors);
    createTodo(data);
  };
  return (
    <div>
      <form noValidate onSubmit={handleSubmit(addTodo)}>
        <div>
          <label htmlFor="title">title:</label>
          <input type="text" {...register("title")} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label htmlFor="">completed:</label>
          <input type="checkbox" {...register("completed")} />
        </div>
        <input type="submit" value="add todo" />
      </form>
      {todosState === "success" && <Navigate to="/todos" replace={true} />}
    </div>
  );
});

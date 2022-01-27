import React from "react";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TodoDTO } from "../interfaces";
import { useStore } from "../store/store";
import { Navigate } from "react-router-dom";
import {
  CheckBox,
  Form,
  Holder,
  Input,
  Label,
  Mark,
  Message,
  SubmitInput,
} from "../components/Input";
const schema = yup
  .object({
    title: yup.string().required(),
    completed: yup.boolean().required(),
  })
  .required();
export const AddTodo = observer(() => {
  const [success, setSuccess] = React.useState(false);
  const {
    todos: { createTodo },
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
    createTodo(data);
    setSuccess(true);
  };
  return (
    <>
      <Form noValidate onSubmit={handleSubmit(addTodo)}>
        <Holder>
          <Label htmlFor="title">title:</Label>
          <Input type="text" {...register("title")} />
          {errors.title && <Message>{errors.title.message}</Message>}
        </Holder>
        <Holder>
          <Label htmlFor="checkbox">completed:</Label>
          <CheckBox type="checkbox" id="checkbox" {...register("completed")} />
          <Mark />
        </Holder>
        <SubmitInput big type="submit" value="add todo" />
      </Form>
      {success && <Navigate to="/todos" replace={true} />}
    </>
  );
});

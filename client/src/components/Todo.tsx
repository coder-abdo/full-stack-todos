import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { FaTrash, FaPen } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CheckBox,
  Form,
  Holder,
  Input,
  Label,
  Mark,
  Message,
  SubmitInput,
} from "./Input";
import { ITodo, TodoDTO } from "../interfaces";
import { useStore } from "../store/store";
type TodoProps = {
  todo: ITodo;
};
type TitleProps = {
  completed?: boolean;
};
const ListItem = styled.li`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #11bdff;
  color: #fff;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;
const IconsHolder = styled.div`
  display: flex;
  .icon {
    font-size: 1.8rem;
    margin-left: 1.5rem;
    color: red;
    &:hover {
      cursor: pointer;
    }
    &:first-child {
      color: yellow;
    }
  }
`;
const Title = styled.h3<TitleProps>`
  font-size: 2.4rem;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;
const schema = yup
  .object({
    title: yup.string().required(),
    completed: yup.boolean().required(),
  })
  .required();
export const Todo: React.FunctionComponent<TodoProps> = observer(({ todo }) => {
  const [showUpdate, setShowUpdate] = React.useState(false);
  const {
    todos: { updateTodo, deleteTodo },
  } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoDTO>({
    resolver: yupResolver(schema),
  });
  const handleupdatetodo: SubmitHandler<TodoDTO> = (data: TodoDTO) => {
    updateTodo(todo._id, data);
    setShowUpdate(false);
  };
  const handleDelete = (id: string) => {
    deleteTodo(id);
  };
  return (
    <ListItem>
      <Title completed={todo.completed}>{todo.title}</Title>
      <IconsHolder>
        <FaPen className="icon" onClick={() => setShowUpdate(true)} />
        <FaTrash className="icon" onClick={() => handleDelete(todo._id)} />
      </IconsHolder>
      {showUpdate && (
        <Form noValidate onSubmit={handleSubmit(handleupdatetodo)}>
          <Holder>
            <Label htmlFor="title">title:</Label>
            <Input type="text" {...register("title")} value={todo.title} />
            {errors.title && <Message>{errors.title.message}</Message>}
          </Holder>
          <Holder>
            <Label htmlFor="checkbox">completed:</Label>
            <CheckBox
              type="checkbox"
              id="checkbox"
              {...register("completed")}
            />
            <Mark />
          </Holder>
          <SubmitInput big secondary type="submit" value="update todo" />
        </Form>
      )}
    </ListItem>
  );
});

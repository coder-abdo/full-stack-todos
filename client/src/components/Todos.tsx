import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ITodo } from "../interfaces";
import { useStore } from "../store/store";
import { Todo } from "./Todo";
import { Message } from "./Input";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  width: 100%;
  max-width: 50rem;
  align-self: center;
`;
const Title = styled.h1`
  font-size: 2.7rem;
  color: #11bdff;
  margin-bottom: 2rem;
  padding-left: 2rem;
`;
export const Todos = observer(() => {
  const {
    todos: { getAllTodos, todos, todosState },
  } = useStore();

  React.useEffect(() => {
    getAllTodos();
  }, [todos.length]);
  return (
    <Container>
      {todosState === "pending" ? (
        <div>loading...</div>
      ) : todos.length > 0 ? (
        <List>
          <Title>My Todos:</Title>
          {todos.map((todo: ITodo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </List>
      ) : (
        <Message>no todos yet, create one</Message>
      )}

      <Link to="/create-todos" className="link">
        go create todo
      </Link>
    </Container>
  );
});

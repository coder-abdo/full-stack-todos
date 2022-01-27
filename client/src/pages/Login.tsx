import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import { loginDTO } from "../interfaces";
import {
  Form,
  Input,
  Holder,
  Label,
  SubmitInput,
  Message,
  Title,
} from "../components/Input";
const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  })
  .required();
export const Login = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDTO>({
    resolver: yupResolver(schema),
  });
  const {
    auth: { login, message, isAuthenticated, state },
  } = useStore();

  const handleLogin: SubmitHandler<loginDTO> = (data: loginDTO) => {
    login(data);
  };
  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      {state === "failed" && <Message error>{message}</Message>}
      {isAuthenticated && <Navigate to="/" replace={true} />}
      <Title>welcome, Login</Title>
      <Holder>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          error={errors.email === null}
          placeholder="example@me.com"
        />
        {errors.email && <Message error>{errors.email.message}</Message>}
      </Holder>
      <Holder>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          {...register("password")}
          error={errors.password === null}
          placeholder="password"
        />
        {errors.password && <Message error>{errors.password.message}</Message>}
      </Holder>
      <SubmitInput big type="submit" value="login" />
      <Link to="/signup" className="redirect">
        Haven't Registered Yet?
      </Link>
    </Form>
  );
});

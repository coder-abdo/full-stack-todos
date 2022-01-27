import { observer } from "mobx-react-lite";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import { userDTO } from "../interfaces";
import {
  Form,
  Holder,
  Input,
  Label,
  Message,
  SubmitInput,
} from "../components/Input";
const schema = yup
  .object({
    username: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  })
  .required();
export const Signup = observer(() => {
  const {
    auth: { signup, message, state },
  } = useStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<userDTO>({
    resolver: yupResolver(schema),
  });
  const handleSignup = (data: userDTO) => {
    signup(data);
  };

  return (
    <Form onSubmit={handleSubmit(handleSignup)}>
      {state === "failed" && <Message error>{message}</Message>}
      {state === "success" && <Navigate to="/login" replace={true} />}
      <Holder>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" id="username" {...register("username")} />
        {errors.username && <Message error>{errors.username.message}</Message>}
      </Holder>
      <Holder>
        <Label htmlFor="email">Email:</Label>
        <Input type="email" id="email" {...register("email")} />
        {errors.email && <Message error>{errors.email.message}</Message>}
      </Holder>
      <Holder>
        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" {...register("password")} />
        {errors.password && <Message error>{errors.password.message}</Message>}
      </Holder>
      <SubmitInput big type="submit" value="signup" />
      <Link to="/login" className="redirect">
        Already have an account?
      </Link>
    </Form>
  );
});

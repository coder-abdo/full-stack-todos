import React from "react";
import { Link } from "react-router-dom";
import { Title } from "../components/Input";

export const NotFound = () => {
  return (
    <div>
      <Title>OOps!! you are lost</Title>
      <Link to="/" className="link">
        Go Home
      </Link>
    </div>
  );
};

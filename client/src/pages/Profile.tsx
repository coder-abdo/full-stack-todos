import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";

export const Profile = observer(() => {
  const {
    auth: { getUser, user, state },
  } = useStore();
  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {state === "failed" && <p>you need to login first</p>}
      {user && <h1>hi, {user.username}</h1>}
    </div>
  );
});

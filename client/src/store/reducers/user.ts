import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  authenticated: boolean;
}

const initialUserState: UserState = {
  authenticated: false,
};

export const userSlice = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

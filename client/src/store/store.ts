import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "./reducers/user"

export const store = configureStore({
    reducer: {
        User: UserSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
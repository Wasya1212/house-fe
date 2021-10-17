import { configureStore } from "@reduxjs/toolkit";

import { announcementApi } from "./announcement-api";
import { userApi } from "./user-api";

import userReducer from "./slice/user-slice";

export const store = configureStore({
    reducer: {
        [announcementApi.reducerPath]: announcementApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        announcementApi.middleware,
        userApi.middleware
    ),
    devTools: true
});
import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./room";

const store = configureStore({
    reducer: {
        room: roomReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

export default store;
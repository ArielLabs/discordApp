import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./room";

const store = configureStore({
    reducer: {
        room: roomReducer
    }
})

export default store;
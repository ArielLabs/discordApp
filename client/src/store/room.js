import { createSlice } from "@reduxjs/toolkit";

const initRoomState = {
    identity: '',
    isRoomHost: false
}

const roomSlice = createSlice({
    name: 'room',
    initialState: initRoomState,
    reducers: {
        setIsRoomHost(state, action){
            state.isRoomHost = action.payload;
        }
    }
})

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
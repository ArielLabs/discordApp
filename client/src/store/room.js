import { createSlice } from "@reduxjs/toolkit";

const initRoomState = {
    identity: '',
    isRoomHost: false,
    connectWithAudio: false
}

const roomSlice = createSlice({
    name: 'room',
    initialState: initRoomState,
    reducers: {
        setIsRoomHost(state, action){
            state.isRoomHost = action.payload;
        },
        setConnectWithAudio(state, action){
            state.connectWithAudio = action.payload;
        }
    }
})

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
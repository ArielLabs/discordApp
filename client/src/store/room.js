import { createSlice } from "@reduxjs/toolkit";

const initRoomState = {
    id: null,
    identity: '',
    isRoomHost: false,
    connectWithAudio: false,
    participants: []
}

const roomSlice = createSlice({
    name: 'room',
    initialState: initRoomState,
    reducers: {
        setRoomId(state, action){
            state.id = action.payload;
        },
        setIdentity(state, action){
            state.identity = action.payload;
        },
        setIsRoomHost(state, action){
            state.isRoomHost = action.payload;
        },
        setConnectWithAudio(state, action){
            state.connectWithAudio = action.payload;
        },
        setParticipants(state, action){
            state.participants = [...action.payload];
        }
    }
})

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
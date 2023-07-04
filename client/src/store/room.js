import { createSlice } from "@reduxjs/toolkit";

const initRoomState = {
    id: null,
    userId: null,
    identity: '',
    isRoomHost: false,
    connectWithAudio: false,
    isMuted: false,
    isDisplayVideo: true,
    participants: [],
    streams: [],
    messages: [],
    activeConversation: null,
    directChatHistory: {}
}

const roomSlice = createSlice({
    name: 'room',
    initialState: initRoomState,
    reducers: {
        setRoomId(state, action){
            state.id = action.payload;
        },
        setUserId(state, action){
            state.userId = action.payload;
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
        },
        setStreams(state, action){
            state.streams = [...action.payload];
        },
        setMessages(state, action){
            state.messages = [...action.payload];
        },
        setActiveConversation(state, action){
            state.activeConversation = action.payload;
        },
        setIsMuted(state){
            state.isMuted = !state.isMuted;
        },
        setIsDisplayVideo(state){
            state.isDisplayVideo = !state.isDisplayVideo;
        }
    }
})

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
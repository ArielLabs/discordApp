import { createNewRoom, joinRoom } from "../utils/wss";

let localStream;

const showLocalVideoPreview = (stream) => {

}

export const getLocalPreviewAndInitRoomConnection = async(isRommHost, identity, roomId= null) => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
        localStream = stream;
        showLocalVideoPreview(localStream);

        if(isRommHost){
            createNewRoom(identity);
        }else{
            joinRoom(identity, roomId);
        }
    }).catch((err) => {
        console.log("error occured when trying to get an access to local stream");
        console.log(err);
    })
}
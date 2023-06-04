let localStream;

const showLocalVideoPreview = (stream) => {

}

export const getLocalPreviewAndInitRoomConnection = async(isRommHost, identity, roomId= null) => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
        console.log("here");
        localStream = stream;
        showLocalVideoPreview(localStream);
    }).catch((err) => {
        console.log("error occured when trying to get an access to local stream");
        console.log(err);
    })
}
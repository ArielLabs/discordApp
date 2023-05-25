import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { roomActions } from "../../store/room";
import { useLocation } from "react-router-dom";
import styles from "./JoinRoomPage.module.css";

const JoinRoomPage = () => {
    const dispatch = useDispatch();
    const search = useLocation().search;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get('host');
        if(isRoomHost){
            dispatch(roomActions.setIsRoomHost(true));
        }
    }, []);

    return(
        <div className={styles.joinRoom}>
            <div className={styles.joinRoomPanel}></div>
        </div>
    );
}

export default JoinRoomPage;
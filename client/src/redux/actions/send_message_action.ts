import { MESSAGE_SEND, MESSAGE_RECEIVED, ROOM } from "./send_message_action_type";

export const dispatchSendMessage = (socket: any, props: { message: string, room: string }) => (dispatch: any) => {
    socket.emit("send_message", { message: props.message, room: props.room });
    dispatch({
        type: MESSAGE_SEND,
        payload: props.message
    });
} 

export const dispatchReceiveMessage = (socket: any) => (dispatch: any) => {
    socket.on("receive_message", (data: any) => {
        // alert(data)
        // console.log(data.message)
        dispatch({
            type: MESSAGE_RECEIVED,
            payload: data.message
        });
    });
} 

export const dispatchSetRoom = (socket: any, props: { room: string }) => (dispatch: any) => {
    socket.emit("join_room", props.room);
    dispatch({
        type: ROOM,
        payload: props.room
    });
}
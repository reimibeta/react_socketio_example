import { SEND_MESSAGE } from "./send_message_action_type";
import { connect } from 'socket.io-client';

const socket = connect("http://localhost:3001");

export const dispatchSendMessage = (props: { message: string, room: string }) => (dispatch: any) => {
    socket.emit("send_message", { message: props.message, room: props.room });
    dispatch({
        type: SEND_MESSAGE,
        payload: {
            message: props.message,
            room: props.room
        }
    });
}
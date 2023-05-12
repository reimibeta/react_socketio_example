import { MESSAGE_SEND, MESSAGE_RECEIVED, ROOM } from "../actions/send_message_action_type";

const initState = {
    room: '',
    messageSend: '',
    messageReceived: '',
}

export const messages = (state = initState, action: any) => {
    if(action.type === ROOM){
        return {
            ...state,
            room: action.payload ?? initState.room
        }
    }
    if(action.type === MESSAGE_SEND){
        return {
            ...state,
            messageSend: action.payload ?? initState.messageSend
        }
    }
    if(action.type === MESSAGE_RECEIVED){
        return {
            ...state,
            messageReceived: action.payload ?? initState.messageReceived
        }
    }
    return state;
}
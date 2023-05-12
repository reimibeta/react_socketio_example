import { SEND_MESSAGE } from "../actions/send_message_action_type";

const initState = {
    message: '',
}

export const messages = (state = initState, action: any) => {
    if(action.type === SEND_MESSAGE){
        return {
            ...state,
            message: action.payload ?? initState.message
        }
    }
    return state;
}
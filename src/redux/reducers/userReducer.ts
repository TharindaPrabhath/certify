import UserDto from "../../types/models/UserDto";
import { UserActionType } from "../actions/ActionTypes";

export interface UserAction{
    type: UserActionType,
    payload: {
        user: UserDto
    }
}

interface State{
    currentUser: UserDto | null | undefined
}

const initialState:State = {
    currentUser: null
}

const userReducer = (state: State = initialState, action: UserAction): State => {
    switch (action.type){
        case UserActionType.SET_USER:
            return {...state, currentUser: action.payload.user}
        case UserActionType.REMOVE_USER:
            return {...state, currentUser:action.payload.user}
        default:
            return state;
    }
}

export default userReducer;
import AdminDto from "../../types/models/AdminDto";
import { AdminActionType } from "../actions/ActionTypes";

export interface Action {
    type: AdminActionType,
    payload: {
        admin: AdminDto
    }
}

export interface State{
    currentAdmin: AdminDto | null | undefined
}

const initialState:State = {
    currentAdmin: {
        id: 0,
        username: "",
        email: ""
    }
}

const adminReducer = (state: State = initialState, action: Action): State => {
    switch (action.type){
        case AdminActionType.INITIATE_ADMIN:
            return {...state, currentAdmin: action.payload.admin};
       
        case AdminActionType.REMOVE_ADMIN:
            return {...StaticRange, currentAdmin: null};

        default:
            return state;
    }
}

export default adminReducer;
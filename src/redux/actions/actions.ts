import { Dispatch } from "react"
import AdminDto from "../../types/models/AdminDto"
import { Action } from "../reducers/adminReducer"
import { AdminActionType } from "./ActionTypes"

export const initAdmin = (admin: AdminDto) => {
    return ((dispatch: Dispatch<Action>) => {
        dispatch({
            type: AdminActionType.INITIATE_ADMIN,
            payload: {
                admin: admin
            }
        })
    })
}

export const removeAdmin = () => {
    return ( (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AdminActionType.REMOVE_ADMIN,
            payload: {
                admin: null!
            }
        })
    }) 
   
}
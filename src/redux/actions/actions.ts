import { Dispatch } from "react"
import AdminDto from "../../types/models/AdminDto"
import CertificateDto from "../../types/models/CertificateDto"
import UserDto from "../../types/models/UserDto"
import { AdminAction } from "../reducers/adminReducer"
import { CertificateAction } from "../reducers/certificateReducer"
import { UserAction } from "../reducers/userReducer"
import { AdminActionType, CertificateActionType, UserActionType } from "./ActionTypes"

export const initAdmin = (admin: AdminDto) => {
    return ((dispatch: Dispatch<AdminAction>) => {
        dispatch({
            type: AdminActionType.INITIATE_ADMIN,
            payload: {
                admin: admin
            }
        })
    })
}

export const removeAdmin = () => {
    return ( (dispatch: Dispatch<AdminAction>) => {
        dispatch({
            type: AdminActionType.REMOVE_ADMIN,
            payload: {
                admin: null!
            }
        })
    }) 
   
}

export const setUser = (user: UserDto) => {
    return ((dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionType.SET_USER,
            payload: {
                user: user
            }
        })
    } ) 
}

export const removeUser = () => {
    return ( (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionType.REMOVE_USER,
            payload: {
                user: null!
            }
        })
    }) 
   
}


export const setCertificate = (certificate: CertificateDto) => {
    return ((dispatch: Dispatch<CertificateAction>) => {
        dispatch({
            type: CertificateActionType.SET_CERTIFICATE,
            payload: {
                certificate: certificate
            }
        })
    } ) 
}

export const removeCertificate = () => {
    return ( (dispatch: Dispatch<CertificateAction>) => {
        dispatch({
            type: CertificateActionType.REMOVE_CERTIFICATE,
            payload: {
                certificate: null!
            }
        })
    }) 
   
}
import CertificateDto from "../../types/models/CertificateDto";
import { CertificateActionType } from "../actions/ActionTypes";

export interface CertificateAction {
    type: CertificateActionType,
    payload: {
        certificate: CertificateDto
    }
}

interface State{
    currentCertificate: CertificateDto | null | undefined
}

const initialState:State = {
    currentCertificate: null
}

const certificateReducer = (state: State = initialState, action: CertificateAction): State => {
    switch (action.type){
        case CertificateActionType.SET_CERTIFICATE:
            return {...state, currentCertificate: action.payload.certificate}
        
        case CertificateActionType.REMOVE_CERTIFICATE:
            return {...state, currentCertificate: null}

        default:
            return state;
    }
}

export default certificateReducer;
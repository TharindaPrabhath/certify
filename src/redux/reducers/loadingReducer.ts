import { LoadingActionType } from "../actions/ActionTypes";

export interface LoadingAction {
    type: LoadingActionType,
    payload: {
        loading: boolean
    }
}

interface State{
    loading: boolean;
}

const initialState:State = {
    loading: false
}

const loadingReducer = (state: State = initialState, action: LoadingAction): State => {
    switch (action.type){
        case LoadingActionType.SET_LOADING:
            return {...state, loading: action.payload.loading}
        
        default:
            return state;
    }
}

export default loadingReducer;
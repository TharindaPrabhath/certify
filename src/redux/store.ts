import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import adminReducer from "./reducers/adminReducer"
import userReducer from "./reducers/userReducer"
import certificateReducer from "./reducers/certificateReducer"

const reducer = combineReducers({
    adminReducer,
    userReducer,
    certificateReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)),
)

export default store;

export type ReducerType = ReturnType<typeof reducer>
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import adminReducer from "./reducers/adminReducer"

const reducer = combineReducers({
    adminReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)),
)

export default store;

export type ReducerType = ReturnType<typeof reducer>
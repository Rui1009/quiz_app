import {applyMiddleware, combineReducers, createStore} from "redux";
import {rootReducer} from "./modules/RootModule";
import reduxLogger from "redux-logger";

export const buildStore = (
    createStore(
        combineReducers(
            rootReducer,
        ),
        applyMiddleware(reduxLogger)
    )
)
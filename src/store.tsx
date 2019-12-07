import {applyMiddleware, combineReducers, createStore} from "redux";
import {rootReducer} from "./modules/RootModule";
import reduxLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/RootSaga";

export const sagaMiddleware = createSagaMiddleware();

export const buildStore = (
    createStore(
            rootReducer,
            applyMiddleware(reduxLogger, sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)
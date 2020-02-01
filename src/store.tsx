import {rootReducer} from "./modules/RootModule";
import reduxLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/RootSaga";
import {configureStore} from "@reduxjs/toolkit";
import { routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'

export const sagaMiddleware = createSagaMiddleware();

export const history = createHashHistory()

export const buildStore = (
    configureStore({
        reducer: rootReducer(history),
        middleware: [sagaMiddleware, routerMiddleware(history)]
    })
)

sagaMiddleware.run(rootSaga)
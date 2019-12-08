import React from 'react';
import actionCreatorFactory from "typescript-fsa";
import {LoginInfoType} from "../Types/type";
import {reducerWithInitialState} from "typescript-fsa-reducers";

const actionTypes = {
    SET_LOGIN: "SET_LOGIN"
}

const actionCreator = actionCreatorFactory();

export const LoginActionCreator = {
    setLogin: actionCreator<LoginInfoType>(actionTypes.SET_LOGIN)
}
export interface loginType {
    loginStatus: boolean,
    errorMessage: string
}

const initialState: loginType = {
    loginStatus: false,
    errorMessage: ""
}

export const loginReducer = reducerWithInitialState(initialState)
    .case(LoginActionCreator.setLogin, (state: loginType, payload: LoginInfoType) =>
        payload.username === "るい" && payload.password === "るいるい" ? {loginStatus: true, errorMessage: ""} : {loginStatus: false, errorMessage: "ユーザー名かパスワードが違います。"}
    )

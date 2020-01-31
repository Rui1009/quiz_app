import React from 'react';
import {LoginInfoType} from "../Types/type";
import {createSlice} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";
import { push } from 'react-router-redux'


export interface loginType {
    loginStatus: boolean,
    errorMessage: string
}

const initialState: loginType = {
    loginStatus: false,
    errorMessage: ""
}


const loginSlice = createSlice({
    name: "setLogin",
    initialState: initialState,
    reducers: {
        setLogin(state: loginType, action: {payload: boolean}) {
            return(
            action.payload ?
                {...state, loginStatus: true} : {...state, loginStatus: false}
            )},
        setErrorMessage(state: loginType, action: {payload: string}) {
            return (
                {...state, errorMessage: action.payload}
            )
    }
}})

export const getLogoutSliceReducer = createSlice({
    name: "getLogout",
    initialState: "",
    reducers: {
        getLogout(state: string, action: {payload: string}) {
            return state
        }
    }
})

export const postLoginSliceReducer = createSlice({
    name: "postLogin",
    initialState: "",
    reducers: {
        postLogin(state: string, action: {payload: LoginInfoType}) {
            return state
        }
    }
})


function* getLogout() {
    try {
        const result = yield call(Api.get, "https://sleepy-hamlet-35316.herokuapp.com/login/logout")
        console.log(result)
    } catch (e) {
        console.log("logout error")
        console.log(e)
    }
}

function* postLoginInfo(action: {type: string, payload: LoginInfoType}) {
    try {
        const result: AxiosResponse<any> = (yield call(Api.loginPost, "https://sleepy-hamlet-35316.herokuapp.com/login", action.payload))
        console.log(result)
        if (result.status < 400) {
            yield put(loginSlice.actions.setLogin(true))
            yield put(push("/home"))
        } else {
            yield put(loginSlice.actions.setLogin(false))
        }
    } catch (e) {
        console.log("login post error")
        yield put(loginSlice.actions.setLogin(false))
        yield put(loginSlice.actions.setErrorMessage("ユーザー名またはパスワードが違います。"))
        console.log(e)
    }
}

export const loginSaga = [
    takeLatest(postLoginSliceReducer.actions.postLogin, postLoginInfo),
    takeLatest(getLogoutSliceReducer.actions.getLogout, getLogout)
]

export default loginSlice
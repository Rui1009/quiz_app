import React from 'react';
import {LoginInfoType} from "../Types/type";
import {createSlice} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {call, takeLatest, put, delay} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";




export interface loginType {
    loginStatus: boolean,
    errorMessage: string
}

const initialState: loginType = {
    loginStatus: true,
    errorMessage: ""
}


const loginSlice = createSlice({
    name: "setLogin",
    initialState: initialState,
    reducers: {
        setLogin(state: loginType, action: {payload: boolean}) {
            return(
            action.payload ?
                {loginStatus: true, errorMessage: ""} : {loginStatus: false, errorMessage: "ユーザー名かパスワードが違います。"}
            )}
    }
})

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
        const result = yield call(Api.get, "http://localhost:9001/login/logout")
        console.log(result)
    } catch (e) {
        console.log("logout error")
        console.log(e)
    }
}

function* postLoginInfo(action: {type: string, payload: LoginInfoType}) {
    try {
        const result: AxiosResponse<any> = (yield call(Api.loginPost, "http://localhost:9001/login", action.payload))
        console.log(result)
        if (result.status < 400) {
            yield put(loginSlice.actions.setLogin(true))
        } else {
            yield put(loginSlice.actions.setLogin(false))
        }
    } catch (e) {
        console.log("login post error")
        yield put(loginSlice.actions.setLogin(false))
        console.log(e)
    }
}

export const loginSaga = [
    takeLatest(postLoginSliceReducer.actions.postLogin, postLoginInfo),
    takeLatest(getLogoutSliceReducer.actions.getLogout, getLogout)
]

export default loginSlice
import React from "react"
import {LoginInfoType, modificatonInfoType, PersonalInfoType, RankingType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";
import {createSlice} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";


export const loadUserSliceReducer = createSlice({
    name: "loadUser",
    initialState: "",
    reducers: {
        loadUser(state: string, action: {payload: {param: string}}) {
            return state
        }
    }
})

export const userSliceReducer = createSlice({
    name: "user",
    initialState: "",
    reducers: {
        setUser(state: string, action: {payload: string}) {
            return (action.payload)
        }
    }
})

const Istate: PersonalInfoType = {
    username: "",
    password: "",
    icon: "",
    point: 0,
    status: ""
}

export const userDetailSliceReducer = createSlice({
    name: "userDetail",
    initialState: Istate,
    reducers: {
        setUserDetail(state: PersonalInfoType, action: {payload: PersonalInfoType}) {
               return (action.payload)
        }
    }
})

export const postNewUserSliceReducer = createSlice({
    name: "postNewUser",
    initialState: "",
    reducers: {
        postNewUser(state: string, action: {payload: LoginInfoType}) {
            return state
        }
    }
})

export const loadRankingSliceReducer = createSlice({
    name: "loadRanking",
    initialState: "",
    reducers: {
        loadRanking(state: string, action: {payload: string}) {
            return state
        }
    }
})

const initialRankingState: RankingType[] = []

export const setRankingSliceReducer = createSlice({
    name: "setRanking",
    initialState: initialRankingState,
    reducers: {
        setRanking(state: RankingType[], action: {payload: RankingType[]}) {
            return action.payload
        }
    }
})

export const setModifiedInfoSliceReducer = createSlice({
    name: "setModifiedInfo",
    initialState: "",
    reducers: {
        setModifiedInfo(state: string, action: {payload: modificatonInfoType}) {
            return state
        }
    }
})

function* fetchUserInfo(action: {type: string, payload: {param: string}}) {
    try {
        const result = (yield call(Api.get, `https://sleepy-hamlet-35316.herokuapp.com/profile/?user=${action.payload.param}`))["data"]

        yield put(userDetailSliceReducer.actions.setUserDetail(result))
    } catch (e) {
        console.log(e);
    }
}

function* fetchRanking() {
    try {
        const result = (yield call(Api.get, "https://sleepy-hamlet-35316.herokuapp.com/ranking"))["data"]
        yield put(setRankingSliceReducer.actions.setRanking(result))
    } catch (e) {
        console.log(e)
    }
}

function* postNewUserInfo(action: {type: string, payload: LoginInfoType}) {
    try {
        const result: AxiosResponse<any> = (yield call(Api.loginPost, "https://sleepy-hamlet-35316.herokuapp.com/newRegistration", action.payload))
    } catch (e) {
        console.log(e)
    }
}

function* postModifiedUserInfo(action: {type: string, payload: modificatonInfoType}) {
    try {
        const result: AxiosResponse<any> = (yield call(Api.modificationPost, "https://sleepy-hamlet-35316.herokuapp.com/modificationUserInfo", action.payload))
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}

export const userSaga = [
    takeLatest(loadUserSliceReducer.actions.loadUser, fetchUserInfo),
    takeLatest(loadRankingSliceReducer.actions.loadRanking, fetchRanking),
    takeLatest(postNewUserSliceReducer.actions.postNewUser, postNewUserInfo),
    takeLatest(setModifiedInfoSliceReducer.actions.setModifiedInfo, postModifiedUserInfo)
    ]
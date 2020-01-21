import React from "react"
import {PersonalInfoType, RankingType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";
import {createSlice} from "@reduxjs/toolkit";


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
//多分もういらない
const initialPlayingUserState: PersonalInfoType = {
    username: "",
    password: "",
    icon: "",
    point: 0
}

export const playingUserSliceReducer = createSlice({
    name: "playinguser",
    initialState: initialPlayingUserState,
    reducers: {
        setPlayingUser(state: PersonalInfoType, action: {payload: PersonalInfoType}) {
            return action.payload
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

function* fetchUserInfo(action: {type: string, payload: {param: string}}) {
    try {
        const result = (yield call(Api.get, `http://localhost:9001/profile/?user=${action.payload.param}`))["data"]
        console.log(result)
        yield put(userDetailSliceReducer.actions.setUserDetail(result))
    } catch (e) {
        console.log("fetchUser error");
        console.log(e)
    }
}

function* fetchRanking() {
    try {
        const result = (yield call(Api.get, "http://localhost:9001/ranking"))["data"]
        console.log(result)
        yield put(setRankingSliceReducer.actions.setRanking(result))
    } catch (e) {
        console.log("fetchRanking error");
        console.log(e)
    }
}

export const userSaga = [
    takeLatest(loadUserSliceReducer.actions.loadUser, fetchUserInfo),
    takeLatest(loadRankingSliceReducer.actions.loadRanking, fetchRanking)
    ]
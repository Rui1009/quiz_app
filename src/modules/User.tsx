import React from "react"
import {PersonalInfoType} from "../Types/type";
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

const Istate: PersonalInfoType[] = []

export const userDetailSliceReducer = createSlice({
    name: "userDetail",
    initialState: Istate,
    reducers: {
        setUserDetail(state: PersonalInfoType[], action: {payload: PersonalInfoType[]}) {
               return (action.payload)
        }
    }
})

const initialPlayingUserState: PersonalInfoType = {
    username: "",
    password: "",
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


function* fetchUserInfo(action: {type: string, payload: {param: string}}) {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/personal_info"))["data"]
        console.log(result)
        yield put(userDetailSliceReducer.actions.setUserDetail(result))
    } catch (e) {
        console.log("fetchUser error");
        console.log(e)
    }
}

export const userSaga = [takeLatest(loadUserSliceReducer.actions.loadUser, fetchUserInfo)]
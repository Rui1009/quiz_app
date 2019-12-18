import React from "react"
import actionCreatorFactory from "typescript-fsa";
import {PersonalInfoType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";
import {createSlice} from "@reduxjs/toolkit";

const actionTypes = {
    LOAD_USER: "LOAD_USER"
}

const actionCreator = actionCreatorFactory();

export const SetUserActionCreator = {
    loadUser: actionCreator<void>(actionTypes.LOAD_USER)
}

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


function* fetchUserInfo() {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/personal_info"))["data"]
        console.log(result)
        yield put(userDetailSliceReducer.actions.setUserDetail(result))
    } catch (e) {
        console.log("fetchUser error");
        console.log(e)
    }
}

export const userSaga = [takeLatest(actionTypes.LOAD_USER, fetchUserInfo)]
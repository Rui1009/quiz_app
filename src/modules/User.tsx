import React from "react"
import actionCreatorFactory from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {PersonalInfoType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";

const actionTypes = {
    SET_USER: "SET_USER",
    SET_USER_DETAIL: "SET_USER_DETAIL",
    LOAD_USER: "LOAD_USER"
}

const actionCreator = actionCreatorFactory();

export const SetUserActionCreator = {
    setUser: actionCreator<string>(actionTypes.SET_USER),
    setUserDetail: actionCreator<PersonalInfoType[]>(actionTypes.SET_USER_DETAIL),
    loadUser: actionCreator<void>(actionTypes.LOAD_USER)
}

const initialState: string = "";

export const userReducer = reducerWithInitialState(initialState)
    .case<string>(SetUserActionCreator.setUser, (state: string, payload: string) =>
        payload
    )

const initialInfoState: PersonalInfoType[] = []

export const userDetailReducer = reducerWithInitialState(initialInfoState)
    .case(SetUserActionCreator.setUserDetail, (state: PersonalInfoType[], payload: PersonalInfoType[]) =>
        state.concat(payload)
    )

function* fetchUserInfo() {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/personal_info"))["data"]
        console.log(result)
        yield put(SetUserActionCreator.setUserDetail(result))
    } catch (e) {
        console.log("fetchUser error");
        console.log(e)
    }
}

export const userSaga = [takeLatest(actionTypes.LOAD_USER, fetchUserInfo)]
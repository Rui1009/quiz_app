import * as React from "react";
import {createSlice} from "@reduxjs/toolkit";
import {AnswerResultType} from "../Types/type";
import {AxiosResponse} from "axios";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";

const initialGrowState: boolean = false


export const answerGrowSliceReducer = createSlice({
    name: "setGrowOpen",
    initialState: initialGrowState,
    reducers: {
        setGrowOpen(state: boolean, action: {payload: boolean}) {
            return (action.payload)
        }
    }

})

const initialAnswerState: string[] = []

export const answerSliceReducer = createSlice({
    name: "setAnswer",
    initialState: initialAnswerState,
    reducers: {
        setAnswer(state: string[], action: {payload: string}) {
            return (state.concat(action.payload))
        },
        resetAnswer(state: string[], action) {
            return []
        }
    }
})

const initialResultState: string[] = []

export const resultSliceReducer = createSlice({
    name: "setResult",
    initialState: initialResultState,
    reducers: {
        setResult(state: string[], action: {payload: string}) {
            return (state.concat(action.payload))
        },
        resetResult(state: string[], action) {
            return []
        }
    }
})

export const postResultSliceReducer = createSlice({
    name: "postResult",
    initialState: "",
    reducers: {
        postResult(state: string, action: {payload: AnswerResultType[]}) {
            return state
        }
    }
})

function* postAnswerResult(action: {type: string, payload: AnswerResultType[]}) {
    try {
        const result: AxiosResponse<any> = (yield call(Api.answerPost, "http://localhost9001/answerResult", action.payload))
        console.log(result)
    } catch (e) {
        console.log("post error")
    }
}

export const answerResultSaga = [takeLatest(postResultSliceReducer.actions.postResult, postAnswerResult)]



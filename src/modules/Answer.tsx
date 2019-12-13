import * as React from "react"
import {reducerWithInitialState} from "typescript-fsa-reducers";
import actionCreatorFactory from "typescript-fsa";
import {string} from "prop-types";
import {createSlice} from "@reduxjs/toolkit";

// export const actionTypes = {
//     SET_GROW_OPEN: "SET_GROW_OPEN",
//     SET_ANSWER: "SET_ANSWER",
//     SET_RESULT: "SET_RESULT"
// }
// //
// const actionCreator = actionCreatorFactory();
//
//
// export const SetAnserActionCreator = {
//     setAnswer: actionCreator<string>(actionTypes.SET_ANSWER),
//     setResult: actionCreator<string>(actionTypes.SET_RESULT)
// }

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
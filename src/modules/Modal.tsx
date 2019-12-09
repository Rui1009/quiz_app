import React from "react"
import {reducerWithInitialState} from "typescript-fsa-reducers";
import actionCreatorFactory from "typescript-fsa";
import { createSlice } from '@reduxjs/toolkit'

export interface modalType {
    questionStartModal: boolean
}

const modalSlice = createSlice({
    name: "setModal",
    initialState: {questionStartModal: false},
    reducers: {
        open(state: modalType, action: {payload: string}) {
            return({
            ...state,
            [action.payload]: true
        })},
        close(state: modalType, action: {payload: string}) {
            return ({
                ...state,
                [action.payload]: false
            })
        }
    }
})

export default modalSlice
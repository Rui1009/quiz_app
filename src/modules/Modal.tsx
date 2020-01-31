import React from "react"
import { createSlice } from '@reduxjs/toolkit'

export interface modalType {
    questionStartModal: boolean
    postQuizModal: boolean
}

const modalSlice = createSlice({
    name: "setModal",
    initialState: {questionStartModal: false, postQuizModal: false},
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
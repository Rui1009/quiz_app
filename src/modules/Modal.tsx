import React from "react"
import {reducerWithInitialState} from "typescript-fsa-reducers";
import actionCreatorFactory from "typescript-fsa";
import { createSlice } from '@reduxjs/toolkit'



// const actionTypes = {
//     SET_MODAL_OPEN: "SET_MODAL_OPEN",
//     SET_MODAL_CLOSE: "SET_MODAL_CLOSE"
// }
//
// const actionCreator = actionCreatorFactory();
//
// export const ModalOpenActionCreator = {
//     setModalOpen: actionCreator<string>(actionTypes.SET_MODAL_OPEN),
//     setModalClose: actionCreator<string>(actionTypes.SET_MODAL_CLOSE)
// }
//
export interface modalType {
    questionStartModal: boolean
}
//
// export const initialState: modalType = {
//     questionStartModal: false
// }
//
// export const modalReducer = reducerWithInitialState(initialState)
//     .case<string>(ModalOpenActionCreator.setModalOpen, (state: modalType, payload: string) => ({
//         ...state,
//         [payload]: true
//     }))
//     .case<string>(ModalOpenActionCreator.setModalClose, (state: modalType, payload: string) => ({
//         ...state,
//         [payload]: false
//     }))

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
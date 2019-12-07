import React from "react"
import {reducerWithInitialState} from "typescript-fsa-reducers";
import actionCreatorFactory from "typescript-fsa";
import {string} from "prop-types";

export const actionTypes = {
    SET_GROW_OPEN: "SET_GROW_OPEN",
    SET_ANSWER: "SET_ANSWER",
    SET_RESULT: "SET_RESULT"
}

const actionCreator = actionCreatorFactory();

export const GrowOpenActionCreator = {
    setGrowOpen: actionCreator<boolean>(actionTypes.SET_GROW_OPEN),
}

export const SetAnserActionCreator = {
    setAnswer: actionCreator<string>(actionTypes.SET_ANSWER),
    setResult: actionCreator<string>(actionTypes.SET_RESULT)
}

const initialGrowState: boolean = false

export const answerGrowReducer = reducerWithInitialState(initialGrowState)
    .case<boolean>(GrowOpenActionCreator.setGrowOpen, (state: boolean, payload: boolean) =>
        payload
    )


const initialAnswerState: string[] = []

export const answerReducer = reducerWithInitialState(initialAnswerState)
    .case(SetAnserActionCreator.setAnswer, (state: string[], payload: string) =>
            state.concat(payload)
    )

const initialResultState: string[] = []

export const resultReducer = reducerWithInitialState(initialResultState)
    .case(SetAnserActionCreator.setResult, (state: string[], payload: string) =>
        state.concat(payload)
    )
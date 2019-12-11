import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { Action } from "typescript-fsa"
import {EasyQuizType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import axios from "axios"
import {Api} from "../Api/Api";
import {createSlice} from "@reduxjs/toolkit";


const actionTypes = {
    LOAD_EASY_QUESTION: "LOAD_EASY_QUESTION",
    LOAD_INTERMEDIATE_QUESTION: "LOAD_INTERMEDIATE_QUESTION",
    //SET_QUESTION: "SET_QUESTION"
}

const actionCreator = actionCreatorFactory();

export const SetQuestionActionCreator = {
    //setQuestion: actionCreator<EasyQuizType[]>(actionTypes.SET_QUESTION),
    loadEasyQuestion: actionCreator<void>(actionTypes.LOAD_EASY_QUESTION),
    loadIntermediateQuestion: actionCreator<void>(actionTypes.LOAD_INTERMEDIATE_QUESTION)
}

const initialState: EasyQuizType[] = []

// export const questionReducer = reducerWithInitialState(initialState)
//     .case<EasyQuizType[]>(SetQuestionActionCreator.setQuestion, (state: EasyQuizType[], payload: EasyQuizType[]) =>
//         payload
//     )
//

export const questionSliceReducer = createSlice({
    name: "setQuestion",
    initialState: initialState,
    reducers: {
        setQuestion(state: EasyQuizType[], action: {payload: EasyQuizType[]}) {
            return(action.payload)
        }
    }
})

function* fetchEasyQuestions() {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/easy_quiz_data"))["data"];
        for(let i = result.length - 1; i >=0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = result[i]
            result[i] = result[j]
            result[j] = temp
        }
        yield put(questionSliceReducer.actions.setQuestion(result))
    } catch(e) {
        console.log("fetchEasyQuestion error");
        console.log(e)
    }
}

function* fetchInterMediateQuestion() {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/intermediate_quiz_data"))["data"];
        for(let i = result.length - 1; i >=0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = result[i]
            result[i] = result[j]
            result[j] = temp
        }
        yield put(questionSliceReducer.actions.setQuestion(result))
    } catch(e) {
        console.log("fetchInterMediateQuestion error");
        console.log(e)
    }
}

export const questoinSaga = [
    takeLatest(actionTypes.LOAD_EASY_QUESTION, fetchEasyQuestions),
    takeLatest(actionTypes.LOAD_INTERMEDIATE_QUESTION, fetchInterMediateQuestion)
];
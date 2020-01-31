import {EasyQuizType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";
import {createSlice} from "@reduxjs/toolkit";

const initialState: EasyQuizType[] = []

export const loadEasyQuizSliceReducer = createSlice({
    name: "loadEasyQuiz",
    initialState: "",
    reducers: {
        loadEasyQuiz(state: string, action: {payload: string}) {
            return state
        }
    }
})

export const loadIntermediateQuizSliceReducer = createSlice({
    name: "loadEasyQuiz",
    initialState: "",
    reducers: {
        loadIntermediateQuiz(state: string, action: {payload: string}) {
            return state
        }
    }
})

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
        const result = (yield call(Api.get, "https://sleepy-hamlet-35316.herokuapp.com/easyQuiz"))["data"];
        console.log(result)
        for(let i = result.length - 1; i >=0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = result[i]
            result[i] = result[j]
            result[j] = temp
        }
        yield put(questionSliceReducer.actions.setQuestion(result))
    } catch(e) {
        console.log("fetchQuestion error");
        console.log(e)
    }
}

function* fetchInterMediateQuestion() {
    try {
        const result = (yield call(Api.get, "https://sleepy-hamlet-35316.herokuapp.com/intermediateQuiz"))["data"];
        for(let i = result.length - 1; i >=0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = result[i]
            result[i] = result[j]
            result[j] = temp
        }
        yield put(questionSliceReducer.actions.setQuestion(result))
    } catch(e) {
        console.log("fetchQuestion error");
        console.log(e)
    }
}

export const questoinSaga = [
    takeLatest(loadEasyQuizSliceReducer.actions.loadEasyQuiz, fetchEasyQuestions),
    takeLatest(loadIntermediateQuizSliceReducer.actions.loadIntermediateQuiz, fetchInterMediateQuestion)
];
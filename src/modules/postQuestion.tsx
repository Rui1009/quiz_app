import {call, takeLatest, put} from "@redux-saga/core/effects"
import {Api} from "../Api/Api";
import {createSlice} from "@reduxjs/toolkit";
import {postQuizType} from "../Types/type";

export const postQuestionSliceReducer = createSlice({
    name: "postQuestion",
    initialState: {
        username: "",
        level: "",
        question: "",
        answer: "",
        description: "",
        field: ""
    },
    reducers: {
        postQuestion(state: postQuizType, action: {payload: postQuizType}) {
            return state
        }
    }
})

function* postOriginalQuestion(action: {type: string, payload: postQuizType}) {
    try {
        const result = (yield call(Api.quizPost, "https://sleepy-hamlet-35316.herokuapp.com/postQuiz", action.payload))["data"]
        console.log(result)
    } catch (e) {
        console.log(e)
    }
}

export const postQuizSaga = [
    takeLatest(postQuestionSliceReducer.actions.postQuestion, postOriginalQuestion)
]


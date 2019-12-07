import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { Action } from "typescript-fsa"
import {EasyQuizType} from "../Types/type";
import {call, takeLatest, put} from "@redux-saga/core/effects"
import axios from "axios"
import {Api} from "../Api/Api";


const actionTypes = {
    LOAD_QUESTION: "LOAD_QUESTION",
    SET_QUESTION: "SET_QUESTION"
}

const actionCreator = actionCreatorFactory();

export const SetQuestionActionCreator = {
    setQuestion: actionCreator<EasyQuizType[]>(actionTypes.SET_QUESTION),
    loadQuestion: actionCreator<void>(actionTypes.LOAD_QUESTION)
}

const initialState: EasyQuizType[] = []

export const questionReducer = reducerWithInitialState(initialState)
    .case<EasyQuizType[]>(SetQuestionActionCreator.setQuestion, (state: EasyQuizType[], payload: EasyQuizType[]) =>
        payload
    )

function* fetchQuestions() {
    try {
        const result = (yield call(Api.get, "http://localhost:3000/easy_quiz_data"))["data"];
        for(let i = result.length - 1; i >=0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = result[i]
            result[i] = result[j]
            result[j] = temp
        }
        console.log(result)
        yield put(SetQuestionActionCreator.setQuestion(result))
    } catch(e) {
        console.log("fetchQuestion error");
        console.log(e)
    }
}

export const questoinSaga = [takeLatest(actionTypes.LOAD_QUESTION, fetchQuestions)];
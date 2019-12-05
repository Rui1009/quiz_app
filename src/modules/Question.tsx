import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { Action } from "typescript-fsa"
import {EasyQuizType} from "../Types/type";


const actionTypes = {
    SET_QUESTION: "SET_QUESTION"
}

const actionCreator = actionCreatorFactory();

export const SetQuestionActionCreator = {
    setQuestion: actionCreator<EasyQuizType[]>(actionTypes.SET_QUESTION)
}

const initialState: EasyQuizType[] = []

export const questionReducer = reducerWithInitialState(initialState)
    .case<EasyQuizType[]>(SetQuestionActionCreator.setQuestion, (state: EasyQuizType[], payload: EasyQuizType[]) =>
        payload
    )
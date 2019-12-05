import { reducer as formReducer } from "redux-form";
import {questionLevelReducer} from "./QuestionLevel";
import { combineReducers } from "redux"
import {modalReducer, modalType} from "./Modal";
import {answerGrowReducer, answerReducer} from "./Answer";
import {questionReducer} from "./Question";
import {EasyQuizType} from "../Types/type";


export interface CombinedState {
    form: any,
    questionLevel: string,
    modalOpen: modalType,
    answerGrow: boolean,
    answer: string[],
    question: EasyQuizType[]
}


export const rootReducer = combineReducers<CombinedState>({
    form: formReducer,
    questionLevel: questionLevelReducer,
    modalOpen: modalReducer,
    answerGrow: answerGrowReducer,
    answer: answerReducer,
    question: questionReducer
})
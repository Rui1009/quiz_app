import { reducer as formReducer } from "redux-form";
import {questionLevelReducer} from "./QuestionLevel";
import { combineReducers } from "redux"
import {modalReducer, modalType} from "./Modal";
import {actionTypes, answerGrowReducer, answerReducer, resultReducer} from "./Answer";
import {questionReducer} from "./Question";
import {EasyQuizType} from "../Types/type";
import {loginReducer, loginType} from "./LogIn";


export interface CombinedState {
    form: any,
    questionLevel: string,
    modalOpen: modalType,
    answerGrow: boolean,
    answer: string[],
    question: EasyQuizType[],
    result: string[],
    login: loginType
}


export const rootReducer = combineReducers<CombinedState>({
    form: formReducer.plugin({
        answerForm: (state, action) => {
            switch (action.type) {
                case actionTypes.SET_RESULT:
                    return undefined;
                default:
                    return state
            }
        }
    }),
    questionLevel: questionLevelReducer,
    modalOpen: modalReducer,
    answerGrow: answerGrowReducer,
    answer: answerReducer,
    question: questionReducer,
    result: resultReducer,
    login: loginReducer
})
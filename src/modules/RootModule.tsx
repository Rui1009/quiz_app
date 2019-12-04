import { reducer as formReducer } from "redux-form";
import {questionLevelReducer} from "./QuestionLevel";
import { combineReducers } from "redux"
import {modalReducer, modalType} from "./Modal";


export interface CombinedState {
    form: any,
    questionLevel: string,
    modalOpen: modalType
}


export const rootReducer = combineReducers<CombinedState>({
    form: formReducer,
    questionLevel: questionLevelReducer,
    modalOpen: modalReducer
})
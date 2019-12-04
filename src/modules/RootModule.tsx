import { reducer as formReducer } from "redux-form";
import {questionLevelReducer} from "./QuestionLevel";
import { combineReducers } from "redux"


export interface CombinedState {
    form: any,
    questionLevel: string
}


export const rootReducer = combineReducers<CombinedState>({
    form: formReducer,
    questionLevel: questionLevelReducer
})
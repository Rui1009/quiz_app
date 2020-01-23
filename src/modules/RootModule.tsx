import { reducer as formReducer } from "redux-form";
import QuestionLevelReducer from "./QuestionLevel";
import { combineReducers } from "redux"
import modalReducer, {modalType} from "./Modal";
import {answerGrowSliceReducer, answerSliceReducer, postResultSliceReducer, resultSliceReducer} from "./Answer";
import {loadEasyQuizSliceReducer, loadIntermediateQuizSliceReducer, questionSliceReducer} from "./Question";
import {EasyQuizType, PersonalInfoType, RankingType} from "../Types/type";
import loginReducer, {loginType} from "./LogIn";
import {
    loadUserSliceReducer,
    setRankingSliceReducer,
    userDetailSliceReducer,
    userSliceReducer
} from "./User";


export interface CombinedState {
    form: any,
    questionLevel: string,
    modalOpen: modalType,
    answerGrow: boolean,
    answer: string[],
    question: EasyQuizType[],
    result: string[],
    login: loginType,
    user: string,
    userDetailInfo: PersonalInfoType,
    ranking: RankingType[],
}


export const rootReducer = combineReducers<CombinedState>({
    form: formReducer.plugin({
        answerForm: (state, action) => {
            switch (action.type) {
                case resultSliceReducer.actions.setResult.toString():
                    return undefined;
                default:
                    return state
            }
        }
    }),
    questionLevel: QuestionLevelReducer.reducer,
    modalOpen: modalReducer.reducer,
    answerGrow: answerGrowSliceReducer.reducer,
    answer: answerSliceReducer.reducer,
    question: questionSliceReducer.reducer,
    result: resultSliceReducer.reducer,
    login: loginReducer.reducer,
    user: userSliceReducer.reducer,
    userDetailInfo: userDetailSliceReducer.reducer,
    ranking: setRankingSliceReducer.reducer,
})
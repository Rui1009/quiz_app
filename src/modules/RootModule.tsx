import { reducer as formReducer } from "redux-form";
import QuestionLevelReducer from "./QuestionLevel";
import { combineReducers } from "redux"
import modalReducer, {modalType} from "./Modal";
import {actionTypes, answerGrowReducer, answerReducer, resultReducer} from "./Answer";
import {questionReducer} from "./Question";
import {EasyQuizType, PersonalInfoType} from "../Types/type";
import {loginReducer, loginType} from "./LogIn";
import {userDetailSliceReducer, userSliceReducer} from "./User";


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
    userDetailInfo: PersonalInfoType[]
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
    questionLevel: QuestionLevelReducer.reducer,
    modalOpen: modalReducer.reducer,
    answerGrow: answerGrowReducer,
    answer: answerReducer,
    question: questionReducer,
    result: resultReducer,
    login: loginReducer,
    user: userSliceReducer.reducer,
    userDetailInfo: userDetailSliceReducer.reducer
})
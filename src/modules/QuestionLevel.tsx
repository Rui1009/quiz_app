import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { Action } from "typescript-fsa";

const actionTypes = {
    SET_QUESTION_LEVEL: "SET_QUESTION_LEVEL"
}

const actionCreator = actionCreatorFactory();

export const QuestionLevelActionCreator = {
    setQuestionLevel: actionCreator<string>(actionTypes.SET_QUESTION_LEVEL)
}

const initialState: string = ""

export const questionLevelReducer = reducerWithInitialState(initialState)
    .case<string>(QuestionLevelActionCreator.setQuestionLevel, (state: string, payload: string) =>
        payload
    )
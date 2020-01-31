import { all } from "redux-saga/effects";
import {questoinSaga} from "./Question";
import {userSaga} from "./User";
import {answerResultSaga} from "./Answer";
import {loginSaga} from "./LogIn";
import {postQuizSaga} from "./postQuestion";

export default function* rootSaga() {
    yield all([
        ...questoinSaga,
        ...userSaga,
        ...answerResultSaga,
        ...loginSaga,
        ...postQuizSaga
    ])
}
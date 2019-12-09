import { all } from "redux-saga/effects";
import {questoinSaga} from "./Question";
import {userSaga} from "./User";

export default function* rootSaga() {
    yield all([
        ...questoinSaga,
        ...userSaga
    ])
}
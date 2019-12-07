import { all } from "redux-saga/effects";
import {questoinSaga} from "./Question";

export default function* rootSaga() {
    yield all([
        ...questoinSaga
    ])
}
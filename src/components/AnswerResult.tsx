import React from "react"
import {CombinedState} from "../modules/RootModule";
import _ from "lodash"
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const AnswerResult = () => {
    const dispatch = useDispatch()
    const result = useSelector((state: CombinedState) => state.result)
    const answer = useSelector((state: CombinedState) => state.answer)
    const question = useSelector((state: CombinedState) => state.question)

    let collectNum = 0;
    for(let i = 0; i < 10; i++) {
        if(result[i] === "O") {
            collectNum++
        }
    }

    return (
        <div>
            <p>{collectNum} / 10問正解</p>
        {
            _.range(10).map((num) =>
                <ul>
                    <li>{result[num]}: 問題: {question[num].question} 正解: {question[num].answer} あなたの解答:{answer[num]}</li>
                </ul>
            )
        }
            <div>
                <Link to={"/home"}>
                    <Button variant={"contained"} color={"secondary"}>ホームへ戻る</Button>
                </Link>
            </div>
        </div>

    )
}

export default AnswerResult
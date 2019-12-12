import React from "react"
import {CombinedState} from "../modules/RootModule";
import _ from "lodash"
import {connect} from "react-redux";
import {EasyQuizType} from "../Types/type";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

interface Props {
    result: string[],
    answer: string[],
    question: EasyQuizType[]
}



const AnswerResult = (props: Props) => {
    let collectNum = 0;
    for(let i = 0; i < 10; i++) {
        if(props.result[i] === "O") {
            collectNum++
        }
    }

    return (
        <div>
            <p>{collectNum} / 10問正解</p>
        {
            _.range(10).map((num) =>
                <ul>
                    <li>{props.result[num]}: 問題: {props.question[num].question} 正解: {props.question[num].answer} あなたの解答:{props.answer[num]}</li>
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

const mapStateToProps = (state: CombinedState) => ({
    result: state.result,
    answer: state.answer,
    question: state.question
})



export default connect(
    mapStateToProps,
    null
)(AnswerResult)
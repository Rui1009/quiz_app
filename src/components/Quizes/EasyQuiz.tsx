import React, {useEffect, useLayoutEffect, useState} from "react"
import {Button, Typography} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import {CombinedState} from "../../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {GrowOpenActionCreator, SetAnserActionCreator} from "../../modules/Answer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {SetQuestionActionCreator} from "../../modules/Question";
import {EasyQuizType} from "../../Types/type";

interface Props {
    answerGrow: boolean,
    answer: string[],
    result: string[],
    question: EasyQuizType[],
    setGrowOpen(value: boolean): void,
    setAnswer(value: string): void,
    setQuestion(value: EasyQuizType[]): void,
    setResult(value: string): void
}



const EasyQuiz = (props: Props) => {
    const [quizNum, setQuizNum] = useState(0)
    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    return(
        <div>
            <Typography variant={"h6"}>第{quizNum + 1}問</Typography>
            <Typography>Q.{props.question[quizNum].question}</Typography>
            {
                props.question[quizNum].option.map((elem: string) => (
                    <Button variant={"contained"} color={"secondary"} disabled={props.answerGrow} onClick={() => {
                        props.setAnswer(elem)
                        props.setGrowOpen(true)
                    }}>{elem}</Button>
                ))}
                <Grow in={props.answerGrow}>
                    <div>
                        { props.question[quizNum].answer === props.answer[quizNum] ?
                            <Typography variant={"h5"} style={{color: "green"}}>⭕️正解: {props.question[quizNum].answer}</Typography>
                            :
                            <Typography variant={"h5"} style={{color: "red"}}>❌不正解/ 正解:{props.question[quizNum].answer}</Typography>
                        }
                        <Typography>{props.question[quizNum].description}</Typography>
                        {  quizNum !== 9 ?
                            <Button variant={"contained"} onClick={() => {
                                props.setGrowOpen(false)
                                props.setResult(props.question[quizNum].answer === props.answer[quizNum] ? "O" : "X")
                                handleQuizNum(quizNum)
                            }}>次の問題へ</Button>
                            :
                            <Link to="/answer_result">
                                <Button variant={"contained"}
                                        color={"default"}
                                        onClick={() => {props.setResult(props.question[quizNum].answer === props.answer[quizNum] ? "O" : "X")}}>解答結果を確認する
                                </Button>
                            </Link>
                        }
                    </div>
                </Grow>
            {
                props.result.map((elem) =>
                    <div>{elem}</div>
                )
            }

        </div>
    )
}

const mapStateToProps = (state: CombinedState) => ({
    answerGrow: state.answerGrow,
    answer: state.answer,
    result: state.result,
    question: state.question
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setGrowOpen: (value: boolean) => {dispatch(GrowOpenActionCreator.setGrowOpen(value))},
    setAnswer: (value: string) => {dispatch(SetAnserActionCreator.setAnswer(value))},
    setQuestion: (value: EasyQuizType[]) => {dispatch(SetQuestionActionCreator.setQuestion(value))},
    setResult: (value: string) => {dispatch(SetAnserActionCreator.setResult(value))}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EasyQuiz)
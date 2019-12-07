import React, {useState} from "react"
import {Button, Typography} from "@material-ui/core";
import {CombinedState} from "../../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {GrowOpenActionCreator, SetAnserActionCreator} from "../../modules/Answer";
import {connect} from "react-redux";
import {IntermediateQuizType} from "../../Types/type";
import Grow from "@material-ui/core/Grow";
import {Link} from "react-router-dom";
import AnswerForm from "../AnswerForm";
import {reset} from "redux-form";


interface Props {
    question: IntermediateQuizType[],
    answerGrow: boolean,
    answer: string[],
    result: string[],
    setGrowOpen(value: boolean): void,
    setAnswer(value: string): void,
    setResult(value: string): void,
}

const IntermediateQuiz = (props: Props) => {
    const [quizNum, setQuizNum] = useState(0)
    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    return(
        <div>
            <Typography variant={"h6"}>第{quizNum + 1}問</Typography>
            <Typography>Q.{props.question[quizNum].question}</Typography>
            <AnswerForm  onSubmit={() => {
                props.setGrowOpen(true)
            }}/>
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
                                    onClick={() => {props.setResult(props.question[quizNum].answer === props.answer[quizNum] ? "O" : "X")}}
                             >解答結果を確認する
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
    question: state.question,
    answerGrow: state.answerGrow,
    result: state.result,
    answer: state.answer
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setGrowOpen: (value: boolean) => {dispatch(GrowOpenActionCreator.setGrowOpen(value))},
    setAnswer: (value: string) => {dispatch(SetAnserActionCreator.setAnswer(value))},
    setResult: (value: string) => {dispatch(SetAnserActionCreator.setResult(value))},
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntermediateQuiz)
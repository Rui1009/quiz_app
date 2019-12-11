import React, {useState} from "react"
import {Button, Typography} from "@material-ui/core";
import {CombinedState} from "../../modules/RootModule";
import {answerGrowSliceReducer, resultSliceReducer} from "../../modules/Answer";
import {connect, useDispatch, useSelector} from "react-redux";
import {IntermediateQuizType} from "../../Types/type";
import Grow from "@material-ui/core/Grow";
import {Link} from "react-router-dom";
import AnswerForm from "../AnswerForm";



interface Props {
    question: IntermediateQuizType[],
}

const IntermediateQuiz = (props: Props) => {
    const [quizNum, setQuizNum] = useState(0)
    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    const dispatch = useDispatch()
    const answerGrow = useSelector((state: CombinedState) => state.answerGrow)
    const answer = useSelector((state: CombinedState) => state.answer)
    const result = useSelector((state: CombinedState) => state.result)
    return(
        <div>
            <Typography variant={"h6"}>第{quizNum + 1}問</Typography>
            <Typography>Q.{props.question[quizNum].question}</Typography>
            <AnswerForm  onSubmit={() => {
                dispatch(answerGrowSliceReducer.actions.setGrowOpen(true))
            }}/>
            <Grow in={answerGrow}>
                <div>
                    { props.question[quizNum].answer === answer[quizNum] ?
                        <Typography variant={"h5"} style={{color: "green"}}>⭕️正解: {props.question[quizNum].answer}</Typography>
                        :
                        <Typography variant={"h5"} style={{color: "red"}}>❌不正解/ 正解:{props.question[quizNum].answer}</Typography>
                    }
                    <Typography>{props.question[quizNum].description}</Typography>
                    {  quizNum !== 9 ?
                        <Button variant={"contained"} onClick={() => {
                            dispatch(answerGrowSliceReducer.actions.setGrowOpen(false))
                            dispatch(resultSliceReducer.actions.setResult(props.question[quizNum].answer === answer[quizNum] ? "O" : "X"))
                            handleQuizNum(quizNum)
                        }}>次の問題へ</Button>
                        :
                        <Link to="/answer_result">
                            <Button variant={"contained"}
                                    color={"default"}
                                    onClick={() => {dispatch(resultSliceReducer.actions.setResult(props.question[quizNum].answer === answer[quizNum] ? "O" : "X"))}}
                             >解答結果を確認する
                            </Button>
                        </Link>
                    }
                </div>
            </Grow>
            {
                result.map((elem) =>
                    <div>{elem}</div>
                )
            }
        </div>
    )
}

const mapStateToProps = (state: CombinedState) => ({
    question: state.question,
})

export default connect(
    mapStateToProps,
    null
)(IntermediateQuiz)
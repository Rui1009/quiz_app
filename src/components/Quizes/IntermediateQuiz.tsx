import React, {useState} from "react"
import {Button, Typography} from "@material-ui/core";
import {CombinedState} from "../../modules/RootModule";
import {answerGrowSliceReducer, resultSliceReducer} from "../../modules/Answer";
import {useDispatch, useSelector} from "react-redux";
import Grow from "@material-ui/core/Grow";
import {Link} from "react-router-dom";
import AnswerForm from "../AnswerForm";


const IntermediateQuiz = () => {
    const [quizNum, setQuizNum] = useState(0)
    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    const dispatch = useDispatch()
    const answerGrow = useSelector((state: CombinedState) => state.answerGrow)
    const answer = useSelector((state: CombinedState) => state.answer)
    const result = useSelector((state: CombinedState) => state.result)
    const question = useSelector((state: CombinedState) => state.question)
    return(
        <div>
            <Typography variant={"h6"}>第{quizNum + 1}問</Typography>
            <Typography>Q.{question[quizNum].question}</Typography>
            <AnswerForm  onSubmit={() => {
                dispatch(answerGrowSliceReducer.actions.setGrowOpen(true))
            }}/>
            <Grow in={answerGrow}>
                <div>
                    { question[quizNum].answer === answer[quizNum] ?
                        <Typography variant={"h5"} style={{color: "green"}}>⭕️正解: {question[quizNum].answer}</Typography>
                        :
                        <Typography variant={"h5"} style={{color: "red"}}>❌不正解/ 正解:{question[quizNum].answer}</Typography>
                    }
                    <Typography>{question[quizNum].description}</Typography>
                    {  quizNum !== 9 ?
                        <Button variant={"contained"} onClick={() => {
                            dispatch(answerGrowSliceReducer.actions.setGrowOpen(false))
                            dispatch(resultSliceReducer.actions.setResult(question[quizNum].answer === answer[quizNum] ? "O" : "X"))
                            handleQuizNum(quizNum)
                        }}>次の問題へ</Button>
                        :
                        <Link to="/answer_result">
                            <Button variant={"contained"}
                                    color={"default"}
                                    onClick={() => {dispatch(resultSliceReducer.actions.setResult(question[quizNum].answer === answer[quizNum] ? "O" : "X"))}}
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

export default IntermediateQuiz
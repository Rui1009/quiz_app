import React, {useEffect, useLayoutEffect, useState} from "react"
import {Button, Typography} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import {CombinedState} from "../../modules/RootModule";
import {answerGrowSliceReducer, answerSliceReducer, resultSliceReducer} from "../../modules/Answer";
import {connect, useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";



const EasyQuiz = () => {
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
            {
                question[quizNum].option.map((elem: string) => (
                    <Button variant={"contained"} color={"secondary"} disabled={answerGrow} onClick={() => {
                        dispatch(answerSliceReducer.actions.setAnswer(elem))
                        dispatch(answerGrowSliceReducer.actions.setGrowOpen(true))
                    }}>{elem}</Button>
                ))}
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
                                        onClick={() => {
                                            dispatch(resultSliceReducer.actions.setResult(question[quizNum].answer === answer[quizNum] ? "O" : "X"))
                                            dispatch(answerGrowSliceReducer.actions.setGrowOpen(false))
                                        }}>解答結果を確認する
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

export default EasyQuiz
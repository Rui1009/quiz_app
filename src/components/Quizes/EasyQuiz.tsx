import React, {useEffect, useLayoutEffect, useState} from "react"
import {Button, Typography} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import {CombinedState} from "../../modules/RootModule";
import {answerGrowSliceReducer, answerSliceReducer, resultSliceReducer} from "../../modules/Answer";
import {connect, useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import _ from "lodash"



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
        <Grid container xs={12}>
            <Grid item container xs={12} justify={"center"}>
                <Typography variant={"h6"}>第{quizNum + 1}問</Typography>
            </Grid>
            <Grid item container xs={12} justify={"center"}>
                <Typography variant={"h6"}>QUESTION</Typography>
            </Grid>
            <Grid item container xs={12} justify={"center"}>
                <Typography>{question[quizNum].question}</Typography>
            </Grid>
            {
                question[quizNum].option.map((elem: string) => (
                    <Grid item container xs={12} justify={"center"}>
                        <Button
                            style={{width: "40%", marginBottom: 15}}
                            variant={"contained"} color={"secondary"} disabled={answerGrow} onClick={() => {
                            dispatch(answerSliceReducer.actions.setAnswer(elem))
                            dispatch(answerGrowSliceReducer.actions.setGrowOpen(true))
                        }}>{elem}</Button>
                    </Grid>
                ))}
                <Grid item container xs={12} justify={"center"}>
                    <Grow in={answerGrow}>
                        <Grid>
                            { question[quizNum].answer === answer[quizNum] ?
                                <Typography variant={"h5"} style={{color: "green"}}>⭕️正解: {question[quizNum].answer}</Typography>
                                :
                                <Typography variant={"h5"} style={{color: "red"}}>❌不正解/ 正解:{question[quizNum].answer}</Typography>
                            }
                            <Typography>{question[quizNum].description}</Typography>
                            {  quizNum !== 9 ?
                                <Button
                                    variant={"contained"} onClick={() => {
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
                        </Grid>
                    </Grow>
                </Grid>
            <Grid item container xs={12} justify={"center"}>
                <Grid item xs={7} container justify={"center"}>
                    {
                        _.range(10).map((num: number) => (
                            <Grid style={{borderRight: "solid 0.5px"}}>
                                <Typography>第{num + 1}問</Typography>
                                <Typography style={{textAlign: "center"}}>{result[num]}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EasyQuiz
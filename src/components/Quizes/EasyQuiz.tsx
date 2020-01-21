import React, {useState} from "react"
import {Button, Typography} from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import {CombinedState} from "../../modules/RootModule";
import {
    answerGrowSliceReducer,
    answerSliceReducer,
    postResultSliceReducer,
    resultSliceReducer
} from "../../modules/Answer";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import _ from "lodash"
import Card from "@material-ui/core/Card";
import {EasyQuizType, PersonalInfoType} from "../../Types/type";



const EasyQuiz = () => {
    const [quizNum, setQuizNum] = useState(0)
    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    const dispatch = useDispatch()
    const answerGrow = useSelector((state: CombinedState) => state.answerGrow)
    const answer = useSelector((state: CombinedState) => state.answer)
    const result = useSelector((state: CombinedState) => state.result)
    const question: EasyQuizType[] = useSelector((state: CombinedState) => state.question)
    const user: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    return(
        <Grid container xs={12} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Grid item container xs={12} justify={"center"}>
                <Card style={{backgroundColor: "#005000", width: "55%", border: "solid 5px brown", marginBottom: 20}}>
                    <Grid item container xs={12} justify={"center"}>
                        <Typography variant={"h6"} style={{color: "white"}}>第{quizNum + 1}問</Typography>
                    </Grid>
                    <Grid item container xs={12} justify={"center"}>
                        <Typography variant={"h6"} style={{color: "white"}}>QUESTION</Typography>
                    </Grid>
                    <Grid item container xs={12} justify={"center"} style={{marginBottom: 35}}>
                        <Typography style={{color: "white"}}>{question[quizNum].question}</Typography>
                    </Grid>
                    <Grid item container xs={12} justify={"center"}>
                        <Grow in={answerGrow}>
                            <Grid>
                                { question[quizNum].answer === answer[quizNum] ?
                                    <Typography variant={"h5"} style={{color: "white"}}>⭕️正解: {question[quizNum].answer}</Typography>
                                    :
                                    <Typography variant={"h5"} style={{color: "white"}}>❌不正解/ 正解:{question[quizNum].answer}</Typography>
                                }
                                <Typography style={{color: "white"}}>{question[quizNum].description}</Typography>
                                {  quizNum !== 9 ?
                                    <Button
                                        variant={"contained"} onClick={() => {
                                        dispatch(answerGrowSliceReducer.actions.setGrowOpen(false))
                                        dispatch(resultSliceReducer.actions.setResult(question[quizNum].answer === answer[quizNum] ? "O" : "X"))
                                        setTimeout(() =>  handleQuizNum(quizNum), 200)
                                    }}>次の問題へ</Button>
                                    :
                                    <Link to="/answer_result" style={{textDecoration: "none"}}>
                                        <Button variant={"contained"}
                                                color={"default"}
                                                onClick={() => {
                                                    dispatch(resultSliceReducer.actions.setResult(question[quizNum].answer === answer[quizNum] ? "O" : "X"))
                                                    dispatch(answerGrowSliceReducer.actions.setGrowOpen(false))
                                                    dispatch(postResultSliceReducer.actions.postResult(
                                                        _.range(10).map((num: number) => ({
                                                            question: question[num].question,
                                                            username: user.username,
                                                            result: result[num],
                                                            field: question[num].field,
                                                            level: "easy"
                                                        }))
                                                    ))
                                                }}>解答結果を確認する
                                        </Button>
                                    </Link>
                                }
                            </Grid>
                        </Grow>
                    </Grid>
                </Card>
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
                <Grid item xs={7} container justify={"center"}>
                    {
                        _.range(10).map((num: number) => (
                            <Grid>
                                <Card style={{borderRight: "solid 0.5px"}}>
                                    <Typography style={{backgroundColor: "#E5E3DE"}}>第{num + 1}問</Typography>
                                    <Typography style={{textAlign: "center", color: result[num] === "O" ? "red" : "blue"}}>{result[num]}</Typography>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EasyQuiz
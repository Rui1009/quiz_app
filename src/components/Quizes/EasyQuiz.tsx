import React, {useEffect, useState} from "react"
import {Button, Typography} from "@material-ui/core";
import {EasyQuizData} from "../../data/dummy_data_easy_quiz";
import Checkbox from '@material-ui/core/Checkbox';
import Grow from "@material-ui/core/Grow";
import {CombinedState} from "../../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {GrowOpenActionCreator, SetAnserActionCreator} from "../../modules/Answer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

interface Props {
    answerGrow: boolean,
    answer: string[],
    setGrowOpen(value: boolean): void,
    setAnswer(value: string): void,
}

const EasyQuiz = (props: Props) => {
    const [quizNum, setQuizNum] = useState(0)
    useEffect(() => {
    for(let i = EasyQuizData.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = EasyQuizData[i];
            EasyQuizData[i] = EasyQuizData[j]
            EasyQuizData[j] = temp
        }}, [setQuizNum]
    )

    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    return(
        <div>
            <Typography variant={"h6"}>第{quizNum + 1}問</Typography>
            <Typography>Q.{EasyQuizData[quizNum].question}</Typography>
            {
                EasyQuizData[quizNum].option.map((elem: string) => (
                    <Button variant={"contained"} color={"secondary"} onClick={() => {
                        props.setAnswer(elem)
                        props.setGrowOpen(true)
                    }}>{elem}</Button>
                ))}
                <Grow in={props.answerGrow}>
                    <div>
                        { EasyQuizData[quizNum].answer === props.answer[quizNum] ?
                            <Typography variant={"h5"} style={{color: "green"}}>⭕️正解: {EasyQuizData[quizNum].answer}</Typography>
                            :
                            <Typography variant={"h5"} style={{color: "red"}}>❌不正解/ 正解:{EasyQuizData[quizNum].answer}</Typography>
                        }
                        <Typography>{EasyQuizData[quizNum].description}</Typography>
                        {  quizNum !== 9 ?
                            <Button variant={"contained"} onClick={() => {
                                props.setGrowOpen(false)
                                handleQuizNum(quizNum)
                            }}>次の問題へ</Button>
                            :
                            <Link to="/answer_result">
                                <Button variant={"contained"} color={"default"}>解答結果を確認する</Button>
                            </Link>

                        }
                    </div>
                </Grow>

        </div>
    )
}

const mapStateToProps = (state: CombinedState) => ({
    answerGrow: state.answerGrow,
    answer: state.answer
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setGrowOpen: (value: boolean) => {dispatch(GrowOpenActionCreator.setGrowOpen(value))},
    setAnswer: (value: string) => {dispatch(SetAnserActionCreator.setAnswer(value))}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EasyQuiz)
import React, {useState} from "react"
import {Button, Typography} from "@material-ui/core";

const EasyQuiz = () => {
    const [quizNum, setQuizNum] = useState(1)

    const handleQuizNum = (value: number) => {
        setQuizNum(value + 1)
    }
    return(
        <div>
            <Typography>第{quizNum}問</Typography>

            <Button variant={"contained"} onClick={() => handleQuizNum(quizNum)}>次の問題へ</Button>
        </div>
    )
}

export default EasyQuiz
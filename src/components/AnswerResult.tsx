import React, {useEffect} from "react"
import {CombinedState} from "../modules/RootModule";
import _ from "lodash"
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {postResultSliceReducer} from "../modules/Answer";
import {PersonalInfoType} from "../Types/type";


const AnswerResult = () => {
    useEffect(() => {
        dispatch(postResultSliceReducer.actions.postResult(
        _.range(10).map((num: number) => ({
            question: question[num].question,
            username: user.username,
            result: result[num],
            field: question[num].field,
            level: level === "入門問題" ? "easy" : "intermediate"
        }))
    ))}, [])
    const dispatch = useDispatch()
    const user: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    const result = useSelector((state: CombinedState) => state.result)
    const answer = useSelector((state: CombinedState) => state.answer)
    const question = useSelector((state: CombinedState) => state.question)
    const level: string = useSelector((state: CombinedState) => state.questionLevel)

    let collectNum = 0;
    for(let i = 0; i < 10; i++) {
        if(result[i] === "O") {
            collectNum++
        }
    }

    let comment = "";
    if (collectNum === 10) {
        comment = "パーフェクト！この調子で勉強しよう！"
    } else if (collectNum <= 3) {
        comment = "次はもっと頑張ろう。"
    } else if (collectNum >= 4 && collectNum <= 7) {
        comment = "毎日コツコツ勉強しよう。"
    } else {
        comment = "満点まであと少し！間違えた問題はしっかり復習しよう。"
    }

    return (
        <Grid container xs={12}>
            <Grid item container xs={12} justify={"center"}>
                <Card style={{width: "90%", backgroundColor: "#005000", border: "solid 5px brown"}}>
                    <Typography variant={"h5"} style={{color: "white", textAlign: "center", paddingTop: 30}}>{collectNum} / 10問正解</Typography>
                    <Typography style={{color: "white", textAlign: "center", paddingTop: 30, paddingBottom: 40}}>{comment}</Typography>
                </Card>
            </Grid>
        {
            _.range(10).map((num) =>
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Grid container xs={12}>
                                <Grid item xs={3} justify={"center"}>
                                    <Typography style={{color: result[num] === "O" ? "green" : "red"}}>{result[num]}</Typography>
                                </Grid>
                                <Grid item container xs={9} justify={"flex-end"}>
                                    <Typography style={{color: result[num] === "O" ? "green" : "red"}}> 問題: {question[num].question}</Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{backgroundColor: "#e0e0e0"}} >
                            <Grid container xs={12} direction={"column"}>
                                <Grid item>
                                    <Typography variant={"h6"}>正解: {question[num].answer}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>あなたの解答: {answer[num]}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>解説: {question[num].description}</Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            )
        }
            <Grid item container xs={12} justify={"flex-end"}>
                <Link to={"/home"} style={{textDecoration: "none"}}>
                    <Button variant={"contained"} color={"secondary"}>ホームへ戻る</Button>
                </Link>
            </Grid>
        </Grid>

    )
}

export default AnswerResult
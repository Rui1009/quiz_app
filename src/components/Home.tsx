import React, {useEffect} from "react"
import {Box, createStyles, Grid, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CombinedState} from "../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {connect, useSelector} from "react-redux";
import QuestionStartModal from "./Modals/QuestionStartModal";
import modalReducer from "../modules/Modal"
import {SetQuestionActionCreator} from "../modules/Question";
import {SetUserActionCreator} from "../modules/User";
import {PersonalInfoType} from "../Types/type";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch} from "react-redux";
import questionLevelReducer from "../modules/QuestionLevel"

interface Props {
    loadEasyQuestion(): void,
    loadIntermediateQuestion(): void,
    loadUser(): void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            display: "flex",
            margin: theme.spacing(1),
            height: "auto",
            width: "auto"
        },
        wrap: {

    }})
)


const Home = (props: Props) => {
    const dispatch = useDispatch()
    const user: string = useSelector((state: CombinedState) => state.user)
    const userDetailInfo: PersonalInfoType[] = useSelector((state: CombinedState) => state.userDetailInfo)
    const index: number = userDetailInfo.findIndex(({username}) => username === user)
    const playingUser: PersonalInfoType = userDetailInfo[index]
    console.log(userDetailInfo)
    const classes = useStyles()
    return (
    <Grid container xs={12} justify={"space-around"}>
        <Grid item xs={3}>
            <Avatar variant={"square"} src={playingUser.icon} className={classes.avatar} />
        </Grid>
        <Grid item xs={6}>
            <ul className={classes.wrap}>
                <Typography>名前:</Typography>
                <Typography variant={"h5"}>{playingUser.username}</Typography>
                <Typography>レベル:</Typography>
                <Typography variant={"h5"}>{playingUser.class}</Typography>
            </ul>
        </Grid>
        <Grid item xs={6}>
            <ul>
                <Typography>順位:</Typography>
                <Typography variant={"h5"}>{playingUser.lank}位</Typography>
                <Typography>得意分野:</Typography>
                <Typography variant={"h5"}>{playingUser.strongField}</Typography>
            </ul>
        </Grid>
        <Grid item xs={6}>
            <ul>
                <Typography>クリアした問題:</Typography>
                <Typography variant={"h5"}>{playingUser.achievementRate}％</Typography>
                <Typography>苦手分野:</Typography>
                <Typography variant={"h5"}>{playingUser.weakField}</Typography>
            </ul>
        </Grid>
        <Grid item xs={3}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => {
                dispatch(questionLevelReducer.actions.setQuesionLevel("入門問題"))
                props.loadEasyQuestion()
                dispatch(modalReducer.actions.open("questionStartModal"))
            }}>
                <Typography variant={"h6"}>入門問題</Typography>
                <Typography>基本的な用語の選択式問題。</Typography>
            </Box>
        </Grid>

        <Grid item xs={3} style={{backgroundColor: "#C5C5C5"}}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => {
                dispatch(questionLevelReducer.actions.setQuesionLevel("中級問題"))
                props.loadIntermediateQuestion()
                dispatch(modalReducer.actions.open("questionStartModal"))
            }}>
                <Typography variant={"h6"}>中級問題</Typography>
                <Typography>用語の記述式問題。</Typography>
            </Box>
        </Grid>
        <Grid item xs={3}>
            <Box style={{backgroundColor: "#C5C5C5"}}
                 onClick={() => dispatch(questionLevelReducer.actions.setQuesionLevel("上級問題"))}
            >
                <Typography variant={"h6"} style={{backgroundColor: "#C5C5C5"}}>上級問題</Typography>
                <Typography>複雑な事例問題や、計算問題。</Typography>
            </Box>
        </Grid>
        <QuestionStartModal />
    </Grid>


)}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({

    loadEasyQuestion: () => {dispatch(SetQuestionActionCreator.loadEasyQuestion())},

    loadIntermediateQuestion: () => {dispatch(SetQuestionActionCreator.loadIntermediateQuestion())},

    loadUser: () => {dispatch(SetUserActionCreator.loadUser())},
})


export default connect(
    null,
    mapDispatchToProps,
)(Home)

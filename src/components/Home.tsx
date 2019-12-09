import React, {useEffect} from "react"
import {Box, createStyles, Grid, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CombinedState} from "../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {QuestionLevelActionCreator} from "../modules/QuestionLevel"
import {connect} from "react-redux";
import QuestionStartModal from "./Modals/QuestionStartModal";
import {ModalOpenActionCreator} from "../modules/Modal";
import {Route} from "react-router";
import Quiz from "./Quiz";
import {SetQuestionActionCreator} from "../modules/Question";
import {SetUserActionCreator} from "../modules/User";
import {PersonalInfoType} from "../Types/type";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";

interface Props {
    questionLevel: string,
    user: string,
    userDetailInfo: PersonalInfoType[],
    setModalOpen(value: string): void,
    setQuestionLevel(value: string): void,
    loadEasyQuestion(): void,
    loadIntermediateQuestion(): void,
    loadUser(): void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avator: {
            display: "flex",
            margin: theme.spacing(1),
            width: 60,
            height: 60
        }
    })
)


const Home = (props: Props) => {
    const index: number = props.userDetailInfo.findIndex(({username}) => username === props.user)
    const playingUser: PersonalInfoType = props.userDetailInfo[index]
    console.log(playingUser)
    const classes = useStyles()
    return (
        <div>
        <Avatar variant={"square"} src={playingUser.icon} className={classes.avator} />
    <Grid container xs={12} justify={"space-around"}>
        <Grid item xs={3}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => {
                props.setQuestionLevel("入門問題")
                props.loadEasyQuestion()
                props.setModalOpen("questionStartModal")
            }}>
                <Typography variant={"h6"}>入門問題</Typography>
                <Typography>基本的な用語の選択式問題。</Typography>
            </Box>
        </Grid>

        <Grid item xs={3} style={{backgroundColor: "#C5C5C5"}}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => {
                props.setQuestionLevel("中級問題")
                props.loadIntermediateQuestion()
                props.setModalOpen("questionStartModal")
            }}>
                <Typography variant={"h6"}>中級問題</Typography>
                <Typography>用語の記述式問題。</Typography>
            </Box>
        </Grid>
        <Grid item xs={3}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => props.setQuestionLevel("上級問題")}>
                <Typography variant={"h6"} style={{backgroundColor: "#C5C5C5"}}>上級問題</Typography>
                <Typography>複雑な事例問題や、計算問題。</Typography>
            </Box>
        </Grid>
        <QuestionStartModal />
    </Grid>
        </div>
)}

const mapStateToProps = (state: CombinedState) => ({
    questionLevel: state.questionLevel,
    user: state.user,
    userDetailInfo: state.userDetailInfo
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setQuestionLevel: (value: string) => {dispatch(QuestionLevelActionCreator.setQuestionLevel(value))},

    setModalOpen: (value: string) => {dispatch(ModalOpenActionCreator.setModalOpen(value))},

    loadEasyQuestion: () => {dispatch(SetQuestionActionCreator.loadEasyQuestion())},

    loadIntermediateQuestion: () => {dispatch(SetQuestionActionCreator.loadIntermediateQuestion())},

    loadUser: () => {dispatch(SetUserActionCreator.loadUser())}
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

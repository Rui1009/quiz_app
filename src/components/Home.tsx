import React from "react"
import {Box, Grid} from "@material-ui/core";
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

interface Props {
    questionLevel: string,
    setModalOpen(value: string): void
    setQuestionLevel(value: string): void,
    loadQuestion(): void
}


const Home = (props: Props) => {
    props.loadQuestion()
    return (
    <Grid container xs={12} justify={"space-around"}>
        <Grid item xs={3}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => {
                props.setQuestionLevel("入門問題")
                props.setModalOpen("questionStartModal")
            }}>
                <Typography variant={"h6"}>入門問題</Typography>
                <Typography>基本的な用語の選択式問題。</Typography>
            </Box>
        </Grid>

        <Grid item xs={3} style={{backgroundColor: "#C5C5C5"}}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => props.setQuestionLevel("中級問題")}>
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
)}

const mapStateToProps = (state: CombinedState) => ({
    questionLevel: state.questionLevel
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setQuestionLevel: (value: string) => {dispatch(QuestionLevelActionCreator.setQuestionLevel(value))},

    setModalOpen: (value: string) => {dispatch(ModalOpenActionCreator.setModalOpen(value))},

    loadQuestion: () => {dispatch(SetQuestionActionCreator.loadQuestion())}
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

import React from "react"
import {Box, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CombinedState} from "../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {QuestionLevelActionCreator} from "../modules/QuestionLevel"
import {connect} from "react-redux";

interface Props {
    questionLevel: string,
    setQuestionLevel(value: string): void
}


const Home = (props: Props) => (
    <Grid container xs={12}>
        <Grid item xs={3}>
            <Box style={{backgroundColor: "#C5C5C5"}} onClick={() => props.setQuestionLevel("入門問題")}>
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
    </Grid>
)

const mapStateToProps = (state: CombinedState) => ({
    questionLevel: state.questionLevel
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setQuestionLevel: (value: string) => {dispatch(QuestionLevelActionCreator.setQuestionLevel(value))}
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

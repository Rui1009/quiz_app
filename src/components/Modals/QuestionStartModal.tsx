import React from "react"
import {DialogContent, DialogTitle, Grid, Grow, Typography, Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { Close } from "@material-ui/icons"
import {CombinedState} from "../../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import modalReducer, {modalType} from "../../modules/Modal";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


interface Props {
    questionLevel: string
}

const QuestionStartModal = (props: Props) => {
    const dispatch = useDispatch()
    const close = dispatch(modalReducer.actions.close)
    const modalOpen = useSelector((state: CombinedState) => state.modalOpen)
    return (
    <Grow in={modalOpen.questionStartModal}>
        <Dialog
            scroll={"paper"}
            PaperProps={{style: {height: "auto", maxWidth: "none", width: "50%"}}}
            open
            onClose={() => close("questionStartModal")}
        >
            <DialogTitle>
                <Grid container xs={12}>
                    <Grid item xs={10}>
                        <Typography variant={"h4"}>{props.questionLevel}</Typography>
                    </Grid>
                    <Grid item container xs={2} justify="flex-end">
                        <Close onClick={() => close("questionStartModal")}/>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <ul>
                    <li><Typography>問題は全部で10問です。</Typography></li>
                    <li><Typography>一度回答した問題に戻ることはできません。</Typography></li>
                </ul>
                <Link to="/quiz">
                    <Button color={"primary"} variant={"contained"}>スタート</Button>
                </Link>
            </DialogContent>
        </Dialog>
    </Grow>
)}


const mapStateToProps = (state: CombinedState) => ({
    modalOpen: state.modalOpen,
    questionLevel: state.questionLevel
})


export default connect(
    mapStateToProps,
    null
)(QuestionStartModal)

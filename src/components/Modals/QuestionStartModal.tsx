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




const QuestionStartModal = () => {
    const dispatch = useDispatch()
    const modalOpen = useSelector((state: CombinedState) => state.modalOpen)
    const questionLevel = useSelector((state: CombinedState) => state.questionLevel)
    return (
    <Grow in={modalOpen.questionStartModal}>
        <Dialog
            scroll={"paper"}
            PaperProps={{style: {height: "auto", maxWidth: "none", width: "50%"}}}
            open
            onClose={() => dispatch(modalReducer.actions.close("questionStartModal"))}
        >
            <DialogTitle>
                <Grid container xs={12}>
                    <Grid item xs={10}>
                        <Typography variant={"h4"}>{questionLevel}</Typography>
                    </Grid>
                    <Grid item container xs={2} justify="flex-end">
                        <Close onClick={() => dispatch(modalReducer.actions.close("questionStartModal"))}/>
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


export default QuestionStartModal
import React from "react"
import {DialogContent, DialogTitle, Grid, Grow, Typography, Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { Close } from "@material-ui/icons"
import modalReducer from "../../modules/Modal";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {answerSliceReducer, resultSliceReducer} from "../../modules/Answer";
import {CombinedState} from "../../modules/RootModule";




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
                <Grid container xs={12} style={{borderBottom: "solid 0.5px"}}>
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
                        <li><Typography color={"secondary"}>一度回答した問題に戻ることはできません。</Typography></li>
                    </ul>
                    <Link to="/quiz" style={{textDecoration: "none", display: "flex", justifyContent: "center"}}>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            onClick={() => {
                                dispatch(modalReducer.actions.close("questionStartModal"))
                                dispatch(answerSliceReducer.actions.resetAnswer())
                                dispatch(resultSliceReducer.actions.resetResult())
                            }}>スタート</Button>
                    </Link>
            </DialogContent>
        </Dialog>
    </Grow>
)}


export default QuestionStartModal
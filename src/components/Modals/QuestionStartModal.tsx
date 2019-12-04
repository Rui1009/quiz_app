import React from "react"
import {DialogContent, DialogTitle, Grid, Grow, Typography, Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { Close } from "@material-ui/icons"
import {CombinedState} from "../../modules/RootModule";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {ModalOpenActionCreator, modalType} from "../../modules/Modal";
import {connect} from "react-redux";


interface Props {
    modalOpen: modalType,
    questionLevel: string,
    setModalOpen(value: string): void,
    setModalClose(value: string): void
}
const QuestionStartModal = (props: Props) => (
    <Grow in={props.modalOpen.questionStartModal}>
        <Dialog
            scroll={"paper"}
            PaperProps={{style: {height: "auto", maxWidth: "none", width: "50%"}}}
            open
            onClose={() => props.setModalClose("questionStartModal")}
        >
            <DialogTitle>
                <Grid container xs={12}>
                    <Grid item xs={10}>
                        <Typography variant={"h4"}>{props.questionLevel}</Typography>
                    </Grid>
                    <Grid item container xs={2} justify="flex-end">
                        <Close onClick={() => props.setModalClose("questionStartModal")}/>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <ul>
                    <li><Typography>問題は全部で10問です。</Typography></li>
                    <li><Typography>一度回答した問題に戻ることはできません。</Typography></li>
                </ul>
                <Button color={"primary"} variant={"contained"}>スタート</Button>
            </DialogContent>
        </Dialog>
    </Grow>
)


const mapStateToProps = (state: CombinedState) => ({
    modalOpen: state.modalOpen,
    questionLevel: state.questionLevel
})

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setModalOpen: (value: string) => {dispatch(ModalOpenActionCreator.setModalOpen(value))},

    setModalClose: (value: string) => {dispatch(ModalOpenActionCreator.setModalClose(value))}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionStartModal)

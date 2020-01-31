import React, {ChangeEvent, useState} from "react"
import {Grid, Grow, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {CombinedState} from "../../modules/RootModule";
import modalReducer from "../../modules/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Close} from "@material-ui/icons";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PostQuizForm from "../PostQuizForm";
import {getFormValues, InjectedFormProps, submit} from "redux-form";
import {postQuizType} from "../../Types/type";
import modalSlice from "../../modules/Modal";


const PostQuizModal = (props: InjectedFormProps) => {
    const currentValue = useSelector((state: CombinedState) => getFormValues("PostQuizForm")(state) as postQuizType)
    const modalOpen = useSelector((state: CombinedState) => state.modalOpen)
    const dispatch = useDispatch()
    const [level, setLevel] = useState("入門問題");
    const [field, setField] = useState("原価管理の基礎的分類")

    const handleLevelChange = (e: ChangeEvent<{value: any}>) => {
        setLevel(e.target.value)
    }

    const handleFieldChange = (e: ChangeEvent<{value: any}>) => {
        setField(e.target.value)
    }
     return (
        <Grow in={modalOpen.postQuizModal}>
            <Dialog
                scroll={"paper"}
                PaperProps={{style: {height: "auto", maxWidth: "none", width: "50%"}}}
                open
                onClose={() => dispatch(modalReducer.actions.close("postQuizModal"))}
            >
               <DialogTitle>
                   <Grid container xs={12} style={{borderBottom: "solid 0.5px"}}>
                       <Grid item xs={10}>
                           <Typography variant={"h4"}>オリジナル問題作成</Typography>
                       </Grid>
                       <Grid item container xs={2} justify="flex-end">
                           <Close onClick={() => dispatch(modalReducer.actions.close("postQuizModal"))}/>
                       </Grid>
                   </Grid>
               </DialogTitle>
                <DialogContent>
                    <Typography>レベル：</Typography>
                    <FormControl style={{width: "40%"}}>
                        <Select
                            value={level}
                            onChange={handleLevelChange}
                        >
                            <MenuItem value={"入門問題"}>入門問題</MenuItem>
                            <MenuItem value={"中級問題"}>中級問題</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography>分野：</Typography>
                    <FormControl style={{width: "40%"}}>
                        <Select
                            value={field}
                            onChange={handleFieldChange}
                        >
                            <MenuItem value={"原価管理の基礎的分類"}>原価管理の基礎的分類</MenuItem>
                            <MenuItem value={"商的工業会計"}>商的工業会計</MenuItem>
                            <MenuItem value={"見積原価計算"}>見積原価計算</MenuItem>
                            <MenuItem value={"実際単純個別原価計算"}>実際単純個別原価計算</MenuItem>
                            <MenuItem value={"実際部門別個別原価計算"}>実際部門別個別原価計算</MenuItem>
                            <MenuItem value={"実際総合原価計算"}>実際総合原価計算</MenuItem>
                            <MenuItem value={"標準原価計算"}>標準原価計算</MenuItem>
                            <MenuItem value={"原価分析"}>原価分析</MenuItem>
                            <MenuItem value={"直接原価計算"}>直接原価計算</MenuItem>
                            <MenuItem value={"企業予算"}>企業予算</MenuItem>
                            <MenuItem value={"資本予算"}>資本予算</MenuItem>
                        </Select>
                    </FormControl>
                    <PostQuizForm level={level} field={field} onSubmit={() => alert("ok")}/>
                </DialogContent>
            </Dialog>
        </Grow>
    )
}

export default PostQuizModal
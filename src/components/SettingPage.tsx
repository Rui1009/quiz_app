import React from "react"
import {InputAdornment, TextField, Typography} from "@material-ui/core";
import {getFormValues, WrappedFieldProps} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {PersonalInfoType, RankingType} from "../Types/type";
import ModificationForm from "./ModificationForm";
import {setModifiedInfoSliceReducer} from "../modules/User";

export const SettingPageRenderField = (
    props: WrappedFieldProps & {  label?: string; type?: string; unit: string }
) => {
    return (
        <TextField
            style={{width: "50%"}}
            label={props.label}
            error={props.meta.touched && props.meta.error}
            helperText={props.meta.touched && props.meta.error}
            type={props.type}
            InputProps={{
                endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>
            }}
            {...props.input}
        />
    );
};

const SettingPage = () => {
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombinedState) => getFormValues("ModificationForm")(state) as {password: string})
    const userDetailInfo: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    return(
        <div>
            <Typography variant={"h5"} style={{textAlign: "center"}}>パスワード設定</Typography>
            <ModificationForm initialValues={{
                password: userDetailInfo.password
            }}
            onSubmit={() => dispatch(setModifiedInfoSliceReducer.actions.setModifiedInfo({currentUser: userDetailInfo.username, password: currentValue.password}))}
            />
        </div>
    )
}

export default SettingPage

import React from "react"
import {InputAdornment, TextField, Typography} from "@material-ui/core";
import {reduxForm, InjectedFormProps, Field, getFormValues, WrappedFieldProps} from "redux-form";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Button from "@material-ui/core/Button";
import {connect, useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {PersonalInfoType} from "../Types/type";
import CardContent from "@material-ui/core/CardContent";
import {playingUserSliceReducer} from "../modules/User";
import ModificationForm from "./ModificationForm";

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
    const playingUser = useSelector((state: CombinedState) => state.playingUser)
    const currentValue = useSelector((state: CombinedState) => getFormValues("settingForm")(state) as {username: string, password: string, icon: string})
    const data: PersonalInfoType[] = useSelector((state: CombinedState) => state.userDetailInfo)
    const userNameData = data.map((elem: PersonalInfoType) => {
        return elem.username
    })
    const userNameErrorMessage = currentValue && currentValue.username !== playingUser.username && userNameData.indexOf(currentValue.username) >= 0 ?  "そのユーザー名はすでに使用されています。" : "";
    return(
        <div>
            <Typography variant={"h5"} style={{textAlign: "center"}}>プロフィール設定</Typography>
            <Typography color={"error"}>{userNameErrorMessage}</Typography>
            <ModificationForm initialValues={{
                username: playingUser.username,
                password: playingUser.password
            }}/>
        </div>
    )
}

export default SettingPage

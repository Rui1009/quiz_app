import React from "react"
import {InputAdornment, TextField, Typography} from "@material-ui/core";
import {getFormValues, WrappedFieldProps} from "redux-form";
import {useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {PersonalInfoType, RankingType} from "../Types/type";
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
    const currentValue = useSelector((state: CombinedState) => getFormValues("settingForm")(state) as {username: string, password: string, icon: string})
    const userDetailInfo: PersonalInfoType = useSelector((state: CombinedState) => state.userDetailInfo)
    const allUsers: RankingType[] = useSelector((state: CombinedState) => state.ranking)
    const userNameData = allUsers.map((elem: RankingType) => {
        return elem.username
    })
    const userNameErrorMessage = currentValue && currentValue.username !== userDetailInfo.username && userNameData.indexOf(currentValue.username) >= 0 ?  "そのユーザー名はすでに使用されています。" : "";
    return(
        <div>
            <Typography variant={"h5"} style={{textAlign: "center"}}>プロフィール設定</Typography>
            <Typography color={"error"}>{userNameErrorMessage}</Typography>
            <ModificationForm initialValues={{
                username: userDetailInfo.username,
                password: userDetailInfo.password
            }}/>
        </div>
    )
}

export default SettingPage

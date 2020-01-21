import React from "react"
import {Field, getFormValues, InjectedFormProps, reduxForm} from "redux-form";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Button from "@material-ui/core/Button";
import {SettingPageRenderField} from "./SettingPage";
import {useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {PersonalInfoType} from "../Types/type";
import {Grid} from "@material-ui/core";

const ModificationForm = (props: InjectedFormProps) => {
    const playingUser = useSelector((state: CombinedState) => state.playingUser)
    const currentValue = useSelector((state: CombinedState) => getFormValues("settingForm")(state) as {username: string, password: string, icon: string})
    const data: any = useSelector((state: CombinedState) => state.userDetailInfo)
    const userNameData = data.map((elem: PersonalInfoType) => {
        return elem.username
    })
    const userNameErrorMessage = currentValue && currentValue.username !== playingUser.username && userNameData.indexOf(currentValue.username) >= 0 ?  "そのユーザー名はすでに使用されています。" : "";

    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container xs={12}>
                <Grid item xs={12} style={{marginBottom: 30, marginTop: 50}}>
                    <Field
                        label={"ユーザー名"}
                        name="username"
                        component={SettingPageRenderField}
                        type={"text"}
                        validate={requiredValidation}
                    />
                </Grid>
                <Grid item xs={12} style={{marginBottom: 30}}>
                    <Field
                        style={{width: "50%"}}
                        label={"パスワード"}
                        name="password"
                        component={SettingPageRenderField}
                        type={"text"}
                        validate={[requiredValidation, passLengthValidation]}
                    />
                </Grid>
                <Grid item container xs={12} justify={"center"}>
                    <Button
                        disabled={props.invalid || props.pristine || userNameErrorMessage.length !== 0}
                        color={"primary"}
                        type={"submit"}
                        variant={"contained"}
                        onClick={() => alert("変更しました。")}
                    >変更</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default reduxForm<any>({
    form: "ModificationForm"
})(ModificationForm)

import React from "react"
import {Field, getFormValues, InjectedFormProps, reduxForm} from "redux-form";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Button from "@material-ui/core/Button";
import {renderField} from "./SettingPage";
import {useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {PersonalInfoType} from "../Types/type";

const ModificationForm = (props: InjectedFormProps) => {
    const playingUser = useSelector((state: CombinedState) => state.playingUser)
    const currentValue = useSelector((state: CombinedState) => getFormValues("settingForm")(state) as {username: string, password: string, icon: string})
    const data: PersonalInfoType[] = useSelector((state: CombinedState) => state.userDetailInfo)
    const userNameData = data.map((elem: PersonalInfoType) => {
        return elem.username
    })
    const userNameErrorMessage = currentValue && currentValue.username !== playingUser.username && userNameData.indexOf(currentValue.username) >= 0 ?  "そのユーザー名はすでに使用されています。" : "";

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                label={"ユーザー名"}
                name="username"
                component={renderField}
                type={"text"}
                validate={requiredValidation}
            />
            <Field
                label={"パスワード"}
                name="password"
                component={renderField}
                type={"text"}
                validate={[requiredValidation, passLengthValidation]}
            />
            <Button
                disabled={props.invalid || props.pristine || userNameErrorMessage.length !== 0}
                color={"primary"}
                type={"submit"}
                variant={"contained"}
                onClick={() => alert("変更しました。")}
            >変更</Button>
        </form>
    )
}

export default reduxForm<any>({
    form: "ModificationForm"
})(ModificationForm)

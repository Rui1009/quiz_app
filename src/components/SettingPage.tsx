import React from "react"
import {InputAdornment, TextField, Typography} from "@material-ui/core";
import {reduxForm, InjectedFormProps, Field, getFormValues, WrappedFieldProps} from "redux-form";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";

export const renderField = (
    props: WrappedFieldProps & {  label?: string; type?: string; unit: string }
) => {
    return (
        <TextField
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

const SettingPage = (props: InjectedFormProps) => {
    const currentValue = useSelector((state: CombinedState) => getFormValues("settingForm")(state))
    return(
        <div>
            <Typography variant={"h5"}>設定</Typography>
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
                    disabled={props.invalid || props.pristine}
                    color={"primary"}
                    type={"submit"}
                    variant={"contained"}
                    onClick={() => alert("変更できません")}
                >変更</Button>
            </form>
        </div>
    )
}

export default reduxForm<any>({
    form: "settingForm",
    initialValues: {username: "るい", password: "test"}
})(SettingPage)
import React from 'react';
import {InjectedFormProps, WrappedFieldProps, Field, reduxForm, getFormValues} from "redux-form"
import { TextField, InputAdornment } from "@material-ui/core"
import {LoginInfoType} from "../Types/type";
import {connect} from "react-redux";
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

const NewRegistration = (props: InjectedFormProps<LoginInfoType> & {
    currentValue: LoginInfoType
}) => {
    return (
        <div>
            <h1>新規登録</h1>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <Field
                        label={"ユーザー名"}
                        name="username"
                        component={renderField}
                        type={"string"}
                        />
                    <Field
                        label={"パスワード"}
                        name="password"
                        component={renderField}
                        type={"string"}
                    />
                </form>
            </div>
        </div>


    )
}

export default reduxForm<LoginInfoType>({
   form: "registrationForm"
})(
    connect(
        (state: CombinedState) => ({
            currentValue: getFormValues("registrationForm")(state) as LoginInfoType
        })
    )
(NewRegistration))
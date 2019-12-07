import React from "react"
import {Field, getFormValues, InjectedFormProps, WrappedFieldProps} from "redux-form";
import {InputAdornment, TextField} from "@material-ui/core";
import {reduxForm} from "redux-form";
import {requiredValidation} from "../util/Validation";
import {connect} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import Button from "@material-ui/core/Button";
import {Action} from "typescript-fsa";
import {Dispatch} from "redux";
import {SetAnserActionCreator} from "../modules/Answer";

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

const AnswerForm = (props: InjectedFormProps & {
    currentValue: {answer: string},
    setAnswer(value: string): void,
    disabled: boolean
}) => {console.log(props.currentValue)
    return(
        <form onSubmit={props.handleSubmit}>
            <Field
                name="answer"
                component={renderField}
                type={"string"}
                validate={requiredValidation}
            />
            <Button
                disabled={props.invalid || props.pristine || props.disabled}
                color={"primary"}
                type={"submit"}
                variant={"contained"}
                onClick={() => {
                    props.setAnswer(props.currentValue.answer)
                }}
            >回答</Button>
        </form>
    )
}

export default reduxForm({
    form: "answerForm",
    enableReinitialize: true
})(
    connect(
        (state: CombinedState) => ({
            currentValue: getFormValues("answerForm")(state) as {answer: string},
            disabled: state.answerGrow
        }), (dispatch: Dispatch<Action<any>>) => ({
            setAnswer: (value: string) => {dispatch(SetAnserActionCreator.setAnswer(value))}
        })
    )(AnswerForm)
)
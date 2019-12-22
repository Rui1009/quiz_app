import React from "react"
import {Field, getFormValues, InjectedFormProps, WrappedFieldProps} from "redux-form";
import {InputAdornment, TextField} from "@material-ui/core";
import {reduxForm} from "redux-form";
import {requiredValidation} from "../util/Validation";
import {useDispatch, useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import Button from "@material-ui/core/Button";
import {answerSliceReducer} from "../modules/Answer";


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
                endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
                style: {
                    color: "white"
                }
            }}
            {...props.input}
        />
    );
};

const AnswerForm = (props: InjectedFormProps) => {
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombinedState) => getFormValues("answerForm")(state) as {answer: string})
    const disabled = useSelector((state: CombinedState) => state.answerGrow)
    return(
        <form onSubmit={props.handleSubmit}>
            <Field
                name="answer"
                component={renderField}
                type={"string"}
                validate={requiredValidation}
            />
            <Button
                disabled={props.invalid || props.pristine || disabled}
                color={"primary"}
                type={"submit"}
                variant={"contained"}
                onClick={() => {
                    dispatch(answerSliceReducer.actions.setAnswer(currentValue.answer))
                }}
            >回答</Button>
        </form>
    )
}

export default reduxForm({
    form: "answerForm",
    enableReinitialize: true
})(AnswerForm)

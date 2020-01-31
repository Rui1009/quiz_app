import React from "react"
import {Field, getFormValues, InjectedFormProps, reduxForm, submit, WrappedFieldProps} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {LoginInfoType, postQuizType} from "../Types/type";
import {Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import {requiredValidation} from "../util/Validation";
import {renderField} from "./LogIn";
import Button from "@material-ui/core/Button";
import modalSlice from "../modules/Modal";
import {postQuestionSliceReducer} from "../modules/postQuestion";
import FormControl from "@material-ui/core/FormControl";


const renderQuestionField = (
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
            style={{width: "95%"}}
        />
    );
};

const renderOptionField = (
    props: WrappedFieldProps & {  label?: string; type?: string; level: string }
) => {
    return (
        <TextField
            label={props.label}
            error={props.meta.touched && props.meta.error}
            helperText={props.meta.touched && props.meta.error}
            type={props.type}
            {...props.input}
            disabled={props.level === "入門問題" ? false : true}
            style={{width: "32%"}}
        />
    );
};


const PostQuizForm = (props: InjectedFormProps & {
    level: string,
    field: string
}) => {
    const dispatch = useDispatch()
    const user = useSelector((state: CombinedState) => state.user)
    const currentValue = useSelector((state: CombinedState) => getFormValues("PostQuizForm")(state) as postQuizType)
    return (
        <form onSubmit={props.handleSubmit}>
            <Grid container xs={12}>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    label={"問題"}
                    name="question"
                    component={renderQuestionField}
                    type={"string"}
                    validate={requiredValidation}
                />
            </Grid>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    level={props.level}
                    label={"選択肢1（入門問題のみ）"}
                    name="option1"
                    component={renderOptionField}
                    type={"string"}
                    validate={props.level === "入門問題" ? requiredValidation : null}
                />
            </Grid>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    level={props.level}
                    label={"選択肢2（入門問題のみ）"}
                    name="option2"
                    component={renderOptionField}
                    type={"string"}
                    validate={props.level === "入門問題" ? requiredValidation : null}
                />
            </Grid>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    level={props.level}
                    label={"選択肢3（入門問題のみ）"}
                    name="option3"
                    component={renderOptionField}
                    type={"string"}
                    validate={props.level === "入門問題" ? requiredValidation : null}
                />
            </Grid>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    level={props.level}
                    label={"選択肢4（入門問題のみ）"}
                    name="option4"
                    component={renderOptionField}
                    type={"string"}
                    validate={props.level === "入門問題" ? requiredValidation : null}
                />
            </Grid>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    label={"解答"}
                    name="answer"
                    component={renderQuestionField}
                    type={"string"}
                    validate={requiredValidation}
                />
            </Grid>
            <Grid item xs={12} style={{marginBottom: 10}}>
                <Field
                    label={"解説"}
                    name="description"
                    component={renderQuestionField}
                    type={"string"}
                    validate={requiredValidation}
                />
            </Grid>
                <Grid item xs={12} style={{marginBottom: 10}}>
                    <Button
                        disabled={props.invalid || props.pristine}
                        color={"primary"}
                        type={"submit"}
                        variant={"contained"}
                        onClick={() => {
                            dispatch(postQuestionSliceReducer.actions.postQuestion({
                                username: user,
                                level: props.level,
                                question: currentValue.question,
                                option1: currentValue.option1 || undefined,
                                option2: currentValue.option2 || undefined,
                                option3: currentValue.option3 || undefined,
                                option4: currentValue.option4 || undefined,
                                answer: currentValue.answer,
                                description: currentValue.description,
                                field: props.field
                            }))
                            dispatch(modalSlice.actions.close("postQuizModal"))
                        }}
                    >投稿</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default reduxForm({
    form: "PostQuizForm",
    //@ts-ignore
})(PostQuizForm)
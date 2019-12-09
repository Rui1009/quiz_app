import React from 'react';
import {InjectedFormProps, WrappedFieldProps, Field, reduxForm, getFormValues, autofill} from "redux-form"
import {TextField, InputAdornment, makeStyles} from "@material-ui/core"
import {LoginInfoType} from "../Types/type";
import {connect, useDispatch} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import Button from "@material-ui/core/Button";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {LoginActionCreator, loginType} from "../modules/LogIn";
import logo from "../genkan_logo.svg"
import {SetUserActionCreator, userSliceReducer} from "../modules/User";

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

const useStyles = makeStyles({
    card: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "groove",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        textAlign: "center",
        marginBottom: 12
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        textAlign: "center",
    },
    form: {
        marginBottom: 12
    }
});

const LogIn = (props: InjectedFormProps<LoginInfoType> & {
    currentValue: LoginInfoType,
    login: loginType
    setLogin(value: LoginInfoType): void,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography className={classes.title} variant={"h4"}>ログイン</Typography>
                <Typography style={{color: "red"}}>{props.login.errorMessage}</Typography>
                <form onSubmit={props.handleSubmit}>
                    <Grid container xs={12}>
                        <Grid xs={12} className={classes.form}>
                            <Field
                                label={"ユーザー名(必須)"}
                                name="username"
                                component={renderField}
                                type={"string"}
                                validate={requiredValidation}
                            />
                        </Grid>
                        <Grid xs={12} className={classes.form}>
                            <Field
                                label={"パスワード"}
                                name="password"
                                component={renderField}
                                type={"string"}
                                validate={[passLengthValidation, requiredValidation]}
                            />
                        </Grid>
                    </Grid>
                    <Link to={"/home"}>
                    <Button
                        disabled={props.invalid || props.pristine}
                        color={"primary"}
                        type={"submit"}
                        variant={"contained"}
                        onClick={() => {
                            props.setLogin(props.currentValue)
                            dispatch(userSliceReducer.actions.setUser(props.currentValue.username))
                        }}
                    >ログイン</Button>
                    </Link>
                </form>
                <Typography>登録がまだの方は</Typography>
                <a href="/registration">こちら</a>
            </CardContent>
        </Card>



    )
}

export default reduxForm<LoginInfoType>({
    form: "logInForm"
})(
    connect(
        (state: CombinedState) => ({
            currentValue: getFormValues("logInForm")(state) as LoginInfoType,
            login: state.login
        }), (dispatch: Dispatch<Action<any>>) => ({
            setLogin: (value: LoginInfoType) => {dispatch(LoginActionCreator.setLogin(value))},
        })
    )
    (LogIn))
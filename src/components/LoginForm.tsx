import React from "react"
import {Field, getFormValues, InjectedFormProps, reduxForm} from "redux-form";
import {passLengthValidation, requiredValidation} from "../util/Validation";
import Button from "@material-ui/core/Button";
import {Grid, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {renderField} from "./LogIn";
import {useDispatch, useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import {LoginInfoType} from "../Types/type";
import {Link} from "react-router-dom";
import {postLoginSliceReducer} from "../modules/LogIn";
import {userSliceReducer} from "../modules/User";


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
        marginTop: 30
    },
    img: {
        display: "flex"
    },
    content: {
        textAlign: "center",
    },
    form: {
        marginBottom: 12
    }
});

const LoginForm = (props: InjectedFormProps) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombinedState) => getFormValues("logInForm")(state) as LoginInfoType)
    const login = useSelector((state: CombinedState) => state.login)

    return (
        <form onSubmit={props.handleSubmit}>
            <Typography className={classes.title} variant={"h5"}>ログイン</Typography>
            <Typography color={"error"}>{login.errorMessage}</Typography>
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
                        type={"password"}
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
                    dispatch(postLoginSliceReducer.actions.postLogin({username: currentValue.username, password: currentValue.password}))
                    dispatch(userSliceReducer.actions.setUser(currentValue.username))
                }}
            >ログイン</Button>
            </Link>
        </form>
    )
}

export default reduxForm({
    form: "logInForm"
})(LoginForm)
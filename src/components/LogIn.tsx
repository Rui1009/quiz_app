import React, {useEffect} from 'react';
import {InjectedFormProps, WrappedFieldProps, Field, reduxForm, getFormValues} from "redux-form"
import {TextField, InputAdornment, makeStyles} from "@material-ui/core"
import {LoginInfoType} from "../Types/type";
import {useDispatch, useSelector} from "react-redux";
import {CombinedState} from "../modules/RootModule";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link, withRouter} from "react-router-dom";
import loginSlice, {loginType, postLoginSliceReducer} from "../modules/LogIn";
import {userSliceReducer} from "../modules/User";
import logo from "../genkan_logo.svg"
import Box from "@material-ui/core/Box";
import history from 'history/createBrowserHistory';
import LoginForm from "./LoginForm";


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


const LogIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const currentValue = useSelector((state: CombinedState) => getFormValues("logInForm")(state) as LoginInfoType)

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Box className={classes.img}>
                    <img src={logo} style={{width: "45%"}}/>
                </Box>
                <Typography variant={"h6"} style={{fontWeight: "bolder", fontSize: "x-large", margin: "auto"}}>〜原価管理QUIZ〜</Typography>
                <LoginForm onSubmit={() => {

                }}/>
                <Typography>登録がまだの方は</Typography>
                <a href="/registration">こちら</a>
            </CardContent>
        </Card>
    )
}

export default withRouter(LogIn)
import React, {ReactNode} from 'react';
import { Redirect } from 'react-router-dom';
import {CombinedState} from "../../modules/RootModule";
import {connect} from "react-redux";
import LogIn from "../LogIn";
import {loginType} from "../../modules/LogIn";

interface Props {
    login: loginType,
    children?: ReactNode
}

const Auth = (props: Props) => {
    return(
        props.login.loginStatus ? props.children : <Redirect to={"/"}/>
    )
}

const mapStateToProps = (state: CombinedState) => ({
    login: state.login
})

export default connect(
    mapStateToProps,
    null
    //@ts-ignore
)(Auth)
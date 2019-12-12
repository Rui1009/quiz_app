import React, {ReactNode} from 'react';
import { Redirect } from 'react-router-dom';
import {CombinedState} from "../../modules/RootModule";
import {useSelector} from "react-redux";
import LogIn from "../LogIn";
import {loginType} from "../../modules/LogIn";

interface Props {
    children?: ReactNode
}

const Auth = (props: Props) => {
    const login: loginType = useSelector((state: CombinedState) => state.login)
    return(
        login.loginStatus ? props.children : <Redirect to={"/"}/>
    )
}


export default Auth
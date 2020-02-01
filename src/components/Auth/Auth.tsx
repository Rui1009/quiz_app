import React from 'react';
import { Redirect } from 'react-router-dom';
import {CombinedState} from "../../modules/RootModule";
import {useSelector} from "react-redux";
import {loginType} from "../../modules/LogIn";

interface Props {
    children: any
}

const Auth = (props: Props) => {

    const login: loginType = useSelector((state: CombinedState) => state.login)
    return(
        login.loginStatus ? props.children : <Redirect to={"/"}/>
    )
}


export default Auth
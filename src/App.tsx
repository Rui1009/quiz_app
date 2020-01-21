import React, {useEffect} from 'react';
import {connect, Provider, useDispatch} from "react-redux";
import './App.css';
import NewRegistration from "./components/NewRegistration";
import {buildStore, sagaMiddleware} from "./store";
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import AnswerResult from "./components/AnswerResult";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import {CombinedState} from "./modules/RootModule";
import {loadUserSliceReducer} from "./modules/User";
import SettingPage from "./components/SettingPage";

interface Props {
    user: string
    loadUser(): void
}


const App = (props: Props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUserSliceReducer.actions.loadUser({param: "るい"}))
    }, [props.user]);
  return (

            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route exact path="/registration" component={NewRegistration} />
                    <Switch>
                        //@ts-ignore
                        <Auth>
                            <Header />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/setting_page" component={SettingPage} />
                            <Route exact path="/quiz" component={Quiz} />
                            <Route exact path="/answer_result" component={AnswerResult} />
                        </Auth>
                    </Switch>
                </Switch>
            </BrowserRouter>


  );
}

const mapStateToProps = (state: CombinedState) => ({
    user: state.user
})

export default connect(
    mapStateToProps,
    null
)(App);

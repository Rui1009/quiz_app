import React, {useEffect} from 'react';
import {connect, Provider} from "react-redux";
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
import {Dispatch} from "redux";
import {Action} from "typescript-fsa";
import {SetUserActionCreator} from "./modules/User";

interface Props {
    user: string
    loadUser(): void
}


const App = (props: Props) => {
    useEffect(() => {
        props.loadUser()
    }, [props.user]);
  return (

            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route exact path="/registration" component={NewRegistration} />
                    <Switch>
                        //@ts-ignore
                        <Auth>
                            <Route exact path="/home" component={Home} />
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

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    loadUser: () => {dispatch(SetUserActionCreator.loadUser())}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

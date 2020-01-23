import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import './App.css';
import NewRegistration from "./components/NewRegistration";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import AnswerResult from "./components/AnswerResult";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import {loadRankingSliceReducer} from "./modules/User";
import SettingPage from "./components/SettingPage";



const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadRankingSliceReducer.actions.loadRanking(""))
    });

  return (

            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route exact path="/registration" component={NewRegistration} />
                    <Switch>
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

export default App;

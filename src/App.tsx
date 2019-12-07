import React from 'react';
import { Provider } from "react-redux";
import './App.css';
import NewRegistration from "./components/NewRegistration";
import {buildStore, sagaMiddleware} from "./store";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import AnswerResult from "./components/AnswerResult";


const App: React.FC = () => {
  return (
        <Provider store={buildStore}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route exact path="/registration" component={NewRegistration} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/quiz" component={Quiz} />
                    <Route exact path="/answer_result" component={AnswerResult} />
                </Switch>
            </BrowserRouter>
        </Provider>

  );
}

export default App;

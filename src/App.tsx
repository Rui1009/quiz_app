import React from 'react';
import { Provider } from "react-redux";
import logo from './logo.svg';
import './App.css';
import NewRegistration from "./components/NewRegistration";
import {buildStore} from "./store";


const App: React.FC = () => {
  return (
        <Provider store={buildStore}>
            <NewRegistration />
        </Provider>

  );
}

export default App;

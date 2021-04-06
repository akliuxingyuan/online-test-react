import { Component } from "react";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import history from './utils/history';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import MainPage from './Components/MainPage';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/MainPage" component={MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;

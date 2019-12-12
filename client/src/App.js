import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Graph from "./components/graph/graph";
import LogEntry from "./components/auth/LogEntry";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => (
  <AuthState>
    <AlertState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/logs" component={LogEntry} />
              <PrivateRoute exact path="/dashboard" component={Graph} />
              <Route path="/*" component={Landing} />
            </Switch>
          </div>
        </Fragment>
        <Footer />
      </Router>
    </AlertState>
  </AuthState>
);

export default App;

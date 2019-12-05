import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Symptoms from './components/auth/Symptoms';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Graph from "./components/graph/graph";
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path ="/graph" component={Graph}/>
        </Switch>
        <Route exact path="/symptoms" component={Symptoms} />
      </section>
    </Fragment>
  </Router>
);

export default App;

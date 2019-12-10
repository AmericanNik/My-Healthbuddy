import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Navbar2 from './components/layout/Navbar2';
import Landing from './components/layout/Landing';
import Graph from './components/graph/graph';
import Logs from './components/auth/Logs';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import ConditionSearchBar from './components/conditionSearchBar/ConditionSearchBar';
import LogList from "./components/logList/logList";
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/logs' component={Logs} />
        <Route exact path='/graph' component={Graph} />
        <Route exact path="/loglist" component={LogList} />
        <ConditionSearchBar />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;

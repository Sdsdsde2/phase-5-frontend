import './App.css';
import './Header.css';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import Home from './components/Home';
import Dash from './components/Dash';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dash");
  }

  checkLoginStatus() {
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
    .then(resp => {
      if (resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN")
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: resp.data.user
        })
      else if (!resp.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => console.log("Login error", error))
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  render() {
  return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
          <div className="header">
                <h1 className="headerMain">
                    <Link to="/" className="headerMain" >Dashboard</Link>
                </h1>
                <h3>
                    <div className="headerLink">
                        <Link to="/register" className="linkStyle">Register</Link>
                        <Link to="/login" className="linkStyle">Login</Link>
                        <Link to="/plans" className="linkStyle">Plans</Link>
                        <Link to="/credits" className="linkStyle">Credits</Link>
                    </div>
                </h3>
            </div>
            <Switch>
              <Route exact path={"/"} render={props => (
                <Home {... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route exact path={"/dash"} render={props => (
                <Dash {... props} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route path="/register">
                  <Home />
              </Route>
              <Route path="/login">
                  <Dash />
              </Route>
              <Route path="/cart">
                  <Dash />
              </Route>
              <Route path="/">
                  <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

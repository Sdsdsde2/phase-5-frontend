import './App.css';
import './Header.css';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import Home from './components/Home';
import Dash from './components/Dash';
import Register from './components/Register'
import Login from './components/Login'
import Credits from './components/Credits'
import Plans from './components/Plans'
import Users from './components/User'

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

  renderRegisterRoute() {
      if (this.state.loggedInStatus === "NOT_LOGGED_IN")
        return <Link to="/register" className="linkStyle">Register</Link>
      else if (this.state.loggedInStatus === "LOGGED_IN")
        return <Link to="/dash" className="linkStyle">Dashboard</Link>
  }

  renderLoginRoute() {
    if (this.state.loggedInStatus === "NOT_LOGGED_IN")
      return <Link to="/login" className="linkStyle">Login</Link>
    else if (this.state.loggedInStatus === "LOGGED_IN")
      return <Link to="/user" className="linkStyle">User</Link>
  }

  render() {
  return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
          <div className="header">
                <h1 className="headerMain">
                    <Link to="/" className="headerMain">E.R.V.M</Link>
                </h1>
                <h3>
                    <div className="headerLink">
                        {this.renderRegisterRoute()}
                        {this.renderLoginRoute()}
                        <Link to="/plans" className="linkStyle">Plans</Link>
                        <Link to="/credits" className="linkStyle">Credits</Link>
                    </div>
                </h3>
            </div>
            <Switch>
              <Route exact path={"/"} render={props => (
                <Home />
              )} />
              <Route exact path={"/dash"} render={props => (
                <Dash {... props} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route path="/register" render={props => (
                <Register {... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route path="/login" render={props => (
                <Login {... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route path="/user" render={props => (
                <Users {... props} user={this.state.user} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route path="/plans" render={props => (
                <Plans {... props} user={this.state.user} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )} />
              <Route path="/credits">
                  <Credits user={this.state.user} />
              </Route>
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

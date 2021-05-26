import React, { Component } from 'react'
import Login from './auth/Login'
import axios from 'axios'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/user");
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3000/logout", { withCredentials: true })
        .then(resp => {this.props.handleLogout();
        })
        .catch(error => {
            console.log("logout error", error);
        });
    }

    logoutButton() {
        if (this.props.loggedInStatus === "LOGGED_IN")
            return <button onClick={() => this.handleLogoutClick()}>Logout</button>
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                {this.logoutButton()}
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        )
    }
}
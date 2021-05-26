import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dash");
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
                <h1>Home</h1>
                {this.logoutButton()}
            </div>
        )
    }
}

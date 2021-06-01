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
                <h4>Welcome to "Easy Remote Virtual Machine".</h4>
                <h4>If you are new here you can make an account.</h4>
                <h4>If you have been here before you can press the Login button and sign in.</h4>
                <h4>Once signed in you can purchase credits which can be used on our VM services.</h4>
                <h4>Please contact fakeemail@host.com if you have any questions / issues.</h4>
                <h4>Thank you for using our service!</h4>
            </div>
        )
    }
}

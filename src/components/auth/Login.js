import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/sessions", {
            username: this.state.username,
            password: this.state.password
        },
        {withCredentials: true})
        .then(resp => {if (resp.data.logged_in) this.props.handleSuccessfulAuth(resp.data)})
        .catch(error => console.log("Registration Errors:", error))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="username" 
                        name="username" 
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

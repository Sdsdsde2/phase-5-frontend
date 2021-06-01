import React, { Component } from 'react'
import axios from 'axios'

export default class Plans extends Component {
    constructor(props) {
        super(props);

        this.handleAddCredits = this.handleAddCredits.bind(this);
    }

    handleAddCredits() {
        this.props.history.push("/credits")
    }

    handleSubscription = () => {
        var today = new Date();

        axios.post("http://localhost:3000/subscriptions", {
            user_id: this.props.user.id,
            day: today.getDate(),
            hour: today.getHours(),
            minute: today.getMinutes(),
            status: "active"
        },
        {withCredentials: true})
        
        this.props.user.credits -= 1000
        this.props.history.push("/plans")
    }

    checkCredits = () => {
        if (this.props.user.credits >= 1000)
            return <button onClick={this.handleSubscription}>Purchase</button>
        else if (this.props.user.credits < 1000)
            return <button onClick={this.handleAddCredits}>Get More Credits</button>
    }

    render() {
        return (
            <div>
                <h1>Subscription Plans</h1>
                <h2>Your Credits: {this.props.user.credits}</h2>
                <h3>RF Money Tool</h3>
                <h3>Duration: One Hour</h3>
                <h3>Cost: 1000 Credits</h3>
                {this.checkCredits()}
            </div>
        )
    }
}
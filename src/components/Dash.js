import React, { Component } from 'react'
import axios from 'axios'

export default class Dash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {}
        }

        this.terminateSubscription = this.terminateSubscription.bind(this);
    }

    componentDidMount() {
        this.getCurrentSubscription()
        this.checkSubscription()
    }

    getCurrentSubscription() {
        axios.get("http://localhost:3000/subscriptions")
          .then(resp => {
            this.setState({
                subscription: resp.data[resp.data.length - 1]
            })
        })
    }

    terminateSubscription() {
        this.state.subscription.status = "terminated"

        fetch(`http://localhost:3000/subscriptions/${this.state.subscription.id}`, {
            method: 'PATCH',
            headers: {
            'Content-type': 'application/json',
            'Accepts': 'application/json'
            },
            body: JSON.stringify(this.state.subscription)
        })

        this.props.history.push("/dash");
    }

    checkSubscription = () => {
        axios.get("http://localhost:3000/subscriptions")
        .then(resp => {
            var newestSub = resp.data[resp.data.length - 1]
            var today = new Date();

            this.setState({subscription: resp.data[resp.data.length - 1]})

            if (newestSub.status === "active")
                if (today.getDate() <= newestSub.day)
                    if (today.getHours() <= (newestSub.hour + 1))
                        if (today.getMinutes() <= newestSub.minute)
                            console.log(this.state.subscription)
                        else
                            this.terminateSubscription(newestSub)
                    else
                        this.terminateSubscription(newestSub)
                else
                    this.terminateSubscription(newestSub)
             else
                console.log("already inactive")
        })
    }

    handleClick = () => {
        window.location.assign('http://localhost/vnc.html')
    }

    reviewButton = () => {
        this.props.history.push("/createreview");
    }

    renderOpenVM() {
        if (this.state.subscription.status === "active")
          return <button className="cardButton" onClick={this.handleClick}>Open VM</button>
    }

    renderTerminate() {
        if (this.state.subscription.status === "active")
          return <button className="cardButton" onClick={this.terminateSubscription}>Terminate Service Early</button>
    }

    render() {
        return (
            <div>
                <h1>Your Subscription Dashboard</h1>
                <div className="subsCard">
                    <div className="cardTitle">
                        <h3>{`Subscription #${this.state.subscription.id}`} | Status: {this.state.subscription.status}</h3>
                    </div>
                    <h4>{`Start time: Day: ${this.state.subscription.day} Hour: ${this.state.subscription.hour} Minute: ${this.state.subscription.minute}`}</h4>
                    <h4>{`End time: Day: ${this.state.subscription.day} Hour: ${this.state.subscription.hour + 1} Minute: ${this.state.subscription.minute + 1}`}</h4>
                    {this.renderOpenVM()}
                    {this.renderTerminate()}
                    <button className="cardButton" onClick={this.reviewButton}>Review VM Service</button>
                </div>
                <h1>Reviews</h1>
            </div>
        )
    }
}

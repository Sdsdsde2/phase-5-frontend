import React, { Component } from 'react'
import axios from 'axios'

export default class Dash extends Component {
    constructor(props) {
        super(props);
    }

    terminateSubscription(sub) {
        sub.status = "terminated"

        fetch(`http://localhost:3000/subscriptions/${sub.id}`, {
            method: 'PATCH',
            headers: {
            'Content-type': 'application/json',
            'Accepts': 'application/json'
            },
            body: JSON.stringify(sub)
        })
    }

    checkSubscription() {
        axios.get("http://localhost:3000/subscriptions")
        .then(resp => {
            var newestSub = resp.data[resp.data.length - 1]
            var today = new Date();

            if (newestSub.status === "active")
                if (today.getDate() <= newestSub.day)
                    if (today.getHours() <= (newestSub.hour + 1))
                        if (today.getMinutes() <= newestSub.minute)
                            console.log(resp.data[resp.data.length - 1])
                        else
                            this.terminateSubscription(newestSub)
                    else
                        this.terminateSubscription(newestSub)
                else
                    this.terminateSubscription(newestSub)

            console.log(newestSub.status)
        })
    }

    render() {
        return (
            <div>
                <h1>Your Subscription Dashboard</h1>
                {this.checkSubscription()}
            </div>
        )
    }
}

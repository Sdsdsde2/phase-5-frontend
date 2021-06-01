import React, { Component } from 'react'
import axios from 'axios'

export default class CreateReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subscription_id: 0,
            user_id: 0,
            user_rating: 1
        }
    }

    componentDidMount() {
        this.getCurrentSubscription()
    }

    getCurrentSubscription = () => {
        axios.get("http://localhost:3000/subscriptions")
          .then(resp => {
            console.log(resp.data[resp.data.length - 1].id)
            this.setState({
                subscription_id: resp.data[resp.data.length - 1].id
            })
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitReview(event) {
        event.preventDefault();
        axios.post("http://localhost:3000/reviews", {
            subscription_id: event.target[0].value,
            user_id: event.target[1].value,
            rating: event.target[2].value
        },
        {withCredentials: true})
    }

    render() {
        return (
            <div>
                <h1>Submit A Review</h1>
                <div>
                <form onSubmit={this.submitReview}>
                    <label>Subscription ID</label>
                    <input 
                        type="subid" 
                        name="subid" 
                        placeholder={this.state.subscription_id}
                        required 
                    />
                    <label>User ID</label>
                    <input 
                        type="userid" 
                        name="userid" 
                        placeholder={this.props.user.id}
                        required 
                    />
                    <label>Rating 1-5</label>
                    <input 
                        type="rating" 
                        name="rating" 
                        placeholder="Rating 1-5" 
                        required 
                    />
                    <button type="submit">Submit Review</button>
                </form>
                </div>
            </div>
        )
    }
}
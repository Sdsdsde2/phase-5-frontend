import React, { Component } from 'react'

export default class Reviews extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getReviews()
    }

    render() {
        return (
            <div>
                <h1>All User Reviews</h1>
                <div className="reviewList">
                    {this.props.reviews.map((review) => 
                        <h5 className="reviewText">
                            Sub ID: {review.subscription_id}     |
                            User ID: {review.user_id}       |
                            Rating: {review.rating}    
                        </h5>
                    )}
                </div>
            </div>
        )
    }
}
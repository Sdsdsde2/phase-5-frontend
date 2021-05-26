import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Credits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: "1000 Credits",
                description: "Credits to use for our services",
                price: 10.00
            },
            complete: false
        }
    }

    handleToken = (token, addresses) => {
        console.log({token, addresses})
        this.updateCredits()
    }

    updateCredits = () => {
        this.props.user.credits += 1000 
        
        // axios.post('http://localhost:3000/charges', {
        //     id: this.props.user.id,

        //     credits: 1000
        // },
        // {withCredentials: true})
        // .then(resp => {
        //     if (resp.data.status === 'created') 
        //         this.props.handleSuccessfulAuth(resp.data)
        //     })
        // .catch(error => console.log("Registration Errors:", error))
    }

    render() {
        return (
            <div>
                <div>
                {console.log(this.props.user)}
                    <h1>Checkout</h1>
                    <h2>{this.state.product.name}</h2>
                    <h4>{this.state.product.description}</h4>
                    <h4>${this.state.product.price}</h4>
                </div>
                <StripeCheckout 
                    stripeKey = "pk_test_51Iv8oiE53p3m88Nx7BhOANnllhtgn5YiUJHfoy8pcGs8oxOcUxqg1NutWcEyjJtZcqIbHga3gyXncu1LexC4cBSi00jENVvWN0"
                    token = {this.handleToken}
                    billingAddress
                    amount={this.state.product.price * 100}
                    name={this.state.product.name}
                />
            </div>
        );
    }
}
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JotO8FsfohfP3t7AkNu7jwLYCDA0DQrkc19O8i0XWxbBja6qL6jN33Ibi9xb51AEZfwmMYFWZwh8JZCueIxWKbX00IWezzxa0';
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful!');
        }).catch(error => {
            console.log('Payment error object:', error);
            // console.log('Payment error (parsed):', JSON.parse(error));
            alert(
                'There was an issue with your payment. Please be sure you use the provided credit card.'
            );
        });
    }
    return (
        <StripeCheckout
          label='Pay Now'
          name='CRWN Clothing Ltd.'
          billingAddress
          shippingAddress
          image='https://svgshare.com/i/CUz.svg'
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;